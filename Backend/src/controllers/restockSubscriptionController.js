
import mongoose from "mongoose";

import productModel from "../models/productModel.js";
import restockSubscriptionModel from "../models/restockSubscription.js";


export const createSubscription = async (req, res) => {
    try {
        const { productId, variantId } = req.body;

        // User ID comes from verifyToken middleware
        const userId = req.user;


        // Validate required fields
        if (!productId || !variantId) {
            return res.status(400).json({
                success: false,
                message: "Product ID and Variant ID are required"
            });
        }


        // Validate MongoDB ObjectIds
        if (
            !mongoose.Types.ObjectId.isValid(productId) ||
            !mongoose.Types.ObjectId.isValid(variantId)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid product or variant ID"
            });
        }


        const product = await productModel.findOne({ _id: productId, "variants._id": variantId }).select("_id variants title");

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product or variant not found"
            });
        }

        // Get the selected variant
        const variant = product.variants.id(variantId);

        // Don't allow subscriptions for variants already in stock
        if (variant.stock > 0) {
            return res.status(400).json({
                success: false,
                message: "This variant is already in stock"
            });
        }


        // Check whether the user has already subscribed
        const existingSubscription = await restockSubscriptionModel.findOne({
            userId,
            product: productId,
            variant: variantId,
            status: "active"
        });


        if (existingSubscription) {
            return res.status(200).json({
                success: true,
                alreadySubscribed: true,
                message: "You are already subscribed to this variant",
                subscription: existingSubscription
            });
        }


        // Create a new subscription
        const subscription = await restockSubscriptionModel.create({ userId, product: productId, variant: variantId });


        return res.status(201).json({
            success: true,
            alreadySubscribed: false,
            message: "You will be notified when this product is back in stock",
            subscription
        });

    } catch (error) {

        // Handle duplicate subscription race conditions
        if (error.code === 11000) {
            return res.status(200).json({
                success: true,
                alreadySubscribed: true,
                message: "You are already subscribed to this variant"
            });
        }


        console.error("Subscribe to restock error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to subscribe to restock notification"
        });
    }
};

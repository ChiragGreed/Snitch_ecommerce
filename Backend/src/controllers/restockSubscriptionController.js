import mongoose from "mongoose";
import productModel from "../models/productModel.js";
import restockSubscriptionModel from "../models/restockSubscription.js";


export const createSubscription = async (req, res) => {
    try {
        const { productId, variantId, guestId } = req.body;

        if (!productId || !variantId) {
            return res.status(400).json({
                success: false,
                message: "Product ID and Variant ID are required",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(productId) || !mongoose.Types.ObjectId.isValid(variantId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product or variant ID",
            });
        }

        const userId = req.user;

        if (!userId && !guestId) {
            return res.status(400).json({
                success: false,
                message: "Guest ID or UserId is required",
            });
        }


        const product = await productModel.findOne({
            _id: productId,
            "variants._id": variantId,
        }).select("_id variants");

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product or variant not found",
            });
        }

        const variant = product.variants.id(variantId);

        if (variant.stock > 0) {
            return res.status(400).json({
                success: false,
                message: "This variant is already in stock",
            });
        }


        // Build subscriber query
        const subscriber = userId ? { user: userId } : { guestId };

        const subscriptionQuery = { ...subscriber, product: productId, variant: variantId, status: "active" };

        // Prevent duplicate subscriptions
        const existingSubscription = await restockSubscriptionModel.findOne(subscriptionQuery);

        if (existingSubscription) {
            return res.status(200).json({
                success: true,
                alreadySubscribed: true,
                message: "You are already subscribed to this variant",
                subscription: existingSubscription,
            });
        }

        // Create subscription
        const subscription = await restockSubscriptionModel.create({ ...subscriber, product: productId, variant: variantId, });

        return res.status(201).json({
            success: true,
            alreadySubscribed: false,
            message: "You will be notified when this product is back in stock",
            subscription,
        });

    } catch (error) {
        console.error("Subscribe to restock error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to subscribe to restock notification",
        });
    }
};

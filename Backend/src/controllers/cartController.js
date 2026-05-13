import { variantStock } from "../dao/variantStock.dao.js";
import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";


export const addItemToCart = async (req, res) => {

    const userId = req.user;

    const { productId, variantId } = req.params;
    const { quantity } = req.body;

    const stock = await variantStock(productId, variantId);


    if (!productId || !variantId) return res.status(400).json({
        message: "ProductId or VariantId not found",
        success: false,
        err: "ProductId or VariantId missing in params"
    })

    const product = await productModel.findOne({ _id: productId, 'variants._id': variantId });

    if (!product) return res.status(404).json({
        message: "Product variant do not exist",
        success: false,
        err: "Product variant do not exist"
    })

    let cart = await cartModel.findOne({ userId });

    if (!cart) {


        if (quantity > stock) return res.status(400).json({
            message: "Insuffecient stock for required item quantity",
            success: false,
        })

        cart = await cartModel.create({ userId, items: [{ productId, variantId, quantity }] });

        return res.status(200).json({
            message: "Item added to cart",
            success: true,
            cart
        })
    }

    const existingItem = cart.items.find((item) => item.productId == productId && item.variantId == variantId);

    if (!existingItem) {

        cart.items.push({ productId, variantId, quantity });

        await cart.save();

        return res.status(200).json({
            message: "Item added to cart",
            success: true,
            cart
        })
    }

    if (existingItem.quantity >= stock) {

        return res.status(400).json({
            message: "Can not add items more than available stock",
            success: false,
        })
    }

    existingItem.quantity += quantity;

    await cart.save();

    res.status(200).json({
        message: "Item added to cart",
        success: true,
        cart
    })

}

export const getCartItems = async (req, res) => {
    const userId = req.user;

    const cart = await cartModel.findOne({ userId: userId }).populate('items.productId');

    if (!cart) return res.status(200).json({
        message: "No cart items found",
        success: true
    })

    console.log(cart);

    res.status(200).json({
        message: "Fetched cart items",
        success: true,
        cart
    })

}
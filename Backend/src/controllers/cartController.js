import mongoose from "mongoose";
import { variantStock } from "../dao/variantStock.dao.js";
import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";
import razorpay from "../services/paymentService.js";
import paymentModel from "../models/paymentModel.js";
import { validatePaymentVerification } from '../../node_modules/razorpay/dist/utils/razorpay-utils.js'
import { Config } from "../config/config.js";

async function getCart(userId) {
    const cart = await cartModel.aggregate([

        {
            '$match': {
                'userId': new mongoose.Types.ObjectId(userId)
            }
        },
        {
            '$unwind': {
                'path': '$items'
            }
        }, {
            '$lookup': {
                'from': 'products',
                'localField': 'items.productId',
                'foreignField': '_id',
                'as': 'items.productId'
            }
        }, {
            '$unwind': {
                'path': '$items.productId'
            }
        }, {
            '$unwind': {
                'path': '$items.productId.variants'
            }
        }, {
            '$match': {
                '$expr': {
                    '$eq': [
                        '$items.variantId', '$items.productId.variants._id'
                    ]
                }
            }
        }, {
            '$addFields': {
                'itemTotalPrice': {
                    'amount': {
                        '$multiply': [
                            '$items.quantity', '$items.productId.variants.price.amount'
                        ]
                    },
                    'currency': '$items.productId.variants.price.currency'
                }
            }
        }, {
            '$group': {
                '_id': '$_id',
                'finalAmount': {
                    '$sum': '$itemTotalPrice.amount'
                },
                'finalCurrency': {
                    '$first': '$items.productId.price.currency'
                },
                'items': {
                    '$push': '$items'
                }
            }
        }, {
            '$project': {
                'totalPrice': {
                    'amount': '$finalAmount',
                    'currency': '$finalCurrency'
                },
                'items': '$items'
            }
        }
    ]);

    return cart;
}

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
            message: "Insuffecient stock for required item quantity",
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

    const cart = await getCart(userId);

    if (!cart) return res.status(200).json({
        message: "No cart items found",
        success: true,
        error: "No cart items found"
    })

    console.log(cart);


    res.status(200).json({
        message: "Fetched cart items",
        success: true,
        cart: cart[0]
    })

}

export const addItemQuantity = async (req, res) => {
    const userId = req.user;
    const { itemId } = req.body;

    let cart = await cartModel.findOne({ userId });

    if (!cart) return res.status(404).json({
        message: "Invalid cart id",
        success: false,
        error: "Invalid cart id"
    })

    const item = cart.items.find((item) => item._id == itemId);

    if (!item) return res.status(404).json({
        message: "Item not found in cart",
        success: false,
        error: "Cart item not found"
    })

    const stock = await variantStock(item.productId.toString(), item.variantId.toString());


    if (item.quantity >= stock) return res.status(400).json({
        message: "Insuffecient stock for required item quantity",
        success: false,
        error: "Insuffecient stock"
    })

    item.quantity++;


    await cart.save();

    res.status(200).json({
        message: "Item quantity increased",
        success: true,
        item
    })

}

export const subItemQuantity = async (req, res) => {
    const userId = req.user;
    const { itemId } = req.body;

    let cart = await cartModel.findOne({ userId });

    if (!cart) return res.status(404).json({
        message: "Invalid cart id",
        success: false,
        error: "Invalid cart id"
    })

    const item = cart.items.find((item) => item._id == itemId);

    if (!item) return res.status(404).json({
        message: "Item not found in cart",
        success: false,
        error: "cart item not found"
    })

    item.quantity--;

    if (item.quantity == 0) {
        cart.items = cart.items.filter((cartItem) => cartItem._id != itemId);

        await cart.save();

        return res.status(200).json({
            message: "Item removed from cart",
            success: true
        })
    }


    await cart.save();

    res.status(200).json({
        message: "Item quantity decreased",
        success: true,
        item
    })

}

export const removeItem = async (req, res) => {
    const userId = req.user;
    const { itemId } = req.body;

    let cart = await cartModel.findOne({ userId });

    if (!cart) return res.status(404).json({
        message: "Invalid cart id",
        success: false,
        error: "Iinvalid cart id"
    })

    const itemIndex = cart.items.findIndex((i) => i._id == itemId);

    cart.items.splice(itemIndex, 1);

    await cart.save();

    res.status(200).json({
        message: "Item removed from cart",
        success: true
    })
}

export const clearCart = async (req, res) => {
    const userId = req.user;

    let cart = await cartModel.findOne({ userId });

    if (!cart) return res.status(404).json({
        message: "Cart do not exist",
        success: false,
        error: "Cart not found for given userId",
        userId
    })

    await cart.deleteOne();

    res.status(200).json({
        message: "Item removed from cart",
        success: true
    })
}

export const createPaymentOrder = async (req, res) => {

    const userId = req.user;
    const cart = await getCart(userId);

    if (!cart || cart.length === 0 || !cart[0]?.items?.length) {
        return res.status(400).json({
            success: false,
            message: "Your cart is empty"
        });
    }

    const { amount, currency } = cart[0].totalPrice;

    if (!amount || amount <= 0 || !currency) {
        return res.status(400).json({
            success: false,
            message: "Invalid cart amount"
        });
    }

    // Razorpay expects the amount in the smallest currency unit.
    // For INR, ₹100 becomes 10000 paise.
    const order = await razorpay.orders.create({ amount: Math.round(amount * 100), currency, receipt: `receipt_${Date.now()}` });

    await paymentModel.create({ userId, cartId: cart[0]._id, order: { razorpay_order_id: order.id }, price: { amount, currency } });

    return res.status(200).json({
        success: true,
        message: "Payment order created",
        key: Config.RAZORPAY_KEY_ID,
        order
    });
};


export const verifyPayment = async (req, res) => {
    const userId = req.user;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;


    if (!razorpay_order_id) return res.status(400).json({
        message: "Order_id not provided",
        success: false,
        error: "razorpay_order_id not provided"
    })

    const payment = await paymentModel.findOne({ userId, status: { $in: ['pending', 'failed'] }, "order.razorpay_order_id": razorpay_order_id });


    if (!payment) return res.status(404).json({
        message: "Payment request do not exist",
        success: false,
        error: "Payment request do not exist"
    })

    if (!razorpay_payment_id || !razorpay_signature) {

        return res.status(200).json({
            message: "Payment failed",
            success: false,
            error: "razorpay_payment_id or razorpay_signature not found"
        })
    }

    const result = validatePaymentVerification({ "order_id": razorpay_order_id, "payment_id": razorpay_payment_id }, razorpay_signature, Config.RAZORPAY_KEY_SECRET);

    if (!result) {
        payment.status = 'failed';
        await payment.save();

        return res.status(400).json({
            message: 'Invalid signature',
            success: false,
        });
    }

    payment.order.razorpay_payment_id = razorpay_payment_id;
    payment.order.razorpay_signature = razorpay_signature;
    payment.status = 'paid';

    await payment.save();

    res.status(200).json({
        message: "Payment Verified successfully",
        success: true,
        cartId: payment.cartId
    })
}


export const migrateGuestCart = async (req, res) => {
    try {
        const userId = req.user;
        const { items } = req.body;

        if (!Array.isArray(items)) {
            return res.status(400).json({
                success: false,
                message: "Invalid cart items"
            });
        }

        // 1. Validate and normalize guest items
        const guestItems = [];

        for (const item of items) {
            const { productId, variantId, quantity } = item;

            if (
                !mongoose.Types.ObjectId.isValid(productId) ||
                !mongoose.Types.ObjectId.isValid(variantId) ||
                !Number.isInteger(quantity) ||
                quantity < 1
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid cart item"
                });
            }

            const product = await productModel.findOne({
                _id: productId,
                "variants._id": variantId
            });

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product or variant not found"
                });
            }

            const stock = await variantStock(productId, variantId);

            const existingItem = guestItems.find(
                i =>
                    i.productId.toString() === productId.toString() &&
                    i.variantId.toString() === variantId.toString()
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                guestItems.push({
                    productId,
                    variantId,
                    quantity
                });
            }

            const normalizedItem = guestItems.find(
                i =>
                    i.productId.toString() === productId.toString() &&
                    i.variantId.toString() === variantId.toString()
            );

            if (normalizedItem.quantity > stock) {
                return res.status(400).json({
                    success: false,
                    message: "Insufficient stock",
                    productId,
                    variantId
                });
            }
        }

        // 2. If guest cart is empty, nothing to migrate
        if (guestItems.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No guest items to migrate"
            });
        }

        // 3. Find existing user's cart
        let cart = await cartModel.findOne({ userId });

        if (!cart) {
            // Create a new cart
            cart = await cartModel.create({
                userId,
                items: guestItems
            });
        } else {
            // Merge guest items into existing cart
            for (const guestItem of guestItems) {
                const existingItem = cart.items.find(
                    item =>
                        item.productId.toString() === guestItem.productId.toString() &&
                        item.variantId.toString() === guestItem.variantId.toString()
                );

                if (existingItem) {
                    const newQuantity =
                        existingItem.quantity + guestItem.quantity;

                    const stock = await variantStock(
                        guestItem.productId,
                        guestItem.variantId
                    );

                    if (newQuantity > stock) {
                        return res.status(400).json({
                            success: false,
                            message: "Insufficient stock while merging cart",
                            productId: guestItem.productId,
                            variantId: guestItem.variantId
                        });
                    }

                    existingItem.quantity = newQuantity;
                } else {
                    cart.items.push(guestItem);
                }
            }

            await cart.save();
        }

        return res.status(200).json({
            success: true,
            message: "Guest cart migrated successfully",
            cart
        });

    } catch (error) {
        console.error("Cart migration error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to migrate cart"
        });
    }
};

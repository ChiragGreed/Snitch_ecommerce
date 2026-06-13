import cartModel from "../models/cartModel.js";
import orderModel from "../models/orderModel.js";

export const createOrder = async (req, res) => {

    const userId = req.user;
    const { cartId } = req.body;

    if (!cartId) return res.status(400).json({
        message: "Cart Id not provided",
        success: false,
        error: "Cart Id not provided"
    })

    const cart = await cartModel.findById(cartId);

    if (!cart) return res.status(404).json({
        message: "Cart not found",
        success: false,
        error: "Cart not found from cartId: " + cartId
    })

    const order = await orderModel.create({ userId, items: cart.items, status: 'placed' });

    await cartModel.deleteOne({ _id: cartId });

    res.status(201).json({
        message: "Order placed successfully",
        success: true,
        order
    })

}

export const getOrder = async (req, res) => {
    const userId = req.user;

    const order = await orderModel.find({ userId })
        .populate('items.productId', 'title images price variants')
        .sort({ _id: -1 });

    if (!order || order.length === 0) return res.status(404).json({
        message: "Order not exist",
        success: false,
        error: "No order found"
    })

    res.status(200).json({
        message: "Fetched order details",
        success: true,
        order
    })


}
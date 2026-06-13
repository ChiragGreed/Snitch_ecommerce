import mongoose, { mongo, Mongoose } from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, "userId is required"]
    },
    status: {
        type: String,
        enum: ['placed', 'shipped', 'delivered', 'cancelled'],
        required: [true, "Order status is required"],

    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
            required: [true, "userId is required"]
        },
        variantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products.variants",
            required: [true, "variantId is required"]
        },
        quantity: {
            type: Number,
            default: 1
        }
    }
    ]
})

const orderModel = mongoose.model("orders", orderSchema);

export default orderModel;
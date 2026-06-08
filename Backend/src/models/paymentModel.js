import mongoose from 'mongoose';
import priceSchema from './productModel.js';

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'User Id is required']
    },

    price: {
        type: {
            amount: {
                type: Number,
                required: [true, "Product price amount is required"]
            }, currency: {
                type: String,
                default: 'INR',
                enum: ["USD", "INR", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "SEK", "NZD"],
            }
        },
        required: true
    },

    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts',
        required: [true, 'Cart Id is required']
    },
    order: {
        razorpay_order_id: {
            type: String,
            required: [true, 'Razorpay Order Id is required']
        },
        razorpay_payment_id: {
            type: String
        },
        razorpay_signature: {
            type: String
        }

    },
    status: {
        type: String,
        enum: ['success', 'pending', 'failed'],
        default: 'pending',
        required: [true]
    }
})

const paymentModel = mongoose.model("Payments", paymentSchema);

export default paymentModel;
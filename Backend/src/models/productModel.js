import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Product title is required"],
    },
    description: {
        type: String,
        required: [true, "Product description is required"]
    },
    images: {
        type: [String],
        required: [true, "Product images are required"]
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
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "Product sellerId is required"]
    }

})

const productModel = mongoose.model("products", productSchema);

export default productModel
import mongoose from "mongoose";

const restockSubscriptionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    guestId: {
        type: String,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    variant: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "notified", "cancelled"],
        default: "active",
    },
})

const restockSubscriptionModel = mongoose.model('restockSubscription', restockSubscriptionSchema);

export default restockSubscriptionModel
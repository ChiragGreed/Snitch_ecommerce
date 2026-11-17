import mongoose from "mongoose";

const restockSubscriptionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
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
    notifiedAt: { type: Date, default: null }
}, { timestamps: true });

restockSubscriptionSchema.index(
    { userId: 1, product: 1, variant: 1 },
    { unique: true, partialFilterExpression: { status: "active" } }
);

const restockSubscriptionModel = mongoose.model('restockSubscription', restockSubscriptionSchema);

export default restockSubscriptionModel;

import mongoose from "mongoose";


const notificationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },

        type: {
            type: String,
            enum: ["RESTOCK"],
            required: true
        },

        title: {
            type: String,
            required: true
        },

        message: {
            type: String,
            required: true
        },

        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
            required: true
        },

        variant: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },

        subscriptionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "restockSubscription",
            unique: true,
            sparse: true
        },

        isRead: {
            type: Boolean,
            default: false
        },

        readAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);


// Index for fetching a user's notifications
notificationSchema.index({
    userId: 1,
    createdAt: -1
});


// Index for unread notification count
notificationSchema.index({
    userId: 1,
    isRead: 1
});


const notificationModel = mongoose.model(
    "notifications",
    notificationSchema
);

export default notificationModel;

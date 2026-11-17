
import restockSubscriptionModel from "../models/restockSubscription.js";
import notificationModel from "../models/notificationModel.js";

export const notifyRestockSubscribers = async (product, variant) => {
    const subscriptions = await restockSubscriptionModel.find({
        product: product._id,
        variant: variant._id,
        status: "active"
    }).select("_id userId");

    if (!subscriptions.length) return;

    const attributes = variant.attribute instanceof Map ? Object.fromEntries(variant.attribute) : variant.attribute;
    const variantDetails = Object.values(attributes || {}).join(", ");
    const message = `${product.title}${variantDetails ? ` (${variantDetails})` : ""} is back in stock. Order yours now!`;

    for (let i = 0; i < subscriptions.length; i += 500) {
        const batch = subscriptions.slice(i, i + 500);

        await notificationModel.bulkWrite(batch.map(sub => ({
            updateOne: {
                filter: { subscriptionId: sub._id },
                update: {
                    $setOnInsert: {
                        userId: sub.userId,
                        type: "RESTOCK",
                        title: "Back in Stock!",
                        message,
                        product: product._id,
                        variant: variant._id,
                        subscriptionId: sub._id
                    }
                },
                upsert: true
            }
        })));

        await restockSubscriptionModel.updateMany(
            { _id: { $in: batch.map(sub => sub._id) }, status: "active" },
            { $set: { status: "notified", notifiedAt: new Date() } }
        );
    }
};

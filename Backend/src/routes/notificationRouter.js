
import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { createSubscription } from "../controllers/restockSubscriptionController.js";
import { getNotifications, getUnreadCount, markNotificationRead, markAllNotificationsRead } from "../controllers/notificationController.js";

const notificationRouter = express.Router();

notificationRouter.use(verifyToken);

notificationRouter.post("/restock/subscribe", createSubscription);

notificationRouter.get("/", getNotifications);

notificationRouter.get("/unread-count", getUnreadCount);

notificationRouter.patch("/read-all", markAllNotificationsRead);

notificationRouter.patch("/:notificationId/read", markNotificationRead);

export default notificationRouter;

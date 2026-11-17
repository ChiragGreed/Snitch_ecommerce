
import mongoose from "mongoose";

import notificationModel from "../models/notificationModel.js";


// GET ALL NOTIFICATIONS
export const getNotifications = async (req, res) => {
    try {
        const page = Math.max(
            1,
            Number(req.query.page) || 1
        );

        const limit = Math.min(
            50,
            Math.max(1, Number(req.query.limit) || 20)
        );


        const [notifications, total, unreadCount] = await Promise.all([

            notificationModel
                .find({ userId: req.user })
                .populate("product", "title images")
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit),

            notificationModel.countDocuments({
                userId: req.user
            }),

            notificationModel.countDocuments({
                userId: req.user,
                isRead: false
            })

        ]);


        return res.status(200).json({
            success: true,
            notifications,
            total,
            unreadCount,
            page,
            totalPages: Math.ceil(total / limit)
        });

    } catch (error) {
        console.error("Get notifications error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch notifications"
        });
    }
};



// GET UNREAD NOTIFICATION COUNT
export const getUnreadCount = async (req, res) => {
    try {
        const unreadCount = await notificationModel.countDocuments({
            userId: req.user,
            isRead: false
        });


        return res.status(200).json({
            success: true,
            unreadCount
        });

    } catch (error) {
        console.error("Get unread count error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch unread count"
        });
    }
};



// MARK A SINGLE NOTIFICATION AS READ
export const markNotificationRead = async (req, res) => {
    try {
        const { notificationId } = req.params;


        // Validate notification ID
        if (!mongoose.Types.ObjectId.isValid(notificationId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid notification ID"
            });
        }


        // Update only the logged-in user's notification
        const notification = await notificationModel.findOneAndUpdate(
            {
                _id: notificationId,
                userId: req.user
            },
            {
                $set: {
                    isRead: true,
                    readAt: new Date()
                }
            },
            {
                new: true
            }
        );


        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found"
            });
        }


        return res.status(200).json({
            success: true,
            notification
        });

    } catch (error) {
        console.error("Mark notification read error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update notification"
        });
    }
};



// MARK ALL NOTIFICATIONS AS READ
export const markAllNotificationsRead = async (req, res) => {
    try {
        await notificationModel.updateMany(
            {
                userId: req.user,
                isRead: false
            },
            {
                $set: {
                    isRead: true,
                    readAt: new Date()
                }
            }
        );


        return res.status(200).json({
            success: true,
            message: "All notifications marked as read"
        });

    } catch (error) {
        console.error("Mark all notifications read error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update notifications"
        });
    }
};

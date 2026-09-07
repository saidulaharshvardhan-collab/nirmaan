import { Notification } from '../models/Notification.js';
export async function getNotifications(req, res) {
    try {
        if (!req.user) {
            res.status(401).json({ success: false, message: 'Authentication required' });
            return;
        }
        const notifications = await Notification.find({ recipientId: req.user._id })
            .sort({ createdAt: -1 })
            .limit(30);
        const unreadCount = await Notification.countDocuments({
            recipientId: req.user._id,
            read: false
        });
        res.status(200).json({
            success: true,
            unreadCount,
            notifications
        });
    }
    catch (err) {
        console.error('Error fetching notifications:', err);
        res.status(500).json({ success: false, message: 'Server error retrieving notifications' });
    }
}
export async function markNotificationRead(req, res) {
    try {
        const { id } = req.params;
        const notif = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
        res.status(200).json({ success: true, notification: notif });
    }
    catch (err) {
        console.error('Error marking notification read:', err);
        res.status(500).json({ success: false, message: 'Server error updating notification' });
    }
}
export async function markAllNotificationsRead(req, res) {
    try {
        if (!req.user) {
            res.status(401).json({ success: false, message: 'Authentication required' });
            return;
        }
        await Notification.updateMany({ recipientId: req.user._id, read: false }, { read: true });
        res.status(200).json({ success: true, message: 'All notifications marked as read' });
    }
    catch (err) {
        console.error('Error marking all notifications read:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

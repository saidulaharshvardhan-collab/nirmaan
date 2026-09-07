import { Notification } from '../../models/Notification.js';
let ioInstance = null;
export function setSocketIO(io) {
    ioInstance = io;
}
export async function createAndSendNotification(params) {
    const notif = await Notification.create({
        recipientId: params.recipientId,
        title: params.title,
        message: params.message,
        type: params.type || 'INFO',
        link: params.link,
        metadata: params.metadata,
    });
    if (ioInstance) {
        ioInstance.to(`user_${params.recipientId.toString()}`).emit('notification', notif);
        // Also broadcast to public notification feed if general
        ioInstance.emit('global_activity', {
            title: params.title,
            message: params.message,
            createdAt: notif.createdAt
        });
    }
    return notif;
}

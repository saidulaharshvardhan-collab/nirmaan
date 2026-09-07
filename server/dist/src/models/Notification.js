import mongoose, { Schema } from 'mongoose';
const NotificationSchema = new Schema({
    recipientId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
        type: String,
        enum: ['INFO', 'SUCCESS', 'WARNING', 'MATCH', 'VERIFICATION'],
        default: 'INFO',
    },
    link: { type: String },
    read: { type: Boolean, default: false, index: true },
    metadata: { type: Schema.Types.Mixed },
}, { timestamps: true });
NotificationSchema.index({ recipientId: 1, read: 1, createdAt: -1 });
export const Notification = mongoose.model('Notification', NotificationSchema);

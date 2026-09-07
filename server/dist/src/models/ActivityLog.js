import mongoose, { Schema } from 'mongoose';
const ActivityLogSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    userName: { type: String, required: true },
    userRole: { type: String },
    action: { type: String, required: true },
    details: { type: String, required: true },
    entityType: {
        type: String,
        required: true,
        enum: ['REPORT', 'PROJECT', 'MILESTONE', 'VERIFICATION', 'SYSTEM'],
        index: true
    },
    entityId: { type: Schema.Types.ObjectId, index: true },
    metadata: { type: Schema.Types.Mixed },
}, { timestamps: { createdAt: true, updatedAt: false } });
ActivityLogSchema.index({ createdAt: -1 });
ActivityLogSchema.index({ entityType: 1, entityId: 1 });
export const ActivityLog = mongoose.model('ActivityLog', ActivityLogSchema);

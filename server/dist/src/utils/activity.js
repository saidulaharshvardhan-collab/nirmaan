import { ActivityLog } from '../models/ActivityLog.js';
export async function logActivity(params) {
    try {
        await ActivityLog.create({
            userId: params.userId,
            userName: params.userName,
            userRole: params.userRole,
            action: params.action,
            details: params.details,
            entityType: params.entityType,
            entityId: params.entityId,
            metadata: params.metadata,
        });
    }
    catch (err) {
        console.error('Failed to record activity log:', err);
    }
}

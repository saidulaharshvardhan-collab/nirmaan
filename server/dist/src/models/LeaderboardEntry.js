import mongoose, { Schema } from 'mongoose';
const LeaderboardEntrySchema = new Schema({
    entityType: { type: String, required: true, enum: ['USER', 'UNIVERSITY'], index: true },
    entityId: { type: Schema.Types.ObjectId, ref: 'User' },
    entityName: { type: String, required: true },
    category: { type: String, default: 'student' },
    avatarUrl: { type: String },
    points: { type: Number, default: 0, index: true },
    resolvedProblemsCount: { type: Number, default: 0 },
    activeProjectsCount: { type: Number, default: 0 },
    rank: { type: Number, default: 1 },
    badge: { type: String, default: 'Bronze Contributor' },
}, { timestamps: true });
LeaderboardEntrySchema.index({ entityType: 1, points: -1 });
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', LeaderboardEntrySchema);

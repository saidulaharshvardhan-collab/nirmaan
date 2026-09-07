import mongoose, { Schema } from 'mongoose';
const RewardSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    points: { type: Number, required: true },
    reason: { type: String, required: true },
    sourceType: {
        type: String,
        required: true,
        enum: ['REPORT_VERIFIED', 'USEFUL_EVIDENCE', 'PROBLEM_CLAIMED', 'MILESTONE_COMPLETED', 'SOLUTION_VERIFIED', 'IMPACT_ACHIEVED'],
        index: true
    },
    relatedId: { type: Schema.Types.ObjectId },
}, { timestamps: { createdAt: true, updatedAt: false } });
export const Reward = mongoose.model('Reward', RewardSchema);

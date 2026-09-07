import mongoose, { Schema } from 'mongoose';
const VerificationSchema = new Schema({
    targetType: {
        type: String,
        required: true,
        enum: ['PROBLEM_REPORT', 'PROJECT_MILESTONE', 'PROJECT_FINAL'],
        index: true
    },
    targetId: { type: Schema.Types.ObjectId, required: true, index: true },
    evaluatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    status: {
        type: String,
        required: true,
        enum: ['VERIFIED', 'REJECTED', 'REQUEST_INFO'],
        default: 'VERIFIED',
        index: true
    },
    score: { type: Number, min: 0, max: 100 },
    remarks: { type: String, required: true },
    fieldEvidenceVerified: { type: Boolean, default: true },
    impactPointsAwarded: { type: Number, default: 0 },
}, { timestamps: true });
export const Verification = mongoose.model('Verification', VerificationSchema);

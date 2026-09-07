import mongoose, { Schema } from 'mongoose';
const ProjectMilestoneSchema = new Schema({
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    phaseNumber: { type: Number, default: 1 },
    evidenceFiles: [{ type: String }],
    evidenceNotes: { type: String },
    status: {
        type: String,
        enum: ['PENDING', 'SUBMITTED', 'APPROVED', 'REJECTED'],
        default: 'PENDING',
        index: true
    },
    reviewerNotes: { type: String },
    reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    submittedAt: { type: Date },
    verifiedAt: { type: Date }
}, { timestamps: true });
export const ProjectMilestone = mongoose.model('ProjectMilestone', ProjectMilestoneSchema);

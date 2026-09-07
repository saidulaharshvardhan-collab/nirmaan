import mongoose, { Schema } from 'mongoose';
const ProjectSchema = new Schema({
    title: { type: String, required: true, trim: true, index: true },
    description: { type: String, required: true },
    problemReportId: { type: Schema.Types.ObjectId, ref: 'ProblemReport', required: true, index: true },
    clusterId: { type: Schema.Types.ObjectId, ref: 'ProblemCluster' },
    leadStudentId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    teamMembers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    institution: { type: String, required: true, index: true },
    department: { type: String, required: true, index: true },
    mentorProfessorId: { type: Schema.Types.ObjectId, ref: 'User' },
    status: {
        type: String,
        enum: ['OPEN', 'CLAIMED', 'IN_PROGRESS', 'SUBMITTED', 'UNDER_REVIEW', 'VERIFIED', 'RESOLVED', 'REWARDED'],
        default: 'CLAIMED',
        index: true
    },
    milestones: [{ type: Schema.Types.ObjectId, ref: 'ProjectMilestone' }],
    impactScore: { type: Number, default: 0 },
    impactPointsAwarded: { type: Number, default: 0 },
    verifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    verifiedAt: { type: Date },
    evaluatorRemarks: { type: String },
    solutionSummary: { type: String },
    repositoryUrl: { type: String },
    demoUrl: { type: String }
}, { timestamps: true });
export const Project = mongoose.model('Project', ProjectSchema);

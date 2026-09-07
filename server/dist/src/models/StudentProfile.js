import mongoose, { Schema } from 'mongoose';
const StudentProfileSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    institution: { type: String, required: true, index: true },
    department: { type: String, required: true, index: true },
    yearOfStudy: { type: Number, default: 3 },
    skills: [{ type: String, index: true }],
    interestDomains: [{ type: String, index: true }],
    completedProjectsCount: { type: Number, default: 0 },
    activeProjectsCount: { type: Number, default: 0 },
    impactScore: { type: Number, default: 0 },
    bio: { type: String },
    githubUrl: { type: String },
    linkedinUrl: { type: String },
}, { timestamps: true });
export const StudentProfile = mongoose.model('StudentProfile', StudentProfileSchema);

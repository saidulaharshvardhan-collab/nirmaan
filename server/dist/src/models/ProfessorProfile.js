import mongoose, { Schema } from 'mongoose';
const ProfessorProfileSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    institution: { type: String, required: true, index: true },
    department: { type: String, required: true, index: true },
    designation: { type: String, default: 'Associate Professor' },
    expertiseAreas: [{ type: String, index: true }],
    publishedTopics: [{ type: String }],
    mentoredProjectsCount: { type: Number, default: 0 },
    contactEmail: { type: String, required: true },
    bio: { type: String },
}, { timestamps: true });
export const ProfessorProfile = mongoose.model('ProfessorProfile', ProfessorProfileSchema);

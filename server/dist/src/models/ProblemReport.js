import mongoose, { Schema } from 'mongoose';
const ProblemReportSchema = new Schema({
    title: { type: String, required: true, trim: true, index: true },
    description: { type: String, required: true },
    originalLanguage: { type: String, default: 'en' },
    translatedText: { type: String },
    aiSummary: { type: String },
    category: {
        type: String,
        required: true,
        index: true
    },
    subcategory: { type: String },
    severity: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
        default: 'MEDIUM',
        index: true
    },
    affectedPopulation: { type: Number, default: 50 },
    locationName: { type: String, default: '' },
    village: { type: String, default: '', index: true },
    district: { type: String, required: true, index: true },
    state: { type: String, default: 'Jharkhand' },
    coordinates: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
    },
    photos: [{ type: String }],
    cameraCaptured: { type: Boolean, default: false },
    audioUrl: { type: String },
    videoUrl: { type: String },
    reportedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    isAnonymous: { type: Boolean, default: false },
    reporterContactMasked: { type: String },
    clusterId: { type: Schema.Types.ObjectId, ref: 'ProblemCluster', index: true },
    duplicateConfidence: { type: Number, default: 0 },
    isDuplicate: { type: Boolean, default: false },
    status: {
        type: String,
        enum: ['OPEN', 'VERIFIED', 'CLAIMED', 'IN_PROGRESS', 'SUBMITTED', 'UNDER_REVIEW', 'RESOLVED', 'REJECTED'],
        default: 'OPEN',
        index: true
    },
    verificationStatus: {
        type: String,
        enum: ['PENDING', 'VERIFIED', 'REJECTED'],
        default: 'PENDING',
        index: true
    },
    verifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    verificationNotes: { type: String },
    claimedByProjectId: { type: Schema.Types.ObjectId, ref: 'Project' },
    embedding: [{ type: Number }],
    tags: [{ type: String }],
    suggestedDomains: [{ type: String }],
    upvotes: { type: Number, default: 0 },
    supporters: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    aiMetadata: {
        confidence: { type: Number, default: 0.9 },
        provider: { type: String, default: 'demo' },
        isFallback: { type: Boolean, default: true },
        extractedEntities: [{ type: String }],
    }
}, { timestamps: true });
ProblemReportSchema.index({ district: 1, category: 1, status: 1 });
ProblemReportSchema.index({ 'coordinates.latitude': 1, 'coordinates.longitude': 1 });
export const ProblemReport = mongoose.model('ProblemReport', ProblemReportSchema);

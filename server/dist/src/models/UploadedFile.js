import mongoose, { Schema } from 'mongoose';
const UploadedFileSchema = new Schema({
    originalName: { type: String, required: true },
    filename: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true },
    path: { type: String, required: true },
    url: { type: String, required: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    fileType: {
        type: String,
        enum: ['IMAGE', 'VIDEO', 'AUDIO', 'DOCUMENT'],
        default: 'IMAGE',
    },
    purpose: {
        type: String,
        enum: ['PROBLEM_REPORT', 'MILESTONE_EVIDENCE', 'AVATAR', 'PROJECT_DOC'],
        default: 'PROBLEM_REPORT',
    },
    metadata: { type: Schema.Types.Mixed },
}, { timestamps: { createdAt: true, updatedAt: false } });
export const UploadedFile = mongoose.model('UploadedFile', UploadedFileSchema);

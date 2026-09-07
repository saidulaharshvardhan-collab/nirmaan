import mongoose, { Schema } from 'mongoose';
const TeamSchema = new Schema({
    name: { type: String, required: true, trim: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
    leaderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    institution: { type: String, required: true },
}, { timestamps: true });
export const Team = mongoose.model('Team', TeamSchema);

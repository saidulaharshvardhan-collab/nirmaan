import mongoose, { Schema } from 'mongoose';
const TeamMemberSchema = new Schema({
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    roleInTeam: { type: String, default: 'Developer' },
    joinedAt: { type: Date, default: Date.now },
}, { timestamps: true });
export const TeamMember = mongoose.model('TeamMember', TeamMemberSchema);

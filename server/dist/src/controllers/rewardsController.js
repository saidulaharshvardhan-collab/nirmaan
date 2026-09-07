import { User } from '../models/User.js';
import { Reward } from '../models/Reward.js';
import { LeaderboardEntry } from '../models/LeaderboardEntry.js';
export async function getLeaderboard(req, res) {
    try {
        // Top Students
        const topStudents = await User.find({ role: 'STUDENT' })
            .sort({ impactPoints: -1 })
            .limit(10)
            .select('name institution department impactPoints badges avatarUrl');
        // Top Universities (aggregated from projects & student points)
        const universityLeaderboard = await LeaderboardEntry.find({ entityType: 'UNIVERSITY' })
            .sort({ points: -1 })
            .limit(10);
        // Top Citizen Contributors
        const topCitizens = await User.find({ role: { $in: ['CITIZEN', 'NGO'] } })
            .sort({ impactPoints: -1 })
            .limit(10)
            .select('name district impactPoints badges avatarUrl');
        res.status(200).json({
            success: true,
            topStudents,
            topUniversities: universityLeaderboard,
            topCitizens,
        });
    }
    catch (err) {
        console.error('Error getting leaderboard:', err);
        res.status(500).json({ success: false, message: 'Server error retrieving leaderboard' });
    }
}
export async function getMyRewards(req, res) {
    try {
        if (!req.user) {
            res.status(401).json({ success: false, message: 'Authentication required' });
            return;
        }
        const rewards = await Reward.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            totalImpactPoints: req.user.impactPoints,
            badges: req.user.badges,
            history: rewards,
        });
    }
    catch (err) {
        console.error('Error fetching rewards history:', err);
        res.status(500).json({ success: false, message: 'Server error fetching rewards' });
    }
}

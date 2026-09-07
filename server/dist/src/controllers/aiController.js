import { aiService } from '../services/ai/index.js';
import { deduplicationEngine } from '../services/deduplication/index.js';
import { smartMatchingEngine } from '../services/matching/index.js';
import { translationService } from '../services/translation/index.js';
export async function analyzeReportEndpoint(req, res) {
    try {
        const { title, description, district, village, category, originalLanguage, affectedPopulation } = req.body;
        if (!title && !description) {
            res.status(400).json({ success: false, message: 'Title or description is required for AI analysis' });
            return;
        }
        const result = await aiService.analyzeReport({
            title: title || '',
            description: description || '',
            district,
            village,
            category,
            language: originalLanguage,
            affectedPopulation
        });
        res.status(200).json({ success: true, result });
    }
    catch (err) {
        console.error('AI analyze report error:', err);
        res.status(500).json({ success: false, message: err.message || 'AI analysis failed' });
    }
}
export async function detectDuplicatesEndpoint(req, res) {
    try {
        const { title, description, district, category } = req.body;
        if (!title && !description) {
            res.status(400).json({ success: false, message: 'Title or description is required' });
            return;
        }
        const dedup = await deduplicationEngine.checkDuplicates(title || '', description || '', district || 'Ranchi', category || 'Broken bridge');
        res.status(200).json({
            success: true,
            isDuplicate: dedup.isDuplicate,
            highestSimilarity: dedup.highestSimilarity,
            clusterId: dedup.clusterId,
            clusterTitle: dedup.clusterTitle,
            explanation: dedup.explanation,
            candidates: dedup.candidates
        });
    }
    catch (err) {
        console.error('AI detect duplicates error:', err);
        res.status(500).json({ success: false, message: 'Duplicate detection failed' });
    }
}
export async function matchResearchersEndpoint(req, res) {
    try {
        const { title, description, category, suggestedDomains } = req.body;
        const matches = await smartMatchingEngine.matchProblemToResearchers(title || 'Rural infrastructure problem', description || '', category || 'Broken bridge', suggestedDomains || ['Civil Engineering', 'Rural Infrastructure']);
        res.status(200).json({ success: true, matches });
    }
    catch (err) {
        console.error('AI match researchers error:', err);
        res.status(500).json({ success: false, message: 'Researcher matching failed' });
    }
}
export async function translateEndpoint(req, res) {
    try {
        const { text, fromLang, toLang } = req.body;
        if (!text) {
            res.status(400).json({ success: false, message: 'Text is required for translation' });
            return;
        }
        const result = await translationService.translate(text, fromLang || 'hi', toLang || 'en');
        res.status(200).json({ success: true, ...result });
    }
    catch (err) {
        console.error('AI translation error:', err);
        res.status(500).json({ success: false, message: 'Translation failed' });
    }
}

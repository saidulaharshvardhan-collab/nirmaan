import { DemoFallbackProvider } from './DemoFallbackProvider.js';
export class GeminiProvider {
    name = 'Google Gemini AI (Cloud API)';
    apiKey;
    model;
    fallback;
    constructor(apiKey, model = 'gemini-1.5-flash') {
        this.apiKey = apiKey || process.env.AI_API_KEY || '';
        this.model = model || process.env.AI_MODEL || 'gemini-1.5-flash';
        this.fallback = new DemoFallbackProvider();
    }
    isAvailable() {
        return Boolean(this.apiKey && this.apiKey.trim().length > 10);
    }
    async detectLanguage(text) {
        if (!this.isAvailable()) {
            return this.fallback.detectLanguage(text);
        }
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                            parts: [{
                                    text: `Detect the language of this rural civic complaint. Return ONLY valid JSON format: {"language": "en"|"hi"|"te"|"sat"|"mun"|"ho", "confidence": 0.95}.\nText: "${text}"`
                                }]
                        }]
                })
            });
            if (!response.ok)
                throw new Error(`Gemini API error: ${response.statusText}`);
            const data = (await response.json());
            const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
            const parsed = JSON.parse(content.replace(/```json|```/g, '').trim());
            return parsed;
        }
        catch (err) {
            console.warn('Gemini detectLanguage error, falling back to local provider:', err);
            return this.fallback.detectLanguage(text);
        }
    }
    async translateText(text, fromLang, toLang = 'en') {
        if (!this.isAvailable() || fromLang === toLang) {
            return this.fallback.translateText(text, fromLang, toLang);
        }
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                            parts: [{
                                    text: `Translate this civic issue description from ${fromLang} to ${toLang}. Output only the translated text.\nText: "${text}"`
                                }]
                        }]
                })
            });
            if (!response.ok)
                throw new Error(`Gemini API error: ${response.statusText}`);
            const data = (await response.json());
            return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || text;
        }
        catch (err) {
            console.warn('Gemini translateText error, falling back to local provider:', err);
            return this.fallback.translateText(text, fromLang, toLang);
        }
    }
    async analyzeReport(input) {
        if (!this.isAvailable()) {
            return this.fallback.analyzeReport(input);
        }
        try {
            const prompt = `You are the GramUtthan AI civic analyzer for the Government of Jharkhand.
Analyze this civic issue report and output strictly structured JSON matching this schema:
{
  "detectedLanguage": "en" | "hi" | "te" | "sat" | "mun" | "ho",
  "originalText": string,
  "translatedText": string,
  "summary": string,
  "category": "Broken bridge" | "Damaged road" | "Drinking water shortage" | "Non-functional borewell" | "Streetlight failure" | "Waste-management issue" | "School infrastructure problem" | "Drainage problem" | "Electricity issue" | "Healthcare/access issue" | "Other",
  "subcategory": string,
  "severity": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
  "urgency": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
  "affectedPopulation": number,
  "locationEntities": string[],
  "tags": string[],
  "suggestedResearchDomains": string[],
  "duplicateCandidates": [],
  "confidence": number
}

Input:
Title: ${input.title}
Description: ${input.description}
District: ${input.district || 'Jharkhand'}
Village: ${input.village || ''}
Category hint: ${input.category || ''}
`;
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: { responseMimeType: 'application/json' }
                })
            });
            if (!response.ok)
                throw new Error(`Gemini API returned ${response.status}`);
            const data = (await response.json());
            const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
            const parsed = JSON.parse(rawText);
            return {
                ...parsed,
                isFallback: false,
                provider: 'Google Gemini 1.5 Flash'
            };
        }
        catch (err) {
            console.warn('Gemini analyzeReport failed, falling back to local demo provider:', err);
            const fallbackResult = await this.fallback.analyzeReport(input);
            fallbackResult.provider = 'Demo AI Pipeline (Gemini fallback)';
            return fallbackResult;
        }
    }
    async generateEmbedding(text) {
        return this.fallback.generateEmbedding(text);
    }
}

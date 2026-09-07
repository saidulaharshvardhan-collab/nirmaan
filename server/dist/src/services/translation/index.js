import { aiService } from '../ai/index.js';
export class MultilingualTranslationService {
    async translate(text, fromLang, toLang = 'en') {
        if (!text || fromLang === toLang) {
            return {
                sourceLanguage: fromLang,
                targetLanguage: toLang,
                originalText: text,
                translatedText: text,
                status: 'COMPLETED',
                provider: 'Identity / No translation required'
            };
        }
        try {
            const translated = await aiService.translateText(text, fromLang, toLang);
            const isDemo = aiService.isDemoMode();
            return {
                sourceLanguage: fromLang,
                targetLanguage: toLang,
                originalText: text,
                translatedText: translated,
                status: isDemo ? 'FALLBACK_USED' : 'COMPLETED',
                provider: isDemo ? 'Local Multilingual Lexicon / Demo Engine' : 'Cloud Translation API'
            };
        }
        catch (err) {
            console.warn('Translation service error:', err.message);
            return {
                sourceLanguage: fromLang,
                targetLanguage: toLang,
                originalText: text,
                translatedText: text,
                status: 'PROVIDER_UNAVAILABLE',
                provider: 'Fallback Local Passthrough'
            };
        }
    }
}
export const translationService = new MultilingualTranslationService();

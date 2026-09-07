import { IAIProvider } from './types.js';
import { DemoFallbackProvider } from './DemoFallbackProvider.js';
import { GeminiProvider } from './GeminiProvider.js';
import { AIAnalysisInput } from './types.js';
import { AIAnalysisResult } from '../../types/index.js';

class AIServiceManager {
  private activeProvider: IAIProvider;
  private demoFallbackProvider: DemoFallbackProvider;

  constructor() {
    this.demoFallbackProvider = new DemoFallbackProvider();
    const providerChoice = (process.env.AI_PROVIDER || 'demo').toLowerCase();

    if (providerChoice === 'gemini' && process.env.AI_API_KEY) {
      this.activeProvider = new GeminiProvider();
      console.log('AI Service initialized with Google Gemini Provider.');
    } else {
      this.activeProvider = this.demoFallbackProvider;
      console.log('AI Service initialized with Demo Fallback Provider (Deterministic Hackathon Engine).');
    }
  }

  getProviderName(): string {
    return this.activeProvider.name;
  }

  isDemoMode(): boolean {
    return process.env.DEMO_MODE === 'true' || !this.activeProvider.isAvailable();
  }

  async analyzeReport(input: AIAnalysisInput): Promise<AIAnalysisResult> {
    // If in demo mode, add realistic slight processing time (e.g. 500ms) for realistic UX simulation
    const delay = parseInt(process.env.DEMO_AI_LATENCY_MS || '500', 10);
    if (delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    return this.activeProvider.analyzeReport(input);
  }

  async detectLanguage(text: string) {
    return this.activeProvider.detectLanguage(text);
  }

  async translateText(text: string, fromLang: string, toLang: string = 'en') {
    return this.activeProvider.translateText(text, fromLang, toLang);
  }

  async generateEmbedding(text: string): Promise<number[]> {
    return this.activeProvider.generateEmbedding(text);
  }
}

export const aiService = new AIServiceManager();
export * from './types.js';

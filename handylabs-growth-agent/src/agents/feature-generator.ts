import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';

interface FeatureRequest {
  type: 'component' | 'page' | 'api' | 'utility' | 'integration';
  category: 'ux' | 'conversion' | 'seo' | 'performance' | 'analytics' | 'engagement';
  target: 'vc' | 'entrepreneur' | 'business' | 'general';
  complexity: 'simple' | 'medium' | 'advanced';
}

interface GeneratedFeature {
  name: string;
  description: string;
  files: FeatureFile[];
  dependencies: string[];
  implementation: string;
  businessValue: string;
  metrics: string[];
}

interface FeatureFile {
  path: string;
  content: string;
  type: 'component' | 'page' | 'api' | 'style' | 'config' | 'test';
}

class FeatureGenerator {
  private openai: OpenAI;
  private workspaceRoot: string;

  constructor(openaiApiKey: string, workspaceRoot: string = process.cwd()) {
    this.openai = new OpenAI({ apiKey: openaiApiKey });
    this.workspaceRoot = workspaceRoot;
  }

  async generateFeature(request: FeatureRequest): Promise<GeneratedFeature> {
    const prompt = this.buildFeaturePrompt(request);
    
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 4000
      });

      const feature = JSON.parse(response.choices[0].message.content || '{}');
      return this.validateAndEnhanceFeature(feature);
    } catch (error) {
      console.error('Error generating feature:', error);
      throw error;
    }
  }

  private buildFeaturePrompt(request: FeatureRequest): string {
    const context = this.getContextForTarget(request.target);
    
    return `
Generate a complete ${request.type} feature for HandyLabs technology studio website.

CONTEXT:
${context}

REQUIREMENTS:
- Type: ${request.type}
- Category: ${request.category}
- Target Audience: ${request.target}
- Complexity: ${request.complexity}

TECH STACK:
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons

GENERATE:
1. Feature name and description
2. Complete file structure with content
3. Required dependencies
4. Implementation instructions
5. Business value explanation
6. Success metrics to track

FORMAT: Return valid JSON with the structure:
{
  "name": "Feature Name",
  "description": "Clear description",
  "files": [
    {
      "path": "relative/path/to/file.tsx",
      "content": "complete file content",
      "type": "component|page|api|style|config|test"
    }
  ],
  "dependencies": ["package-name"],
  "implementation": "step-by-step instructions",
  "businessValue": "why this matters for VCs/entrepreneurs",
  "metrics": ["metric1", "metric2"]
}

FOCUS ON:
- Conversion optimization for VC/entrepreneur audience
- Professional, enterprise-grade UI/UX
- Performance and SEO optimization
- Analytics and measurement capabilities
- Modern web development best practices

EXAMPLES OF VALUABLE FEATURES:
- Interactive ROI calculators
- Client success story timelines
- Technology stack showcases
- Investment readiness assessments
- Partnership inquiry forms
- Case study generators
- Performance dashboards
- Social proof widgets
- Lead scoring systems
- Automated follow-up sequences
`;
  }

  private getContextForTarget(target: string): string {
    const contexts = {
      vc: `
HandyLabs targets Venture Capitalists looking for:
- Technology due diligence services
- Investment-ready platform development
- Portfolio company technical support
- Scalable system architecture
- Proven track record with metrics
- Enterprise-grade security and compliance
      `,
      entrepreneur: `
HandyLabs targets Entrepreneurs seeking:
- CTO-level technical leadership
- Rapid MVP to market development
- Scalable technology foundations
- Integration with existing systems
- Cost-effective development solutions
- Technical strategy and roadmapping
      `,
      business: `
HandyLabs targets Business Leaders needing:
- Enterprise solution development
- Digital transformation consulting
- System integration and optimization
- Process automation
- Data analytics and insights
- Technology modernization
      `,
      general: `
HandyLabs is an elite technology studio serving:
- High-growth companies
- Enterprise clients
- Technology-driven businesses
- Innovation-focused organizations
- Scalability-minded companies
      `
    };

    return contexts[target as keyof typeof contexts] || contexts.general;
  }

  private validateAndEnhanceFeature(feature: GeneratedFeature): GeneratedFeature {
    // Ensure all required fields are present
    if (!feature.name || !feature.description || !feature.files) {
      throw new Error('Generated feature is missing required fields');
    }

    // Add standard dependencies if not present
    const standardDeps = ['lucide-react', 'framer-motion', 'clsx'];
    standardDeps.forEach(dep => {
      if (!feature.dependencies.includes(dep)) {
        feature.dependencies.push(dep);
      }
    });

    // Enhance files with proper TypeScript types
    feature.files = feature.files.map(file => ({
      ...file,
      content: this.enhanceWithTypes(file.content, file.type)
    }));

    return feature;
  }

  private enhanceWithTypes(content: string, type: string): string {
    // Add proper TypeScript imports and types
    if (type === 'component' && !content.includes('import React')) {
      content = `import React from 'react';\n${content}`;
    }

    if (type === 'component' && !content.includes('interface') && !content.includes('type')) {
      // Add basic prop interface if none exists
      const componentMatch = content.match(/export default function (\w+)/);
      if (componentMatch) {
        const componentName = componentMatch[1];
        content = content.replace(
          `export default function ${componentName}`,
          `interface ${componentName}Props {}\n\nexport default function ${componentName}(props: ${componentName}Props)`
        );
      }
    }

    return content;
  }

  // Predefined feature templates for common use cases
  async generateVCDashboard(): Promise<GeneratedFeature> {
    return this.generateFeature({
      type: 'component',
      category: 'analytics',
      target: 'vc',
      complexity: 'advanced'
    });
  }

  async generateROICalculator(): Promise<GeneratedFeature> {
    return this.generateFeature({
      type: 'component',
      category: 'conversion',
      target: 'entrepreneur',
      complexity: 'medium'
    });
  }

  async generateCaseStudyGenerator(): Promise<GeneratedFeature> {
    return this.generateFeature({
      type: 'component',
      category: 'seo',
      target: 'business',
      complexity: 'medium'
    });
  }

  async generatePerformanceWidget(): Promise<GeneratedFeature> {
    return this.generateFeature({
      type: 'component',
      category: 'performance',
      target: 'general',
      complexity: 'simple'
    });
  }

  async generateLeadScoringSystem(): Promise<GeneratedFeature> {
    return this.generateFeature({
      type: 'api',
      category: 'analytics',
      target: 'business',
      complexity: 'advanced'
    });
  }

  async generateInteractiveDemoSection(): Promise<GeneratedFeature> {
    return this.generateFeature({
      type: 'component',
      category: 'engagement',
      target: 'general',
      complexity: 'medium'
    });
  }
}

export default FeatureGenerator;
import { Octokit } from '@octokit/rest';
import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface ImprovementPlan {
  title: string;
  description: string;
  type: 'feature' | 'ux' | 'performance' | 'seo' | 'accessibility' | 'security' | 'documentation' | 'testing';
  priority: 'high' | 'medium' | 'low';
  estimatedImpact: string;
  files: string[];
  changes: FileChange[];
}

interface FileChange {
  filepath: string;
  action: 'create' | 'modify' | 'delete';
  content?: string;
  reason: string;
}

interface AnalysisReport {
  codeQuality: {
    score: number;
    issues: string[];
    recommendations: string[];
  };
  seoOpportunities: string[];
  uxEnhancements: string[];
  performanceOptimizations: string[];
  accessibilityImprovements: string[];
  securityEnhancements: string[];
  missingFeatures: string[];
}

class AutonomousImprovementAgent {
  private octokit: Octokit;
  private openai: OpenAI;
  private repoOwner: string;
  private repoName: string;
  private workspaceRoot: string;

  constructor(
    githubToken: string,
    openaiApiKey: string,
    repoOwner: string,
    repoName: string,
    workspaceRoot: string = process.cwd()
  ) {
    this.octokit = new Octokit({ auth: githubToken });
    this.openai = new OpenAI({ apiKey: openaiApiKey });
    this.repoOwner = repoOwner;
    this.repoName = repoName;
    this.workspaceRoot = workspaceRoot;
  }

  async runDailyImprovement(): Promise<void> {
    try {
      console.log('🚀 Starting daily improvement cycle...');
      
      // Step 1: Analyze current codebase
      const analysisReport = await this.analyzeCodebase();
      console.log('📊 Codebase analysis complete');

      // Step 2: Generate improvement plan
      const improvementPlan = await this.generateImprovementPlan(analysisReport);
      console.log('📋 Improvement plan generated');

      // Step 3: Create branch and implement changes
      const branchName = `auto-improvement-${Date.now()}`;
      await this.createBranch(branchName);
      console.log(`🌿 Created branch: ${branchName}`);

      // Step 4: Implement the improvements
      await this.implementImprovements(improvementPlan);
      console.log('🔧 Improvements implemented');

      // Step 5: Create pull request
      await this.createPullRequest(branchName, improvementPlan);
      console.log('✅ Pull request created successfully');

    } catch (error) {
      console.error('❌ Error in daily improvement cycle:', error);
      throw error;
    }
  }

  private async analyzeCodebase(): Promise<AnalysisReport> {
    const analysis: AnalysisReport = {
      codeQuality: { score: 0, issues: [], recommendations: [] },
      seoOpportunities: [],
      uxEnhancements: [],
      performanceOptimizations: [],
      accessibilityImprovements: [],
      securityEnhancements: [],
      missingFeatures: []
    };

    try {
      // Analyze main pages
      const pages = await this.getPageFiles();
      
      for (const page of pages) {
        const pageAnalysis = await this.analyzePageWithAI(page);
        this.mergeAnalysis(analysis, pageAnalysis);
      }

      // Analyze package.json for dependencies
      const packageJson = await this.readFile('package.json');
      const depAnalysis = await this.analyzeDependencies(packageJson);
      this.mergeAnalysis(analysis, depAnalysis);

      // Run automated code quality checks
      const codeQualityReport = await this.runCodeQualityChecks();
      analysis.codeQuality = codeQualityReport;

      return analysis;
    } catch (error) {
      console.error('Error analyzing codebase:', error);
      throw error;
    }
  }

  private async analyzePageWithAI(filePath: string): Promise<Partial<AnalysisReport>> {
    const content = await this.readFile(filePath);
    
    const prompt = `
Analyze this ${path.extname(filePath)} file for a technology studio website targeting VCs and entrepreneurs:

${content}

Please provide analysis in these areas:
1. SEO opportunities (meta tags, structured data, content optimization)
2. UX enhancements (user experience improvements, conversion optimization)
3. Performance optimizations (loading speed, bundle size, Core Web Vitals)
4. Accessibility improvements (WCAG compliance, screen reader support)
5. Security enhancements (XSS prevention, data validation)
6. Missing features that would benefit VCs/entrepreneurs

Return JSON format with specific, actionable recommendations.
`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 2000
      });

      const aiAnalysis = JSON.parse(response.choices[0].message.content || '{}');
      return aiAnalysis;
    } catch (error) {
      console.error('Error in AI analysis:', error);
      return {};
    }
  }

  private async generateImprovementPlan(analysis: AnalysisReport): Promise<ImprovementPlan> {
    const improvements = [
      ...analysis.seoOpportunities.map(item => ({ type: 'seo' as const, item })),
      ...analysis.uxEnhancements.map(item => ({ type: 'ux' as const, item })),
      ...analysis.performanceOptimizations.map(item => ({ type: 'performance' as const, item })),
      ...analysis.accessibilityImprovements.map(item => ({ type: 'accessibility' as const, item })),
      ...analysis.securityEnhancements.map(item => ({ type: 'security' as const, item })),
      ...analysis.missingFeatures.map(item => ({ type: 'feature' as const, item }))
    ];

    // Prioritize improvements based on impact
    const prioritizedImprovement = this.prioritizeImprovements(improvements);
    
    const plan = await this.createDetailedPlan(prioritizedImprovement);
    return plan;
  }

  private async createDetailedPlan(improvement: { type: string; item: string }): Promise<ImprovementPlan> {
    const prompt = `
Create a detailed implementation plan for this improvement:
Type: ${improvement.type}
Description: ${improvement.item}

For a HandyLabs technology studio website (Next.js/React/TypeScript) targeting VCs and entrepreneurs.

Provide:
1. Clear title and description
2. Priority level (high/medium/low)
3. Estimated business impact
4. Specific files to modify/create
5. Detailed implementation steps
6. Code changes needed

Return JSON format.
`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2,
        max_tokens: 1500
      });

      return JSON.parse(response.choices[0].message.content || '{}');
    } catch (error) {
      console.error('Error generating detailed plan:', error);
      throw error;
    }
  }

  private async implementImprovements(plan: ImprovementPlan): Promise<void> {
    for (const change of plan.changes) {
      try {
        switch (change.action) {
          case 'create':
            await this.createFile(change.filepath, change.content || '');
            break;
          case 'modify':
            await this.modifyFile(change.filepath, change.content || '');
            break;
          case 'delete':
            await this.deleteFile(change.filepath);
            break;
        }
        
        console.log(`✅ ${change.action} ${change.filepath}: ${change.reason}`);
      } catch (error) {
        console.error(`❌ Error ${change.action} ${change.filepath}:`, error);
      }
    }
  }

  private async createBranch(branchName: string): Promise<void> {
    try {
      const { data: ref } = await this.octokit.git.getRef({
        owner: this.repoOwner,
        repo: this.repoName,
        ref: 'heads/main'
      });

      await this.octokit.git.createRef({
        owner: this.repoOwner,
        repo: this.repoName,
        ref: `refs/heads/${branchName}`,
        sha: ref.object.sha
      });
    } catch (error) {
      console.error('Error creating branch:', error);
      throw error;
    }
  }

  private async createPullRequest(branchName: string, plan: ImprovementPlan): Promise<void> {
    const prTitle = `🤖 Auto-Improvement: ${plan.title}`;
    const prBody = `
## 🎯 Improvement Summary

**Type**: ${plan.type.toUpperCase()}  
**Priority**: ${plan.priority.toUpperCase()}

${plan.description}

## 🚀 Expected Impact

${plan.estimatedImpact}

## 📝 Changes Made

${plan.changes.map(change => `- **${change.action.toUpperCase()}** \`${change.filepath}\`: ${change.reason}`).join('\n')}

## 🔍 Files Modified

${plan.files.map(file => `- \`${file}\``).join('\n')}

---

*This PR was automatically generated by the HandyLabs Autonomous Improvement Agent 🤖*  
*Review carefully and merge when ready!*
`;

    try {
      await this.octokit.pulls.create({
        owner: this.repoOwner,
        repo: this.repoName,
        title: prTitle,
        body: prBody,
        head: branchName,
        base: 'main'
      });
    } catch (error) {
      console.error('Error creating pull request:', error);
      throw error;
    }
  }

  // Helper methods
  private async getPageFiles(): Promise<string[]> {
    const srcDir = path.join(this.workspaceRoot, 'src');
    const files: string[] = [];
    
    const searchPatterns = [
      'src/app/**/*.tsx',
      'src/app/**/*.ts',
      'src/components/**/*.tsx',
      'src/components/**/*.ts'
    ];

    for (const pattern of searchPatterns) {
      try {
        const { stdout } = await execAsync(`find ${this.workspaceRoot} -path "${pattern}" -type f`);
        files.push(...stdout.split('\n').filter(f => f.trim()));
      } catch (error) {
        // Continue if pattern doesn't match
      }
    }

    return files;
  }

  private async readFile(filePath: string): Promise<string> {
    const fullPath = path.isAbsolute(filePath) ? filePath : path.join(this.workspaceRoot, filePath);
    return fs.promises.readFile(fullPath, 'utf8');
  }

  private async createFile(filePath: string, content: string): Promise<void> {
    const fullPath = path.join(this.workspaceRoot, filePath);
    await fs.promises.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.promises.writeFile(fullPath, content, 'utf8');
  }

  private async modifyFile(filePath: string, content: string): Promise<void> {
    const fullPath = path.join(this.workspaceRoot, filePath);
    await fs.promises.writeFile(fullPath, content, 'utf8');
  }

  private async deleteFile(filePath: string): Promise<void> {
    const fullPath = path.join(this.workspaceRoot, filePath);
    await fs.promises.unlink(fullPath);
  }

  private async runCodeQualityChecks(): Promise<{ score: number; issues: string[]; recommendations: string[] }> {
    const issues: string[] = [];
    const recommendations: string[] = [];

    try {
      // Run ESLint
      const { stdout: eslintOutput } = await execAsync('npx eslint src --format=json', { 
        cwd: this.workspaceRoot,
        maxBuffer: 1024 * 1024 
      });
      
      const eslintResults = JSON.parse(eslintOutput);
      eslintResults.forEach((result: any) => {
        result.messages.forEach((msg: any) => {
          issues.push(`${result.filePath}: ${msg.message}`);
        });
      });
    } catch (error) {
      // ESLint may not be configured
    }

    // Calculate score based on issues found
    const score = Math.max(0, 100 - issues.length * 5);

    return { score, issues, recommendations };
  }

  private async analyzeDependencies(packageContent: string): Promise<Partial<AnalysisReport>> {
    const pkg = JSON.parse(packageContent);
    const analysis: Partial<AnalysisReport> = {
      securityEnhancements: [],
      performanceOptimizations: [],
      missingFeatures: []
    };

    // Check for missing essential dependencies
    const essentialDeps = [
      '@next/bundle-analyzer',
      'next-sitemap',
      'sharp',
      '@vercel/analytics',
      'framer-motion'
    ];

    essentialDeps.forEach(dep => {
      if (!pkg.dependencies?.[dep] && !pkg.devDependencies?.[dep]) {
        analysis.missingFeatures?.push(`Add ${dep} for better functionality`);
      }
    });

    return analysis;
  }

  private mergeAnalysis(target: AnalysisReport, source: Partial<AnalysisReport>): void {
    if (source.seoOpportunities) target.seoOpportunities.push(...source.seoOpportunities);
    if (source.uxEnhancements) target.uxEnhancements.push(...source.uxEnhancements);
    if (source.performanceOptimizations) target.performanceOptimizations.push(...source.performanceOptimizations);
    if (source.accessibilityImprovements) target.accessibilityImprovements.push(...source.accessibilityImprovements);
    if (source.securityEnhancements) target.securityEnhancements.push(...source.securityEnhancements);
    if (source.missingFeatures) target.missingFeatures.push(...source.missingFeatures);
  }

  private prioritizeImprovements(improvements: Array<{ type: string; item: string }>): { type: string; item: string } {
    // Priority order: security > performance > seo > ux > accessibility > features
    const priorities = ['security', 'performance', 'seo', 'ux', 'accessibility', 'feature'];
    
    for (const priority of priorities) {
      const found = improvements.find(imp => imp.type === priority);
      if (found) return found;
    }
    
    return improvements[0] || { type: 'feature', item: 'Add general improvement' };
  }
}

export default AutonomousImprovementAgent;
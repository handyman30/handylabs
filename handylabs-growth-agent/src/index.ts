import dotenv from 'dotenv';
import AutonomousImprovementAgent from './agents/autonomous-improvement-agent';
import ImprovementScheduler, { SchedulePresets } from './agents/scheduler';
import FeatureGenerator from './agents/feature-generator';
import GitHubPRAgent from './agents/github-pr-agent';
import { program } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';

// Load environment variables
dotenv.config();

class HandyLabsGrowthAgent {
  private agent: AutonomousImprovementAgent;
  private scheduler: ImprovementScheduler;
  private featureGenerator: FeatureGenerator;
  private prAgent: GitHubPRAgent;

  constructor() {
    const config = this.loadConfig();
    
    this.agent = new AutonomousImprovementAgent(
      config.GITHUB_TOKEN,
      config.OPENAI_API_KEY,
      config.REPO_OWNER,
      config.REPO_NAME,
      config.WORKSPACE_ROOT
    );

    this.scheduler = new ImprovementScheduler({
      githubToken: config.GITHUB_TOKEN,
      openaiApiKey: config.OPENAI_API_KEY,
      repoOwner: config.REPO_OWNER,
      repoName: config.REPO_NAME,
      workspaceRoot: config.WORKSPACE_ROOT,
      cronExpression: config.CRON_EXPRESSION || SchedulePresets.DAILY_9AM
    });

    this.featureGenerator = new FeatureGenerator(
      config.OPENAI_API_KEY,
      config.WORKSPACE_ROOT
    );

    this.prAgent = new GitHubPRAgent(
      config.GITHUB_TOKEN,
      config.REPO_OWNER,
      config.REPO_NAME,
      config.WORKSPACE_ROOT
    );
  }

  private loadConfig() {
    const required = ['GITHUB_TOKEN', 'OPENAI_API_KEY', 'REPO_OWNER', 'REPO_NAME'];
    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
      console.error(chalk.red('Missing required environment variables:'), missing.join(', '));
      process.exit(1);
    }

    return {
      GITHUB_TOKEN: process.env.GITHUB_TOKEN!,
      OPENAI_API_KEY: process.env.OPENAI_API_KEY!,
      REPO_OWNER: process.env.REPO_OWNER!,
      REPO_NAME: process.env.REPO_NAME!,
      WORKSPACE_ROOT: process.env.WORKSPACE_ROOT || process.cwd(),
      CRON_EXPRESSION: process.env.CRON_EXPRESSION
    };
  }

  async startScheduler(): Promise<void> {
    console.log(chalk.green('🚀 Starting HandyLabs Growth Agent Scheduler'));
    this.scheduler.start();
    
    // Keep the process running
    setInterval(() => {
      const status = this.scheduler.getStatus();
      console.log(chalk.blue(`📊 Status: ${status.isRunning ? 'Running' : 'Stopped'}`));
      if (status.nextRun) {
        console.log(chalk.blue(`⏰ Next run: ${status.nextRun.toLocaleString()}`));
      }
    }, 60000); // Log status every minute
  }

  async runOnce(): Promise<void> {
    console.log(chalk.green('🔄 Running improvement cycle once'));
    await this.agent.runDailyImprovement();
  }

  async interactiveMode(): Promise<void> {
    console.log(chalk.yellow('🎛️  Interactive Mode - Choose what to do:'));
    
    const choices = [
      'Run improvement cycle now',
      'Start scheduled improvements',
      'Generate specific feature',
      'View scheduler status',
      'Exit'
    ];

    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices
      }
    ]);

    switch (action) {
      case 'Run improvement cycle now':
        await this.runOnce();
        break;
      case 'Start scheduled improvements':
        await this.startScheduler();
        break;
      case 'Generate specific feature':
        await this.generateFeatureInteractive();
        break;
      case 'View scheduler status':
        this.showSchedulerStatus();
        break;
      case 'Exit':
        console.log(chalk.green('👋 Goodbye!'));
        process.exit(0);
        break;
    }
  }

  private async generateFeatureInteractive(): Promise<void> {
    const { featureType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'featureType',
        message: 'What type of feature would you like to generate?',
        choices: [
          'VC Dashboard',
          'ROI Calculator',
          'Case Study Generator',
          'Performance Widget',
          'Lead Scoring System',
          'Interactive Demo Section'
        ]
      }
    ]);

    console.log(chalk.blue(`🎨 Generating ${featureType}...`));
    
    let feature;
    switch (featureType) {
      case 'VC Dashboard':
        feature = await this.featureGenerator.generateVCDashboard();
        break;
      case 'ROI Calculator':
        feature = await this.featureGenerator.generateROICalculator();
        break;
      case 'Case Study Generator':
        feature = await this.featureGenerator.generateCaseStudyGenerator();
        break;
      case 'Performance Widget':
        feature = await this.featureGenerator.generatePerformanceWidget();
        break;
      case 'Lead Scoring System':
        feature = await this.featureGenerator.generateLeadScoringSystem();
        break;
      case 'Interactive Demo Section':
        feature = await this.featureGenerator.generateInteractiveDemoSection();
        break;
      default:
        console.log(chalk.red('Invalid feature type'));
        return;
    }

    console.log(chalk.green(`✅ Generated feature: ${feature.name}`));
    console.log(chalk.blue(`📝 Description: ${feature.description}`));
    console.log(chalk.blue(`💼 Business Value: ${feature.businessValue}`));
    console.log(chalk.blue(`📊 Metrics: ${feature.metrics.join(', ')}`));
    
    const { shouldCreatePR } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'shouldCreatePR',
        message: 'Would you like to create a PR for this feature?',
        default: true
      }
    ]);

    if (shouldCreatePR) {
      const branchName = `feature-${feature.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
      const changes = feature.files.map(file => ({
        path: file.path,
        content: file.content,
        action: 'create' as const
      }));

      await this.prAgent.createFeaturePR(branchName, changes, feature.name);
      console.log(chalk.green(`🎉 Created PR for ${feature.name}`));
    }
  }

  private showSchedulerStatus(): void {
    const status = this.scheduler.getStatus();
    console.log(chalk.blue('📊 Scheduler Status:'));
    console.log(chalk.blue(`  Running: ${status.isRunning ? '✅ Yes' : '❌ No'}`));
    console.log(chalk.blue(`  Schedule: ${status.cronExpression}`));
    if (status.nextRun) {
      console.log(chalk.blue(`  Next run: ${status.nextRun.toLocaleString()}`));
    }
  }
}

// CLI Command setup
program
  .name('handylabs-growth-agent')
  .description('Autonomous improvement agent for HandyLabs')
  .version('1.0.0');

program
  .command('start')
  .description('Start the scheduled improvement agent')
  .action(async () => {
    const agent = new HandyLabsGrowthAgent();
    await agent.startScheduler();
  });

program
  .command('run-once')
  .description('Run improvement cycle once')
  .action(async () => {
    const agent = new HandyLabsGrowthAgent();
    await agent.runOnce();
  });

program
  .command('interactive')
  .description('Run in interactive mode')
  .action(async () => {
    const agent = new HandyLabsGrowthAgent();
    await agent.interactiveMode();
  });

program
  .command('status')
  .description('Show scheduler status')
  .action(() => {
    const agent = new HandyLabsGrowthAgent();
    agent.showSchedulerStatus();
  });

// Run CLI if this file is executed directly
if (require.main === module) {
  program.parse();
}

export default HandyLabsGrowthAgent;
import cron from 'node-cron';
import AutonomousImprovementAgent from './autonomous-improvement-agent';

interface SchedulerConfig {
  githubToken: string;
  openaiApiKey: string;
  repoOwner: string;
  repoName: string;
  workspaceRoot: string;
  cronExpression: string; // e.g., '0 9 * * *' for daily at 9 AM
  timezone?: string;
}

class ImprovementScheduler {
  private agent: AutonomousImprovementAgent;
  private config: SchedulerConfig;
  private task: cron.ScheduledTask | null = null;

  constructor(config: SchedulerConfig) {
    this.config = config;
    this.agent = new AutonomousImprovementAgent(
      config.githubToken,
      config.openaiApiKey,
      config.repoOwner,
      config.repoName,
      config.workspaceRoot
    );
  }

  start(): void {
    console.log(`🕒 Starting improvement scheduler with cron: ${this.config.cronExpression}`);
    
    this.task = cron.schedule(
      this.config.cronExpression,
      async () => {
        console.log('⚡ Scheduled improvement cycle triggered at:', new Date().toISOString());
        try {
          await this.agent.runDailyImprovement();
          console.log('✅ Scheduled improvement cycle completed successfully');
        } catch (error) {
          console.error('❌ Error in scheduled improvement cycle:', error);
        }
      },
      {
        scheduled: true,
        timezone: this.config.timezone || 'UTC'
      }
    );

    console.log('✅ Improvement scheduler started successfully');
  }

  stop(): void {
    if (this.task) {
      this.task.stop();
      this.task = null;
      console.log('🛑 Improvement scheduler stopped');
    }
  }

  async runNow(): Promise<void> {
    console.log('🚀 Running improvement cycle manually...');
    try {
      await this.agent.runDailyImprovement();
      console.log('✅ Manual improvement cycle completed successfully');
    } catch (error) {
      console.error('❌ Error in manual improvement cycle:', error);
      throw error;
    }
  }

  getStatus(): {
    isRunning: boolean;
    nextRun: Date | null;
    cronExpression: string;
  } {
    return {
      isRunning: this.task !== null,
      nextRun: this.task ? new Date(this.task.nextDate().toISOString()) : null,
      cronExpression: this.config.cronExpression
    };
  }
}

// Predefined schedules for easy configuration
export const SchedulePresets = {
  DAILY_9AM: '0 9 * * *',
  DAILY_6PM: '0 18 * * *',
  TWICE_DAILY: '0 9,18 * * *',
  EVERY_8_HOURS: '0 */8 * * *',
  WEEKDAYS_ONLY: '0 9 * * 1-5',
  CUSTOM_FREQUENCY: (times: number) => `0 */${24/times} * * *`
};

export default ImprovementScheduler;
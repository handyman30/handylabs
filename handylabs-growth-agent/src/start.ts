#!/usr/bin/env node

import HandyLabsGrowthAgent from './index';
import chalk from 'chalk';

async function main() {
  console.log(chalk.green('🚀 HandyLabs Growth Agent Starting...'));
  
  const agent = new HandyLabsGrowthAgent();
  
  // Check if we should run in interactive mode
  const isInteractive = process.argv.includes('--interactive') || process.argv.includes('-i');
  
  if (isInteractive) {
    await agent.interactiveMode();
  } else {
    // Default to starting the scheduler
    await agent.startScheduler();
  }
}

main().catch(error => {
  console.error(chalk.red('❌ Error starting growth agent:'), error);
  process.exit(1);
});
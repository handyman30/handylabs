# HandyLabs Growth Agent 🤖

An autonomous improvement agent that analyzes your codebase and creates meaningful pull requests with features, UX improvements, and optimizations. Built specifically for the HandyLabs technology studio website.

## 🌟 Features

- **AI-Powered Analysis**: Uses OpenAI GPT-4 to analyze code and identify improvement opportunities
- **Automated PR Creation**: Creates well-structured pull requests with detailed descriptions
- **Configurable Scheduling**: Run daily, multiple times per day, or on custom schedules
- **Multi-Type Improvements**: Handles SEO, UX, performance, accessibility, security, and feature enhancements
- **Interactive Mode**: Choose specific features to generate or improvements to make
- **Enterprise-Ready**: Built for professional development workflows

## 🚀 Quick Start

### 1. Installation

```bash
cd handylabs-growth-agent
npm install
```

### 2. Configuration

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
GITHUB_TOKEN=your_github_personal_access_token_here
REPO_OWNER=your_github_username
REPO_NAME=handylabs
OPENAI_API_KEY=your_openai_api_key_here
WORKSPACE_ROOT=/path/to/your/workspace
```

### 3. Run the Agent

**Interactive Mode (Recommended for first time):**
```bash
npm run dev interactive
```

**Start Scheduled Improvements:**
```bash
npm run start
```

**Run Once:**
```bash
npm run dev run-once
```

## 📅 Scheduling Options

The agent supports flexible scheduling via cron expressions:

- **Daily at 9 AM**: `0 9 * * *` (default)
- **Twice daily**: `0 9,18 * * *`
- **Every 8 hours**: `0 */8 * * *`
- **Weekdays only**: `0 9 * * 1-5`

Set your preferred schedule in the `.env` file:

```env
CRON_EXPRESSION=0 9,18 * * *  # 9 AM and 6 PM daily
```

## 🎯 What It Does

The agent analyzes your codebase for:

### 🔍 **Code Analysis**
- SEO optimization opportunities
- UX/UI enhancement suggestions
- Performance bottlenecks
- Accessibility improvements
- Security vulnerabilities
- Missing features for VCs/entrepreneurs

### 🛠️ **Automatic Improvements**
- Adds missing meta tags and structured data
- Implements performance optimizations
- Enhances accessibility compliance
- Adds security best practices
- Creates new features and components

### 📊 **PR Creation**
- Detailed descriptions with business impact
- Automated testing and quality checks
- Proper labeling and categorization
- Code review recommendations

## 🎨 Feature Generation

The agent can generate specific features:

- **VC Dashboard**: Analytics and metrics for venture capitalists
- **ROI Calculator**: Interactive calculators for entrepreneurs
- **Case Study Generator**: SEO-optimized case studies
- **Performance Widgets**: Real-time performance displays
- **Lead Scoring System**: Advanced lead qualification
- **Interactive Demo Section**: Engagement-focused demonstrations

## 📚 Usage Examples

### Command Line Interface

```bash
# Start the scheduler
npm run start

# Run improvement cycle once
npm run dev run-once

# Interactive mode
npm run dev interactive

# Check scheduler status
npm run dev status
```

### Programmatic Usage

```typescript
import HandyLabsGrowthAgent from './src/index';

const agent = new HandyLabsGrowthAgent();

// Run once
await agent.runOnce();

// Start scheduler
await agent.startScheduler();

// Interactive mode
await agent.interactiveMode();
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `GITHUB_TOKEN` | GitHub personal access token | Yes | - |
| `REPO_OWNER` | GitHub repository owner | Yes | - |
| `REPO_NAME` | Repository name | Yes | - |
| `OPENAI_API_KEY` | OpenAI API key | Yes | - |
| `WORKSPACE_ROOT` | Path to workspace | No | `process.cwd()` |
| `CRON_EXPRESSION` | Cron schedule expression | No | `0 9 * * *` |
| `TIMEZONE` | Timezone for scheduling | No | `UTC` |

### GitHub Token Permissions

Your GitHub token needs the following permissions:
- `repo` (Full control of private repositories)
- `workflow` (Update GitHub Action workflows)
- `write:packages` (Upload packages to GitHub Package Registry)

## 🏗️ Architecture

```
src/
├── agents/
│   ├── autonomous-improvement-agent.ts  # Main AI agent
│   ├── scheduler.ts                     # Cron job scheduler
│   ├── feature-generator.ts             # Feature creation
│   └── github-pr-agent.ts              # PR management
├── index.ts                            # Main entry point
└── start.ts                            # CLI starter
```

## 🔄 Workflow

1. **Analysis Phase**: Scans codebase for improvement opportunities
2. **Planning Phase**: AI generates detailed improvement plans
3. **Implementation Phase**: Creates/modifies files as needed
4. **Testing Phase**: Runs automated quality checks
5. **PR Creation Phase**: Creates pull request with detailed documentation
6. **Scheduling Phase**: Waits for next scheduled run

## 🚦 Quality Assurance

The agent includes built-in quality checks:

- TypeScript compilation validation
- ESLint code quality checks
- Build process verification
- Test suite execution
- Performance impact analysis

## 📈 Business Impact

Designed specifically for HandyLabs' needs:

- **VC-Focused**: Improvements targeting venture capitalists
- **Entrepreneur-Friendly**: Features for startup founders
- **Enterprise-Grade**: Professional, scalable solutions
- **Conversion-Optimized**: UX improvements for business goals
- **SEO-Enhanced**: Search engine optimization
- **Performance-Focused**: Core Web Vitals optimization

## 🛡️ Security

- Secure token handling with environment variables
- No sensitive data in code or logs
- Automated security scanning in PRs
- Best practice security implementations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues or questions:
1. Check the existing issues
2. Create a new issue with detailed description
3. Include relevant logs and configuration

## 🎉 Examples

### Daily Improvement PR

The agent creates PRs like:

```
🤖 Auto-Improvement: SEO Meta Tags Enhancement

Type: SEO
Priority: HIGH

Added missing meta tags and structured data for better search engine optimization.

Expected Impact:
- 15-20% improvement in organic search visibility
- Enhanced social media sharing with Open Graph tags
- Better crawler indexing with JSON-LD structured data

Changes Made:
- CREATE src/components/SEO/MetaTags.tsx: Added comprehensive meta tag component
- MODIFY src/app/layout.tsx: Integrated meta tags into main layout
- CREATE src/utils/seo.ts: SEO utility functions

This PR was automatically generated by the HandyLabs Autonomous Improvement Agent 🤖
```

---

**Built with ❤️ for HandyLabs** - Autonomous improvement for enterprise-grade development
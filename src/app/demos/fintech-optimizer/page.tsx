'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Upload, 
  TrendingUp,
  TrendingDown,
  Shield,
  Brain,
  Download,
  Play,
  FileText,
  Target,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Zap
} from 'lucide-react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

interface PortfolioHolding {
  symbol: string;
  name: string;
  quantity: number;
  price: number;
  value: number;
  allocation: number;
  sector: string;
  riskScore: number;
}

interface RiskAnalysis {
  overallRisk: number;
  volatility: number;
  diversification: number;
  concentration: number;
  marketExposure: number;
}

interface OptimizationRecommendation {
  action: 'buy' | 'sell' | 'hold';
  symbol: string;
  name: string;
  currentAllocation: number;
  recommendedAllocation: number;
  reasoning: string;
  impact: string;
}

export default function FintechOptimizer() {
  const [currentStep, setCurrentStep] = useState<'upload' | 'analyze' | 'optimize' | 'report'>('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const [portfolio, setPortfolio] = useState<PortfolioHolding[]>([]);
  const [riskAnalysis, setRiskAnalysis] = useState<RiskAnalysis | null>(null);
  const [recommendations, setRecommendations] = useState<OptimizationRecommendation[]>([]);
  const [totalValue, setTotalValue] = useState(0);

  // Sample portfolio data for demo
  const samplePortfolio: PortfolioHolding[] = [
    { symbol: 'AAPL', name: 'Apple Inc.', quantity: 50, price: 175.43, value: 8771.50, allocation: 35.1, sector: 'Technology', riskScore: 6.8 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', quantity: 25, price: 138.92, value: 3473.00, allocation: 13.9, sector: 'Technology', riskScore: 7.2 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', quantity: 30, price: 378.85, value: 11365.50, allocation: 45.5, sector: 'Technology', riskScore: 6.5 },
    { symbol: 'BRK.B', name: 'Berkshire Hathaway', quantity: 15, price: 356.28, value: 5344.20, allocation: 21.4, sector: 'Financial', riskScore: 4.2 },
    { symbol: 'JNJ', name: 'Johnson & Johnson', quantity: 20, price: 162.34, value: 3246.80, allocation: 13.0, sector: 'Healthcare', riskScore: 3.8 },
  ];

  const generateRiskAnalysis = useCallback((): RiskAnalysis => {
    const concentration = Math.max(...portfolio.map(h => h.allocation));
    
    return {
      overallRisk: 7.2,
      volatility: 24.5,
      diversification: Math.max(10, 100 - concentration * 2),
      concentration: concentration,
      marketExposure: 85.3
    };
  }, [portfolio]);

  const generateRecommendations = useCallback((): OptimizationRecommendation[] => {
    return [
      {
        action: 'sell',
        symbol: 'MSFT',
        name: 'Microsoft Corp.',
        currentAllocation: 45.5,
        recommendedAllocation: 25.0,
        reasoning: 'Reduce concentration risk - position is overweight',
        impact: 'Reduces portfolio concentration by 20.5%'
      },
      {
        action: 'buy',
        symbol: 'VTI',
        name: 'Vanguard Total Stock Market ETF',
        currentAllocation: 0,
        recommendedAllocation: 15.0,
        reasoning: 'Add broad market diversification',
        impact: 'Improves diversification score by 18%'
      },
      {
        action: 'buy',
        symbol: 'BOND',
        name: 'PIMCO Active Bond ETF',
        currentAllocation: 0,
        recommendedAllocation: 20.0,
        reasoning: 'Add fixed income for risk reduction',
        impact: 'Reduces overall portfolio volatility by 12%'
      },
      {
        action: 'hold',
        symbol: 'BRK.B',
        name: 'Berkshire Hathaway',
        currentAllocation: 21.4,
        recommendedAllocation: 20.0,
        reasoning: 'Well-positioned defensive holding',
        impact: 'Maintains stability anchor'
      }
    ];
  }, []);

  const simulateAIProcessing = async (step: string) => {
    setIsProcessing(true);
    
    // Simulate realistic processing time
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
    
    if (step === 'analyze') {
      const analysis = generateRiskAnalysis();
      setRiskAnalysis(analysis);
      setCurrentStep('analyze');
    } else if (step === 'optimize') {
      const recs = generateRecommendations();
      setRecommendations(recs);
      setCurrentStep('optimize');
    }
    
    setIsProcessing(false);
  };

  const loadSamplePortfolio = () => {
    setPortfolio(samplePortfolio);
    const total = samplePortfolio.reduce((sum, holding) => sum + holding.value, 0);
    setTotalValue(total);
    setCurrentStep('upload');
  };

  const startAnalysis = () => {
    simulateAIProcessing('analyze');
  };

  const startOptimization = () => {
    simulateAIProcessing('optimize');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const sectorData = portfolio.reduce((acc, holding) => {
    const existing = acc.find(item => item.sector === holding.sector);
    if (existing) {
      existing.value += holding.value;
      existing.allocation += holding.allocation;
    } else {
      acc.push({
        sector: holding.sector,
        value: holding.value,
        allocation: holding.allocation,
        color: holding.sector === 'Technology' ? '#8B5CF6' : 
               holding.sector === 'Financial' ? '#06B6D4' : 
               holding.sector === 'Healthcare' ? '#10B981' : '#F59E0B'
      });
    }
    return acc;
  }, [] as { sector: string; value: number; allocation: number; color: string }[]);

  const riskMetrics = riskAnalysis ? [
    { metric: 'Overall Risk', value: riskAnalysis.overallRisk, max: 10 },
    { metric: 'Volatility', value: riskAnalysis.volatility / 10, max: 10 },
    { metric: 'Diversification', value: riskAnalysis.diversification / 10, max: 10 },
    { metric: 'Concentration Risk', value: riskAnalysis.concentration / 10, max: 10 },
    { metric: 'Market Exposure', value: riskAnalysis.marketExposure / 10, max: 10 }
  ] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Link href="/fintech" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Portfolio
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AI Portfolio Optimizer</h1>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span>LIVE SaaS DEMO</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500">
              Portfolio Value: {formatCurrency(totalValue)}
            </div>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[
              { key: 'upload', label: 'Upload Portfolio', icon: Upload },
              { key: 'analyze', label: 'AI Analysis', icon: Brain },
              { key: 'optimize', label: 'Optimization', icon: Target },
              { key: 'report', label: 'Generate Report', icon: FileText }
            ].map((step, index) => {
              const isActive = currentStep === step.key;
              const isCompleted = ['upload', 'analyze', 'optimize', 'report'].indexOf(currentStep) > index;
              const IconComponent = step.icon;
              
              return (
                <div key={step.key} className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                    isActive ? 'bg-blue-600 border-blue-600 text-white' :
                    isCompleted ? 'bg-green-600 border-green-600 text-white' :
                    'bg-white border-gray-300 text-gray-400'
                  }`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className={`ml-2 text-sm font-medium ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Upload Step */}
          {currentStep === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Upload Your Portfolio</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Upload your portfolio CSV file or use our sample data to see AI-powered optimization in action
                </p>
              </div>

              {portfolio.length === 0 ? (
                <div className="grid md:grid-cols-2 gap-8">
                  {/* File Upload */}
                  <div className="bg-white rounded-xl p-8 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
                    <div className="text-center">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload CSV File</h3>
                      <p className="text-gray-600 mb-4">
                        Drag and drop your portfolio CSV file here, or click to browse
                      </p>
                      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                        Choose File
                      </button>
                    </div>
                  </div>

                  {/* Sample Data */}
                  <div className="bg-white rounded-xl p-8 border border-gray-200">
                    <div className="text-center">
                      <Play className="w-12 h-12 text-green-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Try Sample Portfolio</h3>
                      <p className="text-gray-600 mb-4">
                        Use our sample portfolio to see the AI optimizer in action
                      </p>
                      <button 
                        onClick={loadSamplePortfolio}
                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Load Sample Data
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Portfolio Summary */}
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{portfolio.length}</div>
                        <div className="text-sm text-gray-600">Holdings</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{formatCurrency(totalValue)}</div>
                        <div className="text-sm text-gray-600">Total Value</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">3</div>
                        <div className="text-sm text-gray-600">Sectors</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">High</div>
                        <div className="text-sm text-gray-600">Concentration Risk</div>
                      </div>
                    </div>

                    {/* Holdings Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-100">
                            <th className="text-left py-3 text-sm font-medium text-gray-600">Symbol</th>
                            <th className="text-left py-3 text-sm font-medium text-gray-600">Name</th>
                            <th className="text-left py-3 text-sm font-medium text-gray-600">Quantity</th>
                            <th className="text-left py-3 text-sm font-medium text-gray-600">Price</th>
                            <th className="text-left py-3 text-sm font-medium text-gray-600">Value</th>
                            <th className="text-left py-3 text-sm font-medium text-gray-600">Allocation</th>
                          </tr>
                        </thead>
                        <tbody>
                          {portfolio.map((holding) => (
                            <tr key={holding.symbol} className="border-b border-gray-50">
                              <td className="py-3 text-sm font-mono font-semibold text-gray-900">{holding.symbol}</td>
                              <td className="py-3 text-sm text-gray-900">{holding.name}</td>
                              <td className="py-3 text-sm text-gray-600">{holding.quantity}</td>
                              <td className="py-3 text-sm text-gray-600">${holding.price.toFixed(2)}</td>
                              <td className="py-3 text-sm font-semibold text-gray-900">{formatCurrency(holding.value)}</td>
                              <td className="py-3 text-sm text-gray-600">{holding.allocation.toFixed(1)}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-6 text-center">
                      <button 
                        onClick={startAnalysis}
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto"
                      >
                        <Brain className="w-5 h-5 mr-2" />
                        Start AI Analysis
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Processing Animation */}
          {isProcessing && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Processing Your Portfolio</h3>
              <p className="text-gray-600">Analyzing risk, optimizing allocations, and generating recommendations...</p>
              <div className="w-64 bg-gray-200 rounded-full h-2 mx-auto mt-4">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </motion.div>
          )}

          {/* Analysis Results */}
          {currentStep === 'analyze' && riskAnalysis && !isProcessing && (
            <motion.div
              key="analyze"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Risk Analysis Complete</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Our AI has analyzed your portfolio across multiple risk dimensions
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Risk Score Card */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Overall Risk Score</h3>
                    <Shield className="w-6 h-6 text-orange-500" />
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-orange-500 mb-2">{riskAnalysis.overallRisk}/10</div>
                    <div className="text-sm text-gray-600 mb-4">Moderate-High Risk</div>
                    <div className="bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-orange-500 h-3 rounded-full" 
                        style={{ width: `${riskAnalysis.overallRisk * 10}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Risk Breakdown */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Breakdown</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <RadarChart data={riskMetrics}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="metric" />
                      <PolarRadiusAxis domain={[0, 10]} />
                      <Radar 
                        name="Risk Level" 
                        dataKey="value" 
                        stroke="#8B5CF6" 
                        fill="#8B5CF6" 
                        fillOpacity={0.1}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Sector Allocation */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Sector Allocation</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <RechartsPieChart>
                      <Pie
                        data={sectorData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="allocation"
                      >
                        {sectorData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>

                {/* Key Issues */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Issues Identified</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">High Concentration Risk</div>
                        <div className="text-sm text-gray-600">Microsoft represents 45.5% of portfolio</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">Sector Overweight</div>
                        <div className="text-sm text-gray-600">94.5% allocation to Technology sector</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">No Fixed Income</div>
                        <div className="text-sm text-gray-600">Missing bonds for volatility reduction</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button 
                  onClick={startOptimization}
                  className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center mx-auto"
                >
                  <Target className="w-5 h-5 mr-2" />
                  Generate AI Optimization
                </button>
              </div>
            </motion.div>
          )}

          {/* Optimization Results */}
          {currentStep === 'optimize' && recommendations.length > 0 && !isProcessing && (
            <motion.div
              key="optimize"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Optimization Recommendations</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Based on modern portfolio theory and risk analysis, here are our AI-powered recommendations
                </p>
              </div>

              {/* Optimization Impact Summary */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-50 rounded-xl p-6 text-center">
                  <TrendingDown className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600 mb-1">-32%</div>
                  <div className="text-sm text-gray-600">Risk Reduction</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-6 text-center">
                  <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600 mb-1">+28%</div>
                  <div className="text-sm text-gray-600">Diversification</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-6 text-center">
                  <Zap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600 mb-1">8.4%</div>
                  <div className="text-sm text-gray-600">Expected Annual Return</div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">Recommended Actions</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            rec.action === 'buy' ? 'bg-green-100 text-green-600' :
                            rec.action === 'sell' ? 'bg-red-100 text-red-600' :
                            'bg-blue-100 text-blue-600'
                          }`}>
                            {rec.action === 'buy' ? <TrendingUp className="w-5 h-5" /> :
                             rec.action === 'sell' ? <TrendingDown className="w-5 h-5" /> :
                             <CheckCircle className="w-5 h-5" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className={`uppercase text-xs font-bold px-2 py-1 rounded ${
                                rec.action === 'buy' ? 'bg-green-100 text-green-800' :
                                rec.action === 'sell' ? 'bg-red-100 text-red-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {rec.action}
                              </span>
                              <span className="font-semibold text-gray-900">{rec.symbol}</span>
                            </div>
                            <div className="text-gray-900 mb-1">{rec.name}</div>
                            <div className="text-sm text-gray-600 mb-2">{rec.reasoning}</div>
                            <div className="text-sm font-medium text-green-600">{rec.impact}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">Current: {rec.currentAllocation.toFixed(1)}%</div>
                          <div className="text-sm font-semibold text-gray-900">Target: {rec.recommendedAllocation.toFixed(1)}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <button 
                  onClick={() => setCurrentStep('report')}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center mx-auto"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Generate Full Report
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-12 bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">AI Portfolio Optimizer SaaS Demo</h4>
                <p className="text-sm text-gray-600">Full-stack fintech application with real-time AI analysis</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Built with Next.js, AI/ML, & Real-time APIs</p>
              <p className="text-sm text-gray-500">By HandyLabs Technology Studio</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 
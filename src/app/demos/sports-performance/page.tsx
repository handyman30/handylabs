'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Target,
  TrendingUp,
  Brain,
  Play,
  Zap,
  Users,
  Building,
  AlertTriangle,
  BarChart3,
  Maximize2,
  Settings
} from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

interface AthleteProfile {
  name: string;
  position: string;
  age: number;
  height: string;
  weight: string;
  experience: string;
  goals: string[];
}

interface PerformanceMetrics {
  shooting: number;
  defense: number;
  speed: number;
  endurance: number;
  teamwork: number;
  ballHandling: number;
}

interface InjuryRisk {
  bodyPart: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  probability: number;
  recommendations: string[];
}

interface PerformanceData {
  currentMetrics: PerformanceMetrics;
  projectedImprovement: { [key: string]: number };
  timeline: string;
}

export default function SportsPerformance() {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'profile' | 'analysis' | 'training' | 'optimization'>('welcome');
  const [isProcessing, setIsProcessing] = useState(false);
  const [athleteProfile, setAthleteProfile] = useState<AthleteProfile | null>(null);
  const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null);

  // Sample athlete data
  const sampleAthlete: AthleteProfile = {
    name: "Jordan Martinez",
    position: "Point Guard",
    age: 23,
    height: "6'1\"",
    weight: "175 lbs",
    experience: "5 years",
    goals: ["Improve shooting accuracy", "Increase court vision", "Build leadership skills"]
  };

  const performanceMetrics: PerformanceMetrics = {
    shooting: 72,
    defense: 85,
    speed: 78,
    endurance: 82,
    teamwork: 88,
    ballHandling: 75
  };

  const performanceHistory = [
    { month: 'Jan', shooting: 68, defense: 82, speed: 75, endurance: 78 },
    { month: 'Feb', shooting: 70, defense: 83, speed: 76, endurance: 79 },
    { month: 'Mar', shooting: 72, defense: 85, speed: 78, endurance: 82 },
    { month: 'Apr', shooting: 74, defense: 86, speed: 79, endurance: 83 },
    { month: 'May', shooting: 76, defense: 87, speed: 80, endurance: 84 },
    { month: 'Jun', shooting: 78, defense: 88, speed: 81, endurance: 85 }
  ];

  const injuryRisks: InjuryRisk[] = [
    {
      bodyPart: "Right Knee",
      riskLevel: "Medium",
      probability: 32,
      recommendations: ["Strengthen quadriceps", "Improve landing mechanics", "Regular ice therapy"]
    },
    {
      bodyPart: "Lower Back",
      riskLevel: "Low",
      probability: 18,
      recommendations: ["Core strengthening", "Posture awareness", "Stretching routine"]
    },
    {
      bodyPart: "Ankles",
      riskLevel: "Low",
      probability: 15,
      recommendations: ["Balance training", "Ankle mobility work", "Proper footwear"]
    }
  ];

  const startAnalysis = async () => {
    setIsProcessing(true);
    setAthleteProfile(sampleAthlete);
    setCurrentStep('profile');
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setCurrentStep('analysis');
    setIsProcessing(false);
    
    // Generate performance data
    setPerformanceData({
      currentMetrics: performanceMetrics,
      projectedImprovement: {
        shooting: 15,
        defense: 8,
        speed: 12,
        endurance: 10,
        teamwork: 5,
        ballHandling: 18
      },
      timeline: "8-12 weeks"
    });
  };

  const generateTrainingPlan = () => {
    setCurrentStep('training');
  };

  const radarData = Object.entries(performanceMetrics).map(([key, value]) => ({
    metric: key.charAt(0).toUpperCase() + key.slice(1),
    current: value,
    potential: Math.min(100, value + (performanceData?.projectedImprovement[key] || 0))
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Link href="/sports" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Sports
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CoachAI Performance Platform</h1>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span>LIVE SPORTS DEMO</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {performanceData && (
              <div className="text-sm text-gray-500">
                Performance Analysis Complete
              </div>
            )}
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Settings className="w-4 h-4 mr-2" />
              Configure AI
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[
              { key: 'welcome', label: 'Get Started', icon: Play },
              { key: 'profile', label: 'Athlete Profile', icon: Users },
              { key: 'analysis', label: 'AI Analysis', icon: BarChart3 },
              { key: 'training', label: 'Training Plan', icon: Target },
              { key: 'optimization', label: 'Optimization', icon: Maximize2 }
            ].map((step, index) => {
              const isActive = currentStep === step.key;
              const isCompleted = ['welcome', 'profile', 'analysis', 'training', 'optimization'].indexOf(currentStep) > index;
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
          {/* Welcome Step */}
          {currentStep === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">AI-Powered Sports Performance Platform</h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  Transform athletic performance with AI-driven analysis, personalized training plans, 
                  and predictive injury prevention powered by advanced biomechanics and data science.
                </p>
              </div>

              {/* Value Proposition Cards */}
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance Analytics</h3>
                  <p className="text-gray-600">
                    AI analyzes 50+ performance metrics including biomechanics, movement patterns, 
                    and game statistics to identify strengths and improvement opportunities.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Training Plans</h3>
                  <p className="text-gray-600">
                    Personalized training programs adapted to individual goals, position requirements, 
                    and injury history with real-time adjustments based on progress.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <AlertTriangle className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Injury Prevention</h3>
                  <p className="text-gray-600">
                    Predictive modeling identifies injury risks up to 6 weeks in advance, 
                    enabling proactive interventions and load management strategies.
                  </p>
                </div>
              </div>

              {/* Platform Impact */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sports Technology Applications</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Professional Teams</h4>
                    <p className="text-gray-600">Optimize player performance and reduce injury rates by 45% with data-driven coaching decisions</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Building className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Sports Academies</h4>
                    <p className="text-gray-600">Accelerate athlete development with personalized training programs and performance tracking</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Performance Gains</h4>
                    <p className="text-gray-600">Average 23% improvement in key performance metrics within 8-12 weeks of implementation</p>
                  </div>
                </div>
              </div>

              {/* Demo Launch */}
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Experience AI-Powered Performance Analysis</h3>
                <p className="text-gray-600 text-center mb-6">
                  See how our AI analyzes athlete performance and generates personalized optimization strategies
                </p>
                
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Sample Athlete Profile:</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-700 mb-2"><strong>Name:</strong> Jordan Martinez</p>
                      <p className="text-gray-700 mb-2"><strong>Position:</strong> Point Guard</p>
                      <p className="text-gray-700 mb-2"><strong>Experience:</strong> 5 years</p>
                    </div>
                    <div>
                      <p className="text-gray-700 mb-2"><strong>Goals:</strong> Improve shooting accuracy</p>
                      <p className="text-gray-700 mb-2"><strong>Focus:</strong> Court vision & leadership</p>
                      <p className="text-gray-700 mb-2"><strong>Season:</strong> Pre-season training</p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button 
                    onClick={startAnalysis}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center mx-auto"
                  >
                    <Brain className="w-6 h-6 mr-3" />
                    Start AI Performance Analysis
                    <Zap className="w-5 h-5 ml-2" />
                  </button>
                  <p className="text-sm text-gray-500 mt-3">No account required • Instant analysis • See AI coaching in action</p>
                </div>
              </div>
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Analyzing Performance Data</h3>
              <p className="text-gray-600 mb-4">Processing biomechanics, movement patterns, and performance history...</p>
              <div className="w-64 bg-gray-200 rounded-full h-2 mx-auto mb-4">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
              </div>
              <div className="text-sm text-gray-500">
                <div className="mb-1">✓ Analyzing movement patterns</div>
                <div className="mb-1">✓ Calculating performance metrics</div>
                <div className="mb-1">🔄 Identifying improvement opportunities...</div>
                <div className="opacity-50">⏳ Generating training recommendations...</div>
              </div>
            </motion.div>
          )}

          {/* Analysis Results */}
          {currentStep === 'analysis' && performanceData && !isProcessing && (
            <motion.div
              key="analysis"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Performance Analysis</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Comprehensive analysis of {athleteProfile?.name}&apos;s performance with AI-powered insights and optimization recommendations
                </p>
              </div>

              {/* Performance Radar Chart */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Profile</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="metric" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar
                        name="Current"
                        dataKey="current"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        fillOpacity={0.3}
                      />
                      <Radar
                        name="Potential"
                        dataKey="potential"
                        stroke="#8B5CF6"
                        fill="#8B5CF6"
                        fillOpacity={0.1}
                        strokeDasharray="5 5"
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center space-x-6 mt-4 text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      <span>Current Performance</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                      <span>AI Projected Potential</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trends</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[60, 90]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="shooting" stroke="#EF4444" strokeWidth={2} />
                      <Line type="monotone" dataKey="defense" stroke="#10B981" strokeWidth={2} />
                      <Line type="monotone" dataKey="speed" stroke="#F59E0B" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* AI Insights */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">🤖 AI Performance Insights</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Strengths Identified:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Exceptional team leadership and court vision</li>
                      <li>• Strong defensive positioning and awareness</li>
                      <li>• Consistent endurance throughout games</li>
                      <li>• Good ball handling under pressure</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-600 mb-2">Improvement Opportunities:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Shooting accuracy: 72% → 87% potential (+15%)</li>
                      <li>• Ball handling consistency: Focus on weak hand</li>
                      <li>• Three-point range: Extend effective range</li>
                      <li>• Speed: First step explosiveness</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Injury Risk Assessment */}
              <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🏥 Injury Risk Assessment</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {injuryRisks.map((risk, index) => (
                    <div key={index} className={`p-4 rounded-lg border-2 ${
                      risk.riskLevel === 'High' ? 'border-red-200 bg-red-50' :
                      risk.riskLevel === 'Medium' ? 'border-yellow-200 bg-yellow-50' :
                      'border-green-200 bg-green-50'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{risk.bodyPart}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          risk.riskLevel === 'High' ? 'bg-red-200 text-red-800' :
                          risk.riskLevel === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
                          'bg-green-200 text-green-800'
                        }`}>
                          {risk.riskLevel}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{risk.probability}% probability</p>
                      <ul className="text-xs text-gray-600">
                        {risk.recommendations.slice(0, 2).map((rec, i) => (
                          <li key={i}>• {rec}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <button 
                  onClick={generateTrainingPlan}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center mx-auto"
                >
                  <Target className="w-5 h-5 mr-2" />
                  Generate AI Training Plan
                </button>
              </div>
            </motion.div>
          )}

          {/* Training Plan */}
          {currentStep === 'training' && (
            <motion.div
              key="training"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">AI-Generated Training Plan</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Personalized 8-week training program designed to maximize {athleteProfile?.name}&apos;s performance potential
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Training Plan Generated!</h3>
                  <p className="text-gray-600 mb-8">
                    AI has created a comprehensive training program that balances skill development, 
                    injury prevention, and performance optimization based on individual analysis.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-8 text-sm">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-semibold text-gray-900 mb-1">Program Duration</div>
                      <div className="text-gray-600">8 weeks with weekly assessments and adjustments</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-semibold text-gray-900 mb-1">Focus Areas</div>
                      <div className="text-gray-600">Shooting accuracy, ball handling, injury prevention</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-semibold text-gray-900 mb-1">Expected Results</div>
                      <div className="text-gray-600">15-23% improvement in targeted metrics</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button 
                      onClick={() => setCurrentStep('optimization')}
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                      <Maximize2 className="w-5 h-5 mr-2" />
                      View Performance Optimization
                    </button>
                    <button className="border border-gray-300 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                      Download Training Plan
                    </button>
                  </div>
                </div>
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
                <h4 className="font-semibold text-gray-900">CoachAI Performance Platform</h4>
                <p className="text-sm text-gray-600">AI-powered sports analytics with biomechanics analysis - 10K+ athletes optimized</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Built with Machine Learning & Sports Science</p>
              <p className="text-sm text-gray-500">By HandyLabs Technology Studio</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 
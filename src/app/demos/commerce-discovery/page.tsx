'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  Search,
  Star,
  ShoppingCart,
  Heart,
  Eye,
  Brain,
  Play,
  Zap,
  Users,
  Building,
  TrendingUp,
  Filter,
  Camera,
  Sparkles,
  Target,
  Settings
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  tags: string[];
  inStock: boolean;
  fastShipping: boolean;
}

interface SearchResult {
  query: string;
  results: Product[];
  processingTime: number;
  aiConfidence: number;
  suggestions: string[];
}

export default function CommerceDiscovery() {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'search' | 'results' | 'personalize'>('welcome');
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  // Sample product catalog
  const sampleProducts: Product[] = [
    {
      id: '1',
      name: 'Sony WH-1000XM5 Wireless Headphones',
      brand: 'Sony',
      price: 349.99,
      originalPrice: 399.99,
      rating: 4.8,
      reviews: 2847,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
      category: 'Electronics',
      tags: ['wireless', 'noise-cancelling', 'premium', 'bluetooth'],
      inStock: true,
      fastShipping: true
    },
    {
      id: '2',
      name: 'Apple AirPods Pro (2nd Gen)',
      brand: 'Apple',
      price: 249.99,
      rating: 4.7,
      reviews: 1923,
      image: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=300&h=300&fit=crop',
      category: 'Electronics',
      tags: ['wireless', 'apple', 'compact', 'premium'],
      inStock: true,
      fastShipping: true
    },
    {
      id: '3',
      name: 'Bose QuietComfort 45',
      brand: 'Bose',
      price: 279.99,
      originalPrice: 329.99,
      rating: 4.6,
      reviews: 1456,
      image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&h=300&fit=crop',
      category: 'Electronics',
      tags: ['wireless', 'noise-cancelling', 'comfortable', 'bose'],
      inStock: true,
      fastShipping: false
    },
    {
      id: '4',
      name: 'JBL Flip 6 Portable Speaker',
      brand: 'JBL',
      price: 129.99,
      rating: 4.5,
      reviews: 892,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop',
      category: 'Electronics',
      tags: ['speaker', 'portable', 'waterproof', 'bluetooth'],
      inStock: true,
      fastShipping: true
    },
    {
      id: '5',
      name: 'Samsung Galaxy Watch 6',
      brand: 'Samsung',
      price: 299.99,
      rating: 4.4,
      reviews: 743,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
      category: 'Electronics',
      tags: ['smartwatch', 'fitness', 'samsung', 'android'],
      inStock: false,
      fastShipping: false
    },
    {
      id: '6',
      name: 'Nintendo Switch OLED',
      brand: 'Nintendo',
      price: 349.99,
      rating: 4.9,
      reviews: 3421,
      image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=300&fit=crop',
      category: 'Gaming',
      tags: ['gaming', 'console', 'portable', 'nintendo'],
      inStock: true,
      fastShipping: true
    }
  ];

  const performSearch = async (query: string) => {
    setIsProcessing(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    // Simulate smart search logic
    const filteredProducts = sampleProducts.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.brand.toLowerCase().includes(query.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
    
    // Add some products even for partial matches to show AI intelligence
    const results = filteredProducts.length > 0 ? filteredProducts : sampleProducts.slice(0, 4);
    
    const searchResult: SearchResult = {
      query,
      results,
      processingTime: Math.random() * 200 + 50, // 50-250ms
      aiConfidence: Math.random() * 15 + 85, // 85-100%
      suggestions: [
        'wireless headphones under $300',
        'noise cancelling earbuds',
        'portable bluetooth speakers',
        'gaming accessories'
      ]
    };
    
    setSearchResults(searchResult);
    setCurrentStep('results');
    setIsProcessing(false);
  };

  const startDemo = (demoQuery: string) => {
    setCurrentStep('search');
    performSearch(demoQuery);
  };

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Link href="/commerce" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Commerce
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">EssentialsDash AI Discovery</h1>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span>LIVE COMMERCE DEMO</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {searchResults && (
              <div className="text-sm text-gray-500">
                {searchResults.results.length} results in {searchResults.processingTime.toFixed(0)}ms
              </div>
            )}
            <button className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
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
              { key: 'search', label: 'AI Search', icon: Search },
              { key: 'results', label: 'Smart Results', icon: Eye },
              { key: 'personalize', label: 'Personalization', icon: Target }
            ].map((step, index) => {
              const isActive = currentStep === step.key;
              const isCompleted = ['welcome', 'search', 'results', 'personalize'].indexOf(currentStep) > index;
              const IconComponent = step.icon;
              
              return (
                <div key={step.key} className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                    isActive ? 'bg-orange-600 border-orange-600 text-white' :
                    isCompleted ? 'bg-green-600 border-green-600 text-white' :
                    'bg-white border-gray-300 text-gray-400'
                  }`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className={`ml-2 text-sm font-medium ${isActive ? 'text-orange-600' : isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
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
                <h2 className="text-4xl font-bold text-gray-900 mb-4">AI-Powered Product Discovery Engine</h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  Experience next-generation e-commerce search with natural language processing, 
                  visual discovery, and personalized recommendations powered by advanced AI.
                </p>
              </div>

              {/* Value Proposition Cards */}
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Search className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Natural Language Search</h3>
                  <p className="text-gray-600">
                    Search using natural language like &quot;wireless headphones under $200&quot; and get 
                    intelligent results that understand context and intent.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Camera className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Visual Discovery</h3>
                  <p className="text-gray-600">
                    Upload product images to find similar items, get style recommendations, 
                    and discover products through visual AI recognition.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Personalization</h3>
                  <p className="text-gray-600">
                    AI learns from user behavior to provide personalized recommendations, 
                    custom rankings, and tailored product suggestions.
                  </p>
                </div>
              </div>

              {/* Platform Impact */}
              <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-8 mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Commerce Intelligence Applications</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">E-commerce Platforms</h4>
                    <p className="text-gray-600">Increase conversion rates by 34% with intelligent search and personalized product discovery</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Building className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Enterprise Retailers</h4>
                    <p className="text-gray-600">Scale product catalogs to millions of items with AI-powered search and recommendation engines</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Revenue Growth</h4>
                    <p className="text-gray-600">Boost average order value by 28% through intelligent cross-selling and upselling recommendations</p>
                  </div>
                </div>
              </div>

              {/* Demo Search Examples */}
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Try AI-Powered Search</h3>
                <p className="text-gray-600 text-center mb-6">
                  Experience how our AI understands natural language queries and delivers intelligent product recommendations
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Natural Language Examples:</h4>
                    <div className="space-y-2">
                      {[
                        'wireless headphones under $300',
                        'noise cancelling earbuds for gym',
                        'portable speakers for outdoor',
                        'gaming headset with microphone'
                      ].map((query, index) => (
                        <button
                          key={index}
                          onClick={() => startDemo(query)}
                          className="w-full text-left p-3 bg-gray-50 hover:bg-orange-50 rounded-lg transition-colors border border-gray-200 hover:border-orange-300"
                        >
                          <Search className="w-4 h-4 inline mr-2 text-gray-400" />
                          <span className="text-gray-700">{query}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Advanced Features:</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <Camera className="w-5 h-5 inline mr-2 text-blue-600" />
                        <span className="text-blue-800 font-medium">Visual Search</span>
                        <p className="text-sm text-blue-700 mt-1">Upload product images for AI-powered visual discovery</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <Sparkles className="w-5 h-5 inline mr-2 text-green-600" />
                        <span className="text-green-800 font-medium">Smart Filters</span>
                        <p className="text-sm text-green-700 mt-1">AI-suggested filters based on search intent and behavior</p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <Target className="w-5 h-5 inline mr-2 text-purple-600" />
                        <span className="text-purple-800 font-medium">Personalization</span>
                        <p className="text-sm text-purple-700 mt-1">Tailored results based on user preferences and history</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button 
                    onClick={() => startDemo('wireless headphones under $300')}
                    className="bg-gradient-to-r from-orange-600 to-pink-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:from-orange-700 hover:to-pink-700 transition-all duration-300 flex items-center mx-auto"
                  >
                    <Search className="w-6 h-6 mr-3" />
                    Start AI Search Demo
                    <Zap className="w-5 h-5 ml-2" />
                  </button>
                  <p className="text-sm text-gray-500 mt-3">No account required • Instant results • See AI in action</p>
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
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Processing Your Search</h3>
              <p className="text-gray-600 mb-4">Analyzing query intent, matching products, and ranking results...</p>
              <div className="w-64 bg-gray-200 rounded-full h-2 mx-auto mb-4">
                <div className="bg-orange-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
              </div>
              <div className="text-sm text-gray-500">
                <div className="mb-1">✓ Natural language processing complete</div>
                <div className="mb-1">✓ Product matching in progress</div>
                <div className="mb-1">🔄 Ranking and personalization...</div>
                <div className="opacity-50">⏳ Generating recommendations...</div>
              </div>
            </motion.div>
          )}

          {/* Search Results */}
          {currentStep === 'results' && searchResults && !isProcessing && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Search Results</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Found {searchResults.results.length} products matching &quot;{searchResults.query}&quot; with {searchResults.aiConfidence.toFixed(1)}% AI confidence
                </p>
              </div>

              {/* Search Stats */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <div className="text-3xl font-bold text-orange-600 mb-2">{searchResults.processingTime.toFixed(0)}ms</div>
                  <div className="text-sm text-gray-600">Search Time</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <div className="text-3xl font-bold text-green-600 mb-2">{searchResults.aiConfidence.toFixed(1)}%</div>
                  <div className="text-sm text-gray-600">AI Confidence</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{searchResults.results.length}</div>
                  <div className="text-sm text-gray-600">Products Found</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <div className="text-3xl font-bold text-purple-600 mb-2">98.2%</div>
                  <div className="text-sm text-gray-600">Relevance Score</div>
                </div>
              </div>

              {/* Product Grid */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Smart Product Results</h3>
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      <Filter className="w-4 h-4 mr-2" />
                      AI Filters
                    </button>
                    <button className="flex items-center px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Personalize
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {searchResults.results.map((product) => (
                    <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <Image 
                          src={product.image} 
                          alt={product.name}
                          width={300}
                          height={192}
                          className="w-full h-48 object-cover"
                        />
                        {!product.inStock && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                            Out of Stock
                          </div>
                        )}
                        {product.fastShipping && (
                          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                            Fast Ship
                          </div>
                        )}
                        <button
                          onClick={() => toggleProductSelection(product.id)}
                          className={`absolute bottom-2 right-2 p-2 rounded-full transition-colors ${
                            selectedProducts.includes(product.id)
                              ? 'bg-red-500 text-white'
                              : 'bg-white text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="p-4">
                        <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
                        <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h4>
                        
                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                        </div>
                        
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through ml-2">{formatPrice(product.originalPrice)}</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mb-3">
                          {product.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Suggestions */}
              <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-orange-600" />
                  AI-Powered Suggestions
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {searchResults.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => performSearch(suggestion)}
                      className="text-left p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                    >
                      <Search className="w-4 h-4 inline mr-2 text-gray-400" />
                      <span className="text-gray-700">{suggestion}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <button 
                  onClick={() => setCurrentStep('personalize')}
                  className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center mx-auto"
                >
                  <Target className="w-5 h-5 mr-2" />
                  Enable Personalization
                </button>
              </div>
            </motion.div>
          )}

          {/* Personalization Step */}
          {currentStep === 'personalize' && (
            <motion.div
              key="personalize"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Personalization Engine</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Based on your interactions, our AI has learned your preferences and will now personalize your shopping experience
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                <div className="text-center">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="w-10 h-10 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Personalization Active!</h3>
                  <p className="text-gray-600 mb-8">
                    AI has analyzed your search patterns, product interactions, and preferences to create a personalized shopping experience. 
                    Future searches will be tailored to your interests and behavior.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-8 text-sm">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-semibold text-gray-900 mb-1">Search Personalization</div>
                      <div className="text-gray-600">Results ranked by your preferences and past behavior</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-semibold text-gray-900 mb-1">Smart Recommendations</div>
                      <div className="text-gray-600">AI-curated product suggestions based on your interests</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-semibold text-gray-900 mb-1">Dynamic Pricing</div>
                      <div className="text-gray-600">Personalized offers and promotions tailored to you</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button 
                      onClick={() => performSearch('personalized recommendations')}
                      className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center"
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      See Personalized Results
                    </button>
                    <button className="border border-gray-300 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                      Configure Preferences
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
              <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">EssentialsDash AI Discovery Platform</h4>
                <p className="text-sm text-gray-600">Enterprise e-commerce search with AI-powered discovery and personalization - 5M+ products indexed</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Built with NLP, Computer Vision, & Machine Learning</p>
              <p className="text-sm text-gray-500">By HandyLabs Technology Studio</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Activity,
  AlertTriangle,
  Users,
  Settings,
  Bell,
  Plus,
  RefreshCw,
  Eye,
  PieChart
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  lastUpdated: Date;
}

interface PortfolioHolding {
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  value: number;
  dayGainLoss: number;
  totalGainLoss: number;
  allocation: number;
}

interface Trade {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  status: 'pending' | 'executed' | 'cancelled';
  timestamp: Date;
  orderValue: number;
}

interface Client {
  id: string;
  name: string;
  portfolioValue: number;
  dayChange: number;
  riskTolerance: 'Conservative' | 'Moderate' | 'Aggressive';
  lastActive: Date;
}

export default function TradePrpoLiveTerminal() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [watchlist, setWatchlist] = useState<Stock[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioHolding[]>([]);
  const [recentTrades, setRecentTrades] = useState<Trade[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'trading' | 'portfolio' | 'clients'>('dashboard');
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

  // Initialize sample data
  useEffect(() => {
    const sampleStocks: Stock[] = [
      {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 175.84,
        change: 2.45,
        changePercent: 1.41,
        volume: 45678900,
        marketCap: '$2.85T',
        lastUpdated: new Date()
      },
      {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        price: 138.92,
        change: -1.23,
        changePercent: -0.88,
        volume: 23456780,
        marketCap: '$1.72T',
        lastUpdated: new Date()
      },
      {
        symbol: 'MSFT',
        name: 'Microsoft Corp.',
        price: 378.85,
        change: 4.67,
        changePercent: 1.25,
        volume: 34567890,
        marketCap: '$2.82T',
        lastUpdated: new Date()
      },
      {
        symbol: 'NVDA',
        name: 'NVIDIA Corp.',
        price: 721.33,
        change: -12.45,
        changePercent: -1.70,
        volume: 67890123,
        marketCap: '$1.78T',
        lastUpdated: new Date()
      },
      {
        symbol: 'TSLA',
        name: 'Tesla Inc.',
        price: 248.67,
        change: 8.92,
        changePercent: 3.72,
        volume: 89012345,
        marketCap: '$791B',
        lastUpdated: new Date()
      }
    ];

    const samplePortfolio: PortfolioHolding[] = [
      {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        quantity: 100,
        avgPrice: 165.20,
        currentPrice: 175.84,
        value: 17584,
        dayGainLoss: 245,
        totalGainLoss: 1064,
        allocation: 35.2
      },
      {
        symbol: 'MSFT',
        name: 'Microsoft Corp.',
        quantity: 50,
        avgPrice: 355.40,
        currentPrice: 378.85,
        value: 18942,
        dayGainLoss: 234,
        totalGainLoss: 1173,
        allocation: 37.9
      },
      {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        quantity: 25,
        avgPrice: 142.15,
        currentPrice: 138.92,
        value: 3473,
        dayGainLoss: -31,
        totalGainLoss: -81,
        allocation: 6.9
      },
      {
        symbol: 'NVDA',
        name: 'NVIDIA Corp.',
        quantity: 15,
        avgPrice: 680.25,
        currentPrice: 721.33,
        value: 10820,
        dayGainLoss: -187,
        totalGainLoss: 616,
        allocation: 21.6
      }
    ];

    const sampleTrades: Trade[] = [
      {
        id: 'T001',
        symbol: 'AAPL',
        type: 'buy',
        quantity: 50,
        price: 175.84,
        status: 'pending',
        timestamp: new Date(),
        orderValue: 8792
      },
      {
        id: 'T002',
        symbol: 'TSLA',
        type: 'sell',
        quantity: 25,
        price: 248.67,
        status: 'executed',
        timestamp: new Date(Date.now() - 5 * 60000),
        orderValue: 6217
      },
      {
        id: 'T003',
        symbol: 'MSFT',
        type: 'buy',
        quantity: 10,
        price: 378.85,
        status: 'executed',
        timestamp: new Date(Date.now() - 15 * 60000),
        orderValue: 3789
      }
    ];

    const sampleClients: Client[] = [
      {
        id: 'C001',
        name: 'John Richardson',
        portfolioValue: 1250000,
        dayChange: 12500,
        riskTolerance: 'Moderate',
        lastActive: new Date()
      },
      {
        id: 'C002',
        name: 'Sarah Chen',
        portfolioValue: 875000,
        dayChange: -8750,
        riskTolerance: 'Aggressive',
        lastActive: new Date(Date.now() - 30 * 60000)
      },
      {
        id: 'C003',
        name: 'Michael Torres',
        portfolioValue: 2100000,
        dayChange: 31500,
        riskTolerance: 'Conservative',
        lastActive: new Date(Date.now() - 60 * 60000)
      }
    ];

    setWatchlist(sampleStocks);
    setPortfolio(samplePortfolio);
    setRecentTrades(sampleTrades);
    setClients(sampleClients);
    setSelectedStock(sampleStocks[0]);
  }, []);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setWatchlist(prev => prev.map(stock => {
        if (Math.random() < 0.7) {
          const changeAmount = (Math.random() - 0.5) * 2;
          const newPrice = Math.max(0.01, stock.price + changeAmount);
          const newChange = newPrice - (stock.price - stock.change);
          return {
            ...stock,
            price: newPrice,
            change: newChange,
            changePercent: (newChange / (newPrice - newChange)) * 100,
            lastUpdated: new Date()
          };
        }
        return stock;
      }));

      // Update portfolio based on current prices
      setPortfolio(prev => prev.map(holding => {
        const currentStock = watchlist.find(s => s.symbol === holding.symbol);
        if (currentStock) {
          const newValue = holding.quantity * currentStock.price;
          const newDayGainLoss = holding.quantity * currentStock.change;
          return {
            ...holding,
            currentPrice: currentStock.price,
            value: newValue,
            dayGainLoss: newDayGainLoss
          };
        }
        return holding;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [watchlist]);

  const totalPortfolioValue = portfolio.reduce((sum, holding) => sum + holding.value, 0);
  const totalDayChange = portfolio.reduce((sum, holding) => sum + holding.dayGainLoss, 0);
  const totalDayChangePercent = (totalDayChange / (totalPortfolioValue - totalDayChange)) * 100;

  const generateMarketData = () => {
    return Array.from({ length: 30 }, (_, i) => ({
      time: `${9 + Math.floor(i / 2)}:${i % 2 === 0 ? '00' : '30'}`,
      price: 175 + Math.sin(i * 0.2) * 10 + Math.random() * 5,
      volume: 1000000 + Math.random() * 500000
    }));
  };

  const marketData = generateMarketData();

  const executeTrade = (tradeId: string) => {
    setRecentTrades(prev => prev.map(trade => 
      trade.id === tradeId 
        ? { ...trade, status: 'executed', timestamp: new Date() }
        : trade
    ));
  };

  const cancelTrade = (tradeId: string) => {
    setRecentTrades(prev => prev.map(trade => 
      trade.id === tradeId 
        ? { ...trade, status: 'cancelled', timestamp: new Date() }
        : trade
    ));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Link href="/fintech" className="flex items-center text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Fintech
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">TradePro Live Terminal</h1>
                <div className="flex items-center text-sm text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span>MARKET OPEN • LIVE TRADING</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-300">
              {currentTime.toLocaleTimeString()} | {currentTime.toLocaleDateString()}
            </div>
            <div className="relative">
              <Bell className="w-5 h-5 text-gray-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Settings className="w-4 h-4 mr-2" />
              Terminal Settings
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Market Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Portfolio Value</p>
                <p className="text-3xl font-bold text-white">${totalPortfolioValue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
            <div className={`flex items-center mt-2 text-sm ${totalDayChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {totalDayChange >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              ${Math.abs(totalDayChange).toLocaleString()} ({totalDayChangePercent.toFixed(2)}%)
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Active Trades</p>
                <p className="text-3xl font-bold text-white">{recentTrades.filter(t => t.status === 'pending').length}</p>
              </div>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-sm text-gray-400 mt-2">Pending execution</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Clients</p>
                <p className="text-3xl font-bold text-white">{clients.length}</p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
            <p className="text-sm text-gray-400 mt-2">Under management</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Market Status</p>
                <p className="text-lg font-bold text-green-400">OPEN</p>
              </div>
              <BarChart3 className="w-8 h-8 text-yellow-500" />
            </div>
            <p className="text-sm text-gray-400 mt-2">NYSE • NASDAQ</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 mb-6">
          <div className="border-b border-gray-700">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'dashboard', label: 'Market Dashboard', icon: BarChart3 },
                { key: 'trading', label: 'Live Trading', icon: TrendingUp },
                { key: 'portfolio', label: 'Portfolio Management', icon: PieChart },
                { key: 'clients', label: 'Client Accounts', icon: Users }
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as 'dashboard' | 'trading' | 'portfolio' | 'clients')}
                    className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.key
                        ? 'border-green-500 text-green-400'
                        : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                    }`}
                  >
                    <IconComponent className="w-5 h-5 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Market Dashboard */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Live Price Chart */}
                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">
                        {selectedStock?.symbol} - {selectedStock?.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-white">${selectedStock?.price.toFixed(2)}</span>
                        <span className={`text-sm ${selectedStock && selectedStock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {selectedStock && selectedStock.change >= 0 ? '+' : ''}{selectedStock?.change.toFixed(2)} ({selectedStock?.changePercent.toFixed(2)}%)
                        </span>
                      </div>
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={marketData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="time" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                          labelStyle={{ color: '#F3F4F6' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="price" 
                          stroke="#10B981" 
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Market Watchlist */}
                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">Market Watchlist</h3>
                      <button className="flex items-center px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                        <Plus className="w-4 h-4 mr-1" />
                        Add Stock
                      </button>
                    </div>
                    <div className="space-y-3">
                      {watchlist.map((stock) => (
                        <div 
                          key={stock.symbol}
                          onClick={() => setSelectedStock(stock)}
                          className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedStock?.symbol === stock.symbol ? 'bg-gray-800' : 'hover:bg-gray-800'
                          }`}
                        >
                          <div>
                            <div className="font-semibold text-white">{stock.symbol}</div>
                            <div className="text-sm text-gray-400">{stock.name}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-white">${stock.price.toFixed(2)}</div>
                            <div className={`text-sm ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Market News & Alerts */}
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Market Alerts & News</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-3 bg-red-900/20 border border-red-800 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                      <div>
                        <div className="font-medium text-red-400">Price Alert</div>
                        <div className="text-sm text-gray-300">NVDA dropped below $730 support level</div>
                        <div className="text-xs text-gray-500">2 minutes ago</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-green-900/20 border border-green-800 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-green-400 mt-0.5" />
                      <div>
                        <div className="font-medium text-green-400">Breakout Alert</div>
                        <div className="text-sm text-gray-300">TSLA breaking resistance at $245</div>
                        <div className="text-xs text-gray-500">5 minutes ago</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
                      <Activity className="w-5 h-5 text-blue-400 mt-0.5" />
                      <div>
                        <div className="font-medium text-blue-400">Volume Spike</div>
                        <div className="text-sm text-gray-300">AAPL volume 200% above average</div>
                        <div className="text-xs text-gray-500">8 minutes ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Live Trading */}
            {activeTab === 'trading' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Order Entry */}
                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-4">Place Order</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Symbol</label>
                        <input 
                          type="text" 
                          placeholder="AAPL" 
                          className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Action</label>
                          <select className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white">
                            <option>Buy</option>
                            <option>Sell</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Order Type</label>
                          <select className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white">
                            <option>Market</option>
                            <option>Limit</option>
                            <option>Stop</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Quantity</label>
                          <input 
                            type="number" 
                            placeholder="100" 
                            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Price</label>
                          <input 
                            type="number" 
                            placeholder="175.84" 
                            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                          />
                        </div>
                      </div>
                      <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                        Place Order
                      </button>
                    </div>
                  </div>

                  {/* Order Book */}
                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-4">Order Book - {selectedStock?.symbol}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-green-400 mb-2">Bids</h4>
                        <div className="space-y-1">
                          {[175.82, 175.81, 175.80, 175.79, 175.78].map((price, i) => (
                            <div key={i} className="flex justify-between text-sm">
                              <span className="text-green-400">${price}</span>
                              <span className="text-gray-400">{(1000 + i * 100).toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-red-400 mb-2">Asks</h4>
                        <div className="space-y-1">
                          {[175.85, 175.86, 175.87, 175.88, 175.89].map((price, i) => (
                            <div key={i} className="flex justify-between text-sm">
                              <span className="text-red-400">${price}</span>
                              <span className="text-gray-400">{(800 + i * 150).toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Trades */}
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Recent Orders</h3>
                    <button className="flex items-center px-3 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors">
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Refresh
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-gray-400 border-b border-gray-700">
                          <th className="pb-3">Symbol</th>
                          <th className="pb-3">Type</th>
                          <th className="pb-3">Quantity</th>
                          <th className="pb-3">Price</th>
                          <th className="pb-3">Value</th>
                          <th className="pb-3">Status</th>
                          <th className="pb-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentTrades.map((trade) => (
                          <tr key={trade.id} className="border-b border-gray-800">
                            <td className="py-3 font-medium text-white">{trade.symbol}</td>
                            <td className="py-3">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                trade.type === 'buy' ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'
                              }`}>
                                {trade.type.toUpperCase()}
                              </span>
                            </td>
                            <td className="py-3 text-gray-300">{trade.quantity}</td>
                            <td className="py-3 text-gray-300">${trade.price.toFixed(2)}</td>
                            <td className="py-3 text-gray-300">${trade.orderValue.toLocaleString()}</td>
                            <td className="py-3">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                trade.status === 'executed' ? 'bg-green-900 text-green-400' :
                                trade.status === 'pending' ? 'bg-yellow-900 text-yellow-400' :
                                'bg-gray-900 text-gray-400'
                              }`}>
                                {trade.status.toUpperCase()}
                              </span>
                            </td>
                            <td className="py-3">
                              {trade.status === 'pending' && (
                                <div className="flex space-x-2">
                                  <button 
                                    onClick={() => executeTrade(trade.id)}
                                    className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                                  >
                                    Execute
                                  </button>
                                  <button 
                                    onClick={() => cancelTrade(trade.id)}
                                    className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Portfolio Management */}
            {activeTab === 'portfolio' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 bg-gray-900 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-4">Portfolio Holdings</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-gray-400 border-b border-gray-700">
                            <th className="pb-3">Symbol</th>
                            <th className="pb-3">Quantity</th>
                            <th className="pb-3">Avg Price</th>
                            <th className="pb-3">Current Price</th>
                            <th className="pb-3">Value</th>
                            <th className="pb-3">Day P&L</th>
                            <th className="pb-3">Total P&L</th>
                          </tr>
                        </thead>
                        <tbody>
                          {portfolio.map((holding) => (
                            <tr key={holding.symbol} className="border-b border-gray-800">
                              <td className="py-3">
                                <div>
                                  <div className="font-medium text-white">{holding.symbol}</div>
                                  <div className="text-sm text-gray-400">{holding.name}</div>
                                </div>
                              </td>
                              <td className="py-3 text-gray-300">{holding.quantity}</td>
                              <td className="py-3 text-gray-300">${holding.avgPrice.toFixed(2)}</td>
                              <td className="py-3 text-gray-300">${holding.currentPrice.toFixed(2)}</td>
                              <td className="py-3 text-white font-medium">${holding.value.toLocaleString()}</td>
                              <td className={`py-3 ${holding.dayGainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {holding.dayGainLoss >= 0 ? '+' : ''}${holding.dayGainLoss.toFixed(0)}
                              </td>
                              <td className={`py-3 ${holding.totalGainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {holding.totalGainLoss >= 0 ? '+' : ''}${holding.totalGainLoss.toFixed(0)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-4">Allocation</h3>
                    <div className="space-y-3">
                      {portfolio.map((holding) => (
                        <div key={holding.symbol} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-4 h-4 bg-blue-500 rounded"></div>
                            <span className="text-white">{holding.symbol}</span>
                          </div>
                          <span className="text-gray-400">{holding.allocation.toFixed(1)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Client Accounts */}
            {activeTab === 'clients' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">Client Accounts</h3>
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Client
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {clients.map((client) => (
                    <div key={client.id} className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-white">{client.name}</h4>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          client.riskTolerance === 'Conservative' ? 'bg-green-900 text-green-400' :
                          client.riskTolerance === 'Moderate' ? 'bg-yellow-900 text-yellow-400' :
                          'bg-red-900 text-red-400'
                        }`}>
                          {client.riskTolerance}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="text-sm text-gray-400">Portfolio Value</div>
                          <div className="text-xl font-bold text-white">${client.portfolioValue.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Day Change</div>
                          <div className={`font-medium ${client.dayChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {client.dayChange >= 0 ? '+' : ''}${client.dayChange.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Last Active</div>
                          <div className="text-sm text-gray-300">{client.lastActive.toLocaleTimeString()}</div>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm">
                          View Portfolio
                        </button>
                        <button className="px-3 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white">TradePro Live Terminal</h4>
                <p className="text-sm text-gray-400">Professional trading platform with real-time market data - SEC compliant</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Built for Financial Professionals</p>
              <p className="text-sm text-gray-500">By HandyLabs Technology Studio</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
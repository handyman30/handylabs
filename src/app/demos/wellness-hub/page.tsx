'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Users,
  Heart,
  Play,
  MessageCircle,
  Share2,
  Star,
  Calendar,
  Clock,
  Trophy,
  Flame,
  Camera,
  Plus,
  Search,
  Bell,
  ShoppingBag,
  Video,
  Bookmark
} from 'lucide-react';
import HandyLabsLogo from "@/components/HandyLabsLogo";

interface WellnessPost {
  id: string;
  user: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: Date;
  category: 'motivation' | 'progress' | 'challenge' | 'recipe' | 'workout';
}

interface LiveSession {
  id: string;
  title: string;
  instructor: string;
  type: 'yoga' | 'meditation' | 'fitness' | 'nutrition';
  participants: number;
  duration: string;
  startTime: Date;
  isLive: boolean;
  thumbnail: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  participants: number;
  daysLeft: number;
  reward: string;
  progress: number;
  category: string;
}

interface MarketplaceItem {
  id: string;
  name: string;
  vendor: string;
  price: number;
  rating: number;
  category: string;
  image: string;
  discount?: number;
}

export default function WellnessCommunityPlatform() {
  const [activeTab, setActiveTab] = useState<'feed' | 'live' | 'challenges' | 'marketplace'>('feed');
  const [posts, setPosts] = useState<WellnessPost[]>([]);
  const [liveSessions, setLiveSessions] = useState<LiveSession[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [marketplace, setMarketplace] = useState<MarketplaceItem[]>([]);

  // Initialize sample data
  useEffect(() => {
    const samplePosts: WellnessPost[] = [
      {
        id: '1',
        user: { name: 'Sarah Chen', avatar: '👩‍💼', verified: true },
        content: 'Just completed my 30-day meditation streak! 🧘‍♀️ The mental clarity has been incredible. Who else is on their wellness journey?',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        likes: 127,
        comments: 23,
        shares: 8,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        category: 'progress'
      },
      {
        id: '2',
        user: { name: 'Marcus Johnson', avatar: '💪', verified: false },
        content: 'Green smoothie recipe that changed my mornings! Spinach, banana, mango, coconut water, and a pinch of ginger. Energy for days! 🥤',
        likes: 89,
        comments: 15,
        shares: 12,
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        category: 'recipe'
      },
      {
        id: '3',
        user: { name: 'Luna Wellness', avatar: '🌙', verified: true },
        content: 'Join our Evening Wind-Down Challenge! 7 days of gentle yoga and meditation to improve your sleep quality. Who\'s in? 💤',
        likes: 234,
        comments: 67,
        shares: 45,
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        category: 'challenge'
      },
      {
        id: '4',
        user: { name: 'David Park', avatar: '🏃‍♂️', verified: false },
        content: 'Ran my first 10K today! Six months ago I could barely run 1K. Proof that consistency beats perfection every time 🏆',
        image: 'https://images.unsplash.com/photo-1571019613540-996a5b96aed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        likes: 156,
        comments: 32,
        shares: 18,
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        category: 'progress'
      }
    ];

    const sampleLiveSessions: LiveSession[] = [
      {
        id: '1',
        title: 'Morning Flow Yoga',
        instructor: 'Emma Rodriguez',
        type: 'yoga',
        participants: 847,
        duration: '45 min',
        startTime: new Date(Date.now() + 30 * 60 * 1000),
        isLive: false,
        thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      {
        id: '2',
        title: 'Mindful Meditation',
        instructor: 'Dr. James Wong',
        type: 'meditation',
        participants: 1205,
        duration: '20 min',
        startTime: new Date(Date.now() - 5 * 60 * 1000),
        isLive: true,
        thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      {
        id: '3',
        title: 'HIIT Power Hour',
        instructor: 'Coach Michael',
        type: 'fitness',
        participants: 623,
        duration: '60 min',
        startTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
        isLive: false,
        thumbnail: 'https://images.unsplash.com/photo-1571019613540-996a5b96aed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      {
        id: '4',
        title: 'Healthy Cooking Class',
        instructor: 'Chef Isabella',
        type: 'nutrition',
        participants: 389,
        duration: '90 min',
        startTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
        isLive: false,
        thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      }
    ];

    const sampleChallenges: Challenge[] = [
      {
        id: '1',
        title: '21-Day Hydration Challenge',
        description: 'Drink 8 glasses of water daily for 21 days',
        participants: 3247,
        daysLeft: 12,
        reward: 'Premium Water Bottle',
        progress: 65,
        category: 'Health'
      },
      {
        id: '2',
        title: 'Digital Detox Weekend',
        description: 'Unplug from devices this weekend',
        participants: 1089,
        daysLeft: 2,
        reward: '$50 Wellness Credit',
        progress: 45,
        category: 'Mental Health'
      },
      {
        id: '3',
        title: '30-Day Gratitude Journal',
        description: 'Write 3 things you\'re grateful for daily',
        participants: 5632,
        daysLeft: 18,
        reward: 'Custom Journal',
        progress: 40,
        category: 'Mindfulness'
      }
    ];

    const sampleMarketplace: MarketplaceItem[] = [
      {
        id: '1',
        name: 'Organic Superfood Powder',
        vendor: 'GreenLife',
        price: 49.99,
        rating: 4.8,
        category: 'Supplements',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        discount: 20
      },
      {
        id: '2',
        name: 'Meditation Cushion Set',
        vendor: 'ZenSpace',
        price: 89.99,
        rating: 4.9,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
      },
      {
        id: '3',
        name: 'Resistance Band Set',
        vendor: 'FitGear',
        price: 29.99,
        rating: 4.6,
        category: 'Fitness',
        image: 'https://images.unsplash.com/photo-1571019613540-996a5b96aed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        discount: 15
      },
      {
        id: '4',
        name: 'Aromatherapy Diffuser',
        vendor: 'ScentWell',
        price: 79.99,
        rating: 4.7,
        category: 'Wellness',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
      }
    ];

    setPosts(samplePosts);
    setLiveSessions(sampleLiveSessions);
    setChallenges(sampleChallenges);
    setMarketplace(sampleMarketplace);
  }, []);

  const likePost = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const joinSession = (sessionId: string) => {
    setLiveSessions(prev => prev.map(session => 
      session.id === sessionId ? { ...session, participants: session.participants + 1 } : session
    ));
  };

  const joinChallenge = (challengeId: string) => {
    setChallenges(prev => prev.map(challenge => 
      challenge.id === challengeId ? { ...challenge, participants: challenge.participants + 1 } : challenge
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-4">
            <Link href="/wellbeing" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Wellbeing
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">WellnessConnect</h1>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span>Your Wellness Community</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search community..."
                className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button className="relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </button>
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
              A
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
          <div className="flex">
            {[
              { key: 'feed', label: 'Community Feed', icon: Users },
              { key: 'live', label: 'Live Sessions', icon: Video },
              { key: 'challenges', label: 'Challenges', icon: Trophy },
              { key: 'marketplace', label: 'Wellness Shop', icon: ShoppingBag }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as 'feed' | 'live' | 'challenges' | 'marketplace')}
                  className={`flex-1 flex items-center justify-center py-4 px-6 font-medium text-sm transition-colors border-b-2 ${
                    activeTab === tab.key
                      ? 'border-purple-600 text-purple-600 bg-purple-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <IconComponent className="w-5 h-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Community Feed */}
        {activeTab === 'feed' && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Feed */}
            <div className="lg:col-span-2 space-y-6">
              {/* Create Post */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    A
                  </div>
                  <input 
                    type="text" 
                    placeholder="Share your wellness journey..."
                    className="flex-1 bg-gray-100 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-4">
                    <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                      <Camera className="w-4 h-4 mr-1" />
                      Photo
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                      <Video className="w-4 h-4 mr-1" />
                      Video
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                      <Trophy className="w-4 h-4 mr-1" />
                      Challenge
                    </button>
                  </div>
                  <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors">
                    Share
                  </button>
                </div>
              </div>

              {/* Posts */}
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{post.user.avatar}</div>
                        <div>
                          <div className="flex items-center space-x-1">
                            <span className="font-semibold text-gray-900">{post.user.name}</span>
                            {post.user.verified && <Star className="w-4 h-4 text-blue-500 fill-current" />}
                          </div>
                          <div className="text-sm text-gray-500">
                            {Math.floor((Date.now() - post.timestamp.getTime()) / (1000 * 60 * 60))}h ago
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        post.category === 'progress' ? 'bg-green-100 text-green-800' :
                        post.category === 'challenge' ? 'bg-purple-100 text-purple-800' :
                        post.category === 'recipe' ? 'bg-orange-100 text-orange-800' :
                        post.category === 'workout' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {post.category}
                      </span>
                    </div>
                    
                    <p className="text-gray-800 mb-4 leading-relaxed">{post.content}</p>
                    
                    {post.image && (
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img src={post.image} alt="Post content" className="w-full h-64 object-cover" />
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex space-x-6">
                        <button 
                          onClick={() => likePost(post.id)}
                          className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
                        >
                          <Heart className="w-5 h-5" />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                          <MessageCircle className="w-5 h-5" />
                          <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors">
                          <Share2 className="w-5 h-5" />
                          <span>{post.shares}</span>
                        </button>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Bookmark className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Wellness Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Streak Days</span>
                    <div className="flex items-center">
                      <Flame className="w-4 h-4 text-orange-500 mr-1" />
                      <span className="font-bold text-orange-600">12</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Challenges Won</span>
                    <span className="font-bold text-purple-600">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Community Rank</span>
                    <span className="font-bold text-green-600">#247</span>
                  </div>
                </div>
              </div>

              {/* Trending Challenges */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Trending Now</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">#MindfulMonday</div>
                      <div className="text-sm text-gray-600">2.3K posts</div>
                    </div>
                    <div className="text-green-600 text-sm font-medium">+12%</div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">#WaterChallenge</div>
                      <div className="text-sm text-gray-600">1.8K posts</div>
                    </div>
                    <div className="text-green-600 text-sm font-medium">+8%</div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">#DigitalDetox</div>
                      <div className="text-sm text-gray-600">956 posts</div>
                    </div>
                    <div className="text-green-600 text-sm font-medium">+15%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Live Sessions */}
        {activeTab === 'live' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Live & Upcoming Sessions</h2>
              <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Host Session
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {liveSessions.map((session) => (
                <div key={session.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="relative">
                    <img src={session.thumbnail} alt={session.title} className="w-full h-48 object-cover" />
                    {session.isLive && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                        LIVE
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      {session.duration}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{session.title}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Users className="w-4 h-4 mr-1" />
                      <span className="text-sm">{session.participants.toLocaleString()} participants</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-4">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">
                        {session.isLive ? 'Live now' : `Starts ${session.startTime.toLocaleTimeString()}`}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="text-xl">👩‍🏫</div>
                        <span className="text-sm font-medium text-gray-700">{session.instructor}</span>
                      </div>
                      <button 
                        onClick={() => joinSession(session.id)}
                        className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center ${
                          session.isLive 
                            ? 'bg-red-500 text-white hover:bg-red-600' 
                            : 'bg-purple-600 text-white hover:bg-purple-700'
                        }`}
                      >
                        {session.isLive ? (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Join Live
                          </>
                        ) : (
                          <>
                            <Calendar className="w-4 h-4 mr-2" />
                            Register
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Challenges */}
        {activeTab === 'challenges' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Wellness Challenges</h2>
              <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Create Challenge
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.map((challenge) => (
                <div key={challenge.id} className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-purple-500">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                      {challenge.category}
                    </span>
                    <div className="text-sm text-gray-500">{challenge.daysLeft} days left</div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{challenge.title}</h3>
                  <p className="text-gray-600 mb-4">{challenge.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-medium text-purple-600">{challenge.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${challenge.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-1" />
                      <span className="text-sm">{challenge.participants.toLocaleString()} joined</span>
                    </div>
                    <div className="flex items-center text-orange-600">
                      <Trophy className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">{challenge.reward}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => joinChallenge(challenge.id)}
                    className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    Join Challenge
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Marketplace */}
        {activeTab === 'marketplace' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Wellness Marketplace</h2>
              <div className="flex space-x-4">
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>All Categories</option>
                  <option>Supplements</option>
                  <option>Fitness</option>
                  <option>Accessories</option>
                  <option>Wellness</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>Sort by Popular</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Top Rated</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {marketplace.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                    {item.discount && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                        -{item.discount}%
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.vendor}</p>
                    
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">({item.rating})</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        {item.discount ? (
                          <div>
                            <span className="text-lg font-bold text-gray-900">
                              ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                            </span>
                            <span className="text-sm text-gray-500 line-through ml-2">
                              ${item.price}
                            </span>
                          </div>
                        ) : (
                          <span className="text-lg font-bold text-gray-900">${item.price}</span>
                        )}
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {item.category}
                      </span>
                    </div>
                    
                    <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 p-6 mt-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">WellnessConnect</h4>
                <p className="text-sm text-gray-600">Your wellness community platform - connecting minds, bodies, and spirits</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Join 50K+ wellness enthusiasts</p>
              <div className="flex items-center justify-end mt-1">
                <HandyLabsLogo className="text-gray-500" size="sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
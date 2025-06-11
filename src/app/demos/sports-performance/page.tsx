'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Play,
  Pause,
  RotateCcw,
  Timer,
  Trophy,
  Users,
  Target,
  Zap,
  Heart,
  Activity,
  Calendar,
  MapPin,
  Camera,
  MessageCircle,
  Bell,
  Settings,
  ChevronRight,
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
  Plus,
  Minus
} from 'lucide-react';

interface Workout {
  id: string;
  name: string;
  duration: number;
  exercises: Exercise[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  equipment: string[];
  caloriesBurn: number;
}

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  duration?: number;
  restTime: number;
  instructions: string[];
  muscles: string[];
  equipment?: string;
}

interface WorkoutSession {
  startTime: Date;
  currentExerciseIndex: number;
  currentSet: number;
  totalTimeElapsed: number;
  caloriesBurned: number;
  heartRate: number;
}

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  position: string;
  status: 'online' | 'training' | 'offline';
  currentWorkout?: string;
}

export default function AthleteEdgePro() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'workout' | 'live-session' | 'team' | 'progress'>('dashboard');
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [workoutSession, setWorkoutSession] = useState<WorkoutSession | null>(null);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [restTimer, setRestTimer] = useState(0);
  const [showTeamChat, setShowTeamChat] = useState(false);

  // Sample workouts
  const workouts: Workout[] = [
    {
      id: '1',
      name: 'HIIT Cardio Blast',
      duration: 25,
      difficulty: 'Intermediate',
      category: 'Cardio',
      equipment: ['None'],
      caloriesBurn: 320,
      exercises: [
        {
          id: '1',
          name: 'Jumping Jacks',
          sets: 3,
          reps: 30,
          restTime: 30,
          instructions: ['Stand with feet together', 'Jump while spreading legs and raising arms', 'Return to starting position'],
          muscles: ['Legs', 'Core', 'Shoulders']
        },
        {
          id: '2',
          name: 'Burpees',
          sets: 3,
          reps: 10,
          restTime: 45,
          instructions: ['Start in standing position', 'Drop to push-up position', 'Do a push-up', 'Jump back to standing'],
          muscles: ['Full Body']
        },
        {
          id: '3',
          name: 'Mountain Climbers',
          sets: 3,
          reps: 20,
          restTime: 30,
          instructions: ['Start in plank position', 'Alternate bringing knees to chest rapidly', 'Keep core engaged'],
          muscles: ['Core', 'Legs', 'Arms']
        }
      ]
    },
    {
      id: '2',
      name: 'Strength Builder',
      duration: 45,
      difficulty: 'Advanced',
      category: 'Strength',
      equipment: ['Dumbbells', 'Bench'],
      caloriesBurn: 280,
      exercises: [
        {
          id: '1',
          name: 'Dumbbell Bench Press',
          sets: 4,
          reps: 8,
          restTime: 90,
          instructions: ['Lie flat on bench', 'Press dumbbells up from chest', 'Lower with control'],
          muscles: ['Chest', 'Shoulders', 'Triceps'],
          equipment: 'Dumbbells'
        },
        {
          id: '2',
          name: 'Bent-Over Rows',
          sets: 4,
          reps: 10,
          restTime: 75,
          instructions: ['Bend at hips with slight knee bend', 'Pull dumbbells to lower chest', 'Squeeze shoulder blades'],
          muscles: ['Back', 'Biceps'],
          equipment: 'Dumbbells'
        }
      ]
    },
    {
      id: '3',
      name: 'Flexibility Flow',
      duration: 20,
      difficulty: 'Beginner',
      category: 'Flexibility',
      equipment: ['Yoga Mat'],
      caloriesBurn: 85,
      exercises: [
        {
          id: '1',
          name: 'Cat-Cow Stretch',
          sets: 1,
          reps: 10,
          restTime: 0,
          instructions: ['Start in tabletop position', 'Arch and round your back slowly', 'Breathe deeply'],
          muscles: ['Spine', 'Core']
        }
      ]
    }
  ];

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Alex Thompson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      position: 'Team Captain',
      status: 'training',
      currentWorkout: 'HIIT Cardio Blast'
    },
    {
      id: '2',
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      position: 'Forward',
      status: 'online'
    },
    {
      id: '3',
      name: 'Marcus Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      position: 'Defense',
      status: 'training',
      currentWorkout: 'Strength Builder'
    }
  ];

  // Timer effect for rest periods
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [restTimer]);

  // Session timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isWorkoutActive && workoutSession) {
      interval = setInterval(() => {
        setWorkoutSession(prev => prev ? {
          ...prev,
          totalTimeElapsed: prev.totalTimeElapsed + 1,
          caloriesBurned: Math.floor(prev.totalTimeElapsed / 60 * 8),
          heartRate: 140 + Math.floor(Math.random() * 40)
        } : null);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isWorkoutActive, workoutSession]);

  const startWorkout = (workout: Workout) => {
    setSelectedWorkout(workout);
    setWorkoutSession({
      startTime: new Date(),
      currentExerciseIndex: 0,
      currentSet: 1,
      totalTimeElapsed: 0,
      caloriesBurned: 0,
      heartRate: 72
    });
    setCurrentView('live-session');
    setIsWorkoutActive(true);
  };

  const nextExercise = () => {
    if (!workoutSession || !selectedWorkout) return;
    
    const currentExercise = selectedWorkout.exercises[workoutSession.currentExerciseIndex];
    
    if (workoutSession.currentSet < currentExercise.sets) {
      // Next set
      setWorkoutSession(prev => prev ? { ...prev, currentSet: prev.currentSet + 1 } : null);
      setRestTimer(currentExercise.restTime);
    } else {
      // Next exercise
      if (workoutSession.currentExerciseIndex < selectedWorkout.exercises.length - 1) {
        setWorkoutSession(prev => prev ? {
          ...prev,
          currentExerciseIndex: prev.currentExerciseIndex + 1,
          currentSet: 1
        } : null);
        setRestTimer(selectedWorkout.exercises[workoutSession.currentExerciseIndex + 1].restTime);
      } else {
        // Workout complete
        completeWorkout();
      }
    }
  };

  const completeWorkout = () => {
    setIsWorkoutActive(false);
    setCurrentView('progress');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4 shadow-lg">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Link href="/sports" className="flex items-center text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Sports
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">AthleteEdge Pro</h1>
                <div className="flex items-center text-sm text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span>LIVE TRAINING FACILITY</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {workoutSession && (
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center text-orange-400">
                  <Timer className="w-4 h-4 mr-1" />
                  {formatTime(workoutSession.totalTimeElapsed)}
                </div>
                <div className="flex items-center text-red-400">
                  <Heart className="w-4 h-4 mr-1" />
                  {workoutSession.heartRate} BPM
                </div>
                <div className="flex items-center text-blue-400">
                  <Zap className="w-4 h-4 mr-1" />
                  {workoutSession.caloriesBurned} cal
                </div>
              </div>
            )}
            <button 
              onClick={() => setShowTeamChat(!showTeamChat)}
              className="p-2 text-gray-400 hover:text-white transition-colors relative"
            >
              <MessageCircle className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">3</span>
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Bell className="w-6 h-6" />
            </button>
            <button className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <AnimatePresence mode="wait">
          {/* Dashboard */}
          {currentView === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Welcome Section */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Welcome back, Jordan! 💪</h2>
                <p className="text-gray-400">Ready to crush your training goals today? Your team is counting on you.</p>
              </div>

              {/* Quick Stats */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <Trophy className="w-8 h-8 text-yellow-500" />
                    <span className="text-2xl font-bold text-white">47</span>
                  </div>
                  <div className="text-gray-400 text-sm">Workouts Completed</div>
                  <div className="text-green-400 text-xs mt-1">+12 this week</div>
                </div>
                
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <Timer className="w-8 h-8 text-blue-500" />
                    <span className="text-2xl font-bold text-white">127</span>
                  </div>
                  <div className="text-gray-400 text-sm">Hours Trained</div>
                  <div className="text-orange-400 text-xs mt-1">8h this week</div>
                </div>
                
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <Zap className="w-8 h-8 text-orange-500" />
                    <span className="text-2xl font-bold text-white">12.4k</span>
                  </div>
                  <div className="text-gray-400 text-sm">Calories Burned</div>
                  <div className="text-red-400 text-xs mt-1">2.1k this week</div>
                </div>
                
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <Target className="w-8 h-8 text-purple-500" />
                    <span className="text-2xl font-bold text-white">89%</span>
                  </div>
                  <div className="text-gray-400 text-sm">Goal Achievement</div>
                  <div className="text-green-400 text-xs mt-1">+5% from last week</div>
                </div>
              </div>

              {/* Today's Training */}
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-4">🔥 Featured Workouts</h3>
                  <div className="space-y-4">
                    {workouts.map(workout => (
                      <div key={workout.id} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors cursor-pointer"
                           onClick={() => setSelectedWorkout(workout)}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-white">{workout.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            workout.difficulty === 'Beginner' ? 'bg-green-900 text-green-300' :
                            workout.difficulty === 'Intermediate' ? 'bg-yellow-900 text-yellow-300' :
                            'bg-red-900 text-red-300'
                          }`}>
                            {workout.difficulty}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span className="flex items-center">
                            <Timer className="w-4 h-4 mr-1" />
                            {workout.duration}min
                          </span>
                          <span className="flex items-center">
                            <Zap className="w-4 h-4 mr-1" />
                            {workout.caloriesBurn} cal
                          </span>
                          <span>{workout.category}</span>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            startWorkout(workout);
                          }}
                          className="w-full mt-3 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Start Workout
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Team Activity */}
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">👥 Team Activity</h3>
                      <button 
                        onClick={() => setCurrentView('team')}
                        className="text-orange-400 hover:text-orange-300 transition-colors text-sm flex items-center"
                      >
                        View All <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      {teamMembers.map(member => (
                        <div key={member.id} className="flex items-center space-x-3">
                          <div className="relative">
                            <img 
                              src={member.avatar} 
                              alt={member.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-800 ${
                              member.status === 'online' ? 'bg-green-500' :
                              member.status === 'training' ? 'bg-orange-500' :
                              'bg-gray-500'
                            }`}></div>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-white">{member.name}</div>
                            <div className="text-sm text-gray-400">
                              {member.status === 'training' && member.currentWorkout
                                ? `Training: ${member.currentWorkout}`
                                : member.position
                              }
                            </div>
                          </div>
                          {member.status === 'training' && (
                            <Activity className="w-5 h-5 text-orange-500 animate-pulse" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold text-white mb-4">⚡ Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all flex flex-col items-center">
                        <Camera className="w-6 h-6 mb-2" />
                        <span className="text-sm">Record Form</span>
                      </button>
                      <button 
                        onClick={() => setCurrentView('progress')}
                        className="bg-gradient-to-r from-purple-600 to-purple-700 p-4 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all flex flex-col items-center"
                      >
                        <TrendingUp className="w-6 h-6 mb-2" />
                        <span className="text-sm">View Progress</span>
                      </button>
                      <button className="bg-gradient-to-r from-green-600 to-green-700 p-4 rounded-lg hover:from-green-700 hover:to-green-800 transition-all flex flex-col items-center">
                        <Calendar className="w-6 h-6 mb-2" />
                        <span className="text-sm">Schedule</span>
                      </button>
                      <button 
                        onClick={() => setCurrentView('team')}
                        className="bg-gradient-to-r from-orange-600 to-orange-700 p-4 rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all flex flex-col items-center"
                      >
                        <Users className="w-6 h-6 mb-2" />
                        <span className="text-sm">Team Hub</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Workout Preview Modal */}
              {selectedWorkout && !workoutSession && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-gray-800 rounded-xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">{selectedWorkout.name}</h3>
                      <button 
                        onClick={() => setSelectedWorkout(null)}
                        className="text-gray-400 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-4 mb-4 text-sm text-gray-400">
                      <span className="flex items-center">
                        <Timer className="w-4 h-4 mr-1" />
                        {selectedWorkout.duration} minutes
                      </span>
                      <span className="flex items-center">
                        <Zap className="w-4 h-4 mr-1" />
                        {selectedWorkout.caloriesBurn} calories
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        selectedWorkout.difficulty === 'Beginner' ? 'bg-green-900 text-green-300' :
                        selectedWorkout.difficulty === 'Intermediate' ? 'bg-yellow-900 text-yellow-300' :
                        'bg-red-900 text-red-300'
                      }`}>
                        {selectedWorkout.difficulty}
                      </span>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-white mb-3">Exercises ({selectedWorkout.exercises.length})</h4>
                      <div className="space-y-3">
                        {selectedWorkout.exercises.map((exercise, index) => (
                          <div key={exercise.id} className="bg-gray-700 rounded-lg p-3">
                            <div className="font-medium text-white">{index + 1}. {exercise.name}</div>
                            <div className="text-sm text-gray-400">
                              {exercise.sets} sets × {exercise.reps} reps
                              {exercise.restTime > 0 && ` • ${exercise.restTime}s rest`}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Targets: {exercise.muscles.join(', ')}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button 
                        onClick={() => setSelectedWorkout(null)}
                        className="flex-1 bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => startWorkout(selectedWorkout)}
                        className="flex-1 bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start Training
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Live Workout Session */}
          {currentView === 'live-session' && selectedWorkout && workoutSession && (
            <motion.div
              key="live-session"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              {/* Session Header */}
              <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-white">{selectedWorkout.name}</h2>
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => setIsWorkoutActive(!isWorkoutActive)}
                      className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      {isWorkoutActive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                      {isWorkoutActive ? 'Pause' : 'Resume'}
                    </button>
                    <button 
                      onClick={() => {
                        setCurrentView('dashboard');
                        setWorkoutSession(null);
                        setIsWorkoutActive(false);
                      }}
                      className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      End Session
                    </button>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-gray-900 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-orange-400">{formatTime(workoutSession.totalTimeElapsed)}</div>
                    <div className="text-sm text-gray-400">Time Elapsed</div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-red-400">{workoutSession.heartRate}</div>
                    <div className="text-sm text-gray-400">Heart Rate</div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400">{workoutSession.caloriesBurned}</div>
                    <div className="text-sm text-gray-400">Calories</div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-400">
                      {workoutSession.currentExerciseIndex + 1}/{selectedWorkout.exercises.length}
                    </div>
                    <div className="text-sm text-gray-400">Exercise</div>
                  </div>
                </div>
              </div>

              {/* Current Exercise */}
              {(() => {
                const currentExercise = selectedWorkout.exercises[workoutSession.currentExerciseIndex];
                return (
                  <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
                    <div className="text-center mb-6">
                      <h3 className="text-3xl font-bold text-white mb-2">{currentExercise.name}</h3>
                      <div className="text-xl text-gray-400">
                        Set {workoutSession.currentSet} of {currentExercise.sets} • {currentExercise.reps} reps
                      </div>
                    </div>

                    {/* Rest Timer */}
                    {restTimer > 0 && (
                      <div className="text-center mb-6">
                        <div className="text-6xl font-bold text-orange-400 mb-2">{restTimer}</div>
                        <div className="text-lg text-gray-400">Rest Time Remaining</div>
                        <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                          <div 
                            className="bg-orange-500 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${100 - (restTimer / currentExercise.restTime * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Exercise Instructions */}
                    <div className="bg-gray-900 rounded-lg p-4 mb-6">
                      <h4 className="font-semibold text-white mb-3">Instructions:</h4>
                      <ol className="space-y-2">
                        {currentExercise.instructions.map((instruction, index) => (
                          <li key={index} className="flex items-start text-gray-300">
                            <span className="bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5">
                              {index + 1}
                            </span>
                            {instruction}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                      <button 
                        onClick={nextExercise}
                        disabled={restTimer > 0}
                        className={`flex-1 py-4 rounded-lg font-semibold transition-colors ${
                          restTimer > 0 
                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                      >
                        <CheckCircle className="w-5 h-5 inline mr-2" />
                        {workoutSession.currentSet < currentExercise.sets ? 'Complete Set' : 
                         workoutSession.currentExerciseIndex < selectedWorkout.exercises.length - 1 ? 'Next Exercise' : 'Finish Workout'}
                      </button>
                      <button className="px-6 py-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                        <RotateCcw className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* Progress Bar */}
              <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Workout Progress</span>
                  <span className="text-sm text-gray-400">
                    {Math.round(((workoutSession.currentExerciseIndex + (workoutSession.currentSet / selectedWorkout.exercises[workoutSession.currentExerciseIndex].sets)) / selectedWorkout.exercises.length) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${((workoutSession.currentExerciseIndex + (workoutSession.currentSet / selectedWorkout.exercises[workoutSession.currentExerciseIndex].sets)) / selectedWorkout.exercises.length) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Team Hub */}
          {currentView === 'team' && (
            <motion.div
              key="team"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white">Team Hub</h2>
                <button 
                  onClick={() => setCurrentView('dashboard')}
                  className="text-orange-400 hover:text-orange-300 transition-colors"
                >
                  Back to Dashboard
                </button>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Team Members */}
                <div className="lg:col-span-2">
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold text-white mb-6">Team Members</h3>
                    <div className="space-y-4">
                      {teamMembers.map(member => (
                        <div key={member.id} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors">
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <img 
                                src={member.avatar} 
                                alt={member.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-700 ${
                                member.status === 'online' ? 'bg-green-500' :
                                member.status === 'training' ? 'bg-orange-500' :
                                'bg-gray-500'
                              }`}></div>
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-white">{member.name}</div>
                              <div className="text-sm text-gray-400">{member.position}</div>
                              {member.status === 'training' && member.currentWorkout && (
                                <div className="text-sm text-orange-400 flex items-center mt-1">
                                  <Activity className="w-4 h-4 mr-1" />
                                  Training: {member.currentWorkout}
                                </div>
                              )}
                            </div>
                            <div className="flex space-x-2">
                              <button className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors">
                                <MessageCircle className="w-4 h-4" />
                              </button>
                              <button className="p-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                                <Users className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Team Chat */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-4">Team Chat</h3>
                  <div className="space-y-3 mb-4 h-64 overflow-y-auto">
                    <div className="flex space-x-3">
                      <img src={teamMembers[0].avatar} alt="" className="w-8 h-8 rounded-full" />
                      <div>
                        <div className="text-sm text-gray-400">{teamMembers[0].name}</div>
                        <div className="bg-gray-700 rounded-lg p-2 text-sm text-white">
                          Just finished HIIT! Anyone up for a cool down session?
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <img src={teamMembers[1].avatar} alt="" className="w-8 h-8 rounded-full" />
                      <div>
                        <div className="text-sm text-gray-400">{teamMembers[1].name}</div>
                        <div className="bg-gray-700 rounded-lg p-2 text-sm text-white">
                          I'm in! Meet at the stretching area in 5?
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <input 
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 bg-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <button className="bg-orange-600 text-white p-2 rounded-lg hover:bg-orange-700 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Progress/Results */}
          {currentView === 'progress' && (
            <motion.div
              key="progress"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center py-16">
                <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-2">Workout Complete! 🔥</h2>
                <p className="text-gray-400 mb-8">Outstanding performance, Jordan! Your team would be proud.</p>
                
                {workoutSession && (
                  <div className="bg-gray-800 rounded-xl p-6 max-w-md mx-auto mb-8 border border-gray-700">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-orange-400">{formatTime(workoutSession.totalTimeElapsed)}</div>
                        <div className="text-sm text-gray-400">Duration</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-400">{workoutSession.caloriesBurned}</div>
                        <div className="text-sm text-gray-400">Calories</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-red-400">{workoutSession.heartRate}</div>
                        <div className="text-sm text-gray-400">Avg HR</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-400">100%</div>
                        <div className="text-sm text-gray-400">Completed</div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="space-x-4">
                  <button 
                    onClick={() => {
                      setCurrentView('dashboard');
                      setWorkoutSession(null);
                      setSelectedWorkout(null);
                    }}
                    className="bg-orange-600 text-white px-8 py-3 rounded-xl hover:bg-orange-700 transition-colors"
                  >
                    Back to Training
                  </button>
                  <button className="bg-gray-700 text-white px-8 py-3 rounded-xl hover:bg-gray-600 transition-colors">
                    Share Results
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Team Chat Sidebar */}
      {showTeamChat && (
        <div className="fixed right-0 top-0 h-full w-80 bg-gray-800 border-l border-gray-700 p-4 z-40">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Team Chat</h3>
            <button 
              onClick={() => setShowTeamChat(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          {/* Chat content would go here */}
        </div>
      )}
    </div>
  );
} 
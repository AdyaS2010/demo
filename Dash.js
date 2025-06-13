import React, { useState, useEffect } from 'react';
import { Star, Trophy, BookOpen, Zap, Lock, Unlock, Award, Target, Brain, Calculator, CheckCircle, XCircle, LogIn, UserPlus, User, LogOut } from 'lucide-react';

const Dash = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [quizResults, setQuizResults] = useState([]);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ username: '', email: '', password: '' });

  // User data structure stored in memory
  const [users, setUsers] = useState(() => ({
    demo: {
      username: 'demo',
      email: 'demo@example.com',
      password: 'demo123',
      level: 1,
      experience: 850,
      achievements: ['First Steps', 'Quick Learner'],
      completedLevels: [1, 2],
      streakDays: 5,
      totalPoints: 850
    }
  }));

  const levels = [
    {
      id: 1,
      title: "Basic Operations",
      description: "Master addition, subtraction, multiplication, and division with variables",
      difficulty: "Beginner",
      xpReward: 100,
      badge: "🔢",
      topics: ["Variables", "Basic Operations", "Order of Operations"],
      unlocked: true
    },
    {
      id: 2,
      title: "Linear Equations",
      description: "Solve one-step and two-step linear equations",
      difficulty: "Beginner",
      xpReward: 150,
      badge: "📐",
      topics: ["One-step equations", "Two-step equations", "Variables on both sides"],
      unlocked: true
    },
    {
      id: 3,
      title: "Graphing Lines",
      description: "Plot points and graph linear equations",
      difficulty: "Intermediate",
      xpReward: 200,
      badge: "📊",
      topics: ["Coordinate plane", "Slope", "Y-intercept", "Graphing"],
      unlocked: false
    },
    {
      id: 4,
      title: "Systems of Equations",
      description: "Solve systems using substitution and elimination",
      difficulty: "Intermediate",
      xpReward: 250,
      badge: "🔄",
      topics: ["Substitution method", "Elimination method", "Graphing systems"],
      unlocked: false
    },
    {
      id: 5,
      title: "Quadratic Functions",
      description: "Explore parabolas and quadratic equations",
      difficulty: "Advanced",
      xpReward: 300,
      badge: "🌟",
      topics: ["Parabolas", "Vertex form", "Factoring", "Quadratic formula"],
      unlocked: false
    },
    {
      id: 6,
      title: "Polynomials",
      description: "Add, subtract, multiply, and factor polynomials",
      difficulty: "Advanced",
      xpReward: 350,
      badge: "🎯",
      topics: ["Polynomial operations", "Factoring", "Special products"],
      unlocked: false
    }
  ];

  const achievements = [
    { id: 1, name: "First Steps", description: "Complete your first level", icon: "👶", earned: true },
    { id: 2, name: "Quick Learner", description: "Score 90% or higher on a quiz", icon: "⚡", earned: true },
    { id: 3, name: "Streak Master", description: "Maintain a 7-day learning streak", icon: "🔥", earned: false },
    { id: 4, name: "Perfect Score", description: "Get 100% on a quiz", icon: "💯", earned: false },
    { id: 5, name: "Level Crusher", description: "Complete 3 levels", icon: "💪", earned: false },
    { id: 6, name: "Math Wizard", description: "Complete all levels", icon: "🧙‍♂️", earned: false }
  ];

  const generateQuestions = (levelId) => {
    const questionSets = {
      1: [
        {
          question: "Solve for x: 3x + 5 = 14",
          options: ["x = 3", "x = 4", "x = 5", "x = 6"],
          correct: 0,
          explanation: "Subtract 5 from both sides: 3x = 9, then divide by 3: x = 3"
        },
        {
          question: "Simplify: 2x + 3x - x",
          options: ["4x", "5x", "6x", "3x"],
          correct: 0,
          explanation: "Combine like terms: 2x + 3x - x = (2 + 3 - 1)x = 4x"
        },
        {
          question: "If x = 4, what is 2x + 7?",
          options: ["15", "16", "14", "13"],
          correct: 0,
          explanation: "Substitute x = 4: 2(4) + 7 = 8 + 7 = 15"
        },
        {
          question: "Solve: x - 8 = 12",
          options: ["x = 20", "x = 4", "x = -4", "x = 8"],
          correct: 0,
          explanation: "Add 8 to both sides: x = 12 + 8 = 20"
        },
        {
          question: "What is the coefficient of x in 5x + 3?",
          options: ["5", "3", "8", "x"],
          correct: 0,
          explanation: "The coefficient is the number multiplied by the variable, which is 5"
        }
      ],
      2: [
        {
          question: "Solve: 2x + 6 = 18",
          options: ["x = 6", "x = 12", "x = 8", "x = 4"],
          correct: 0,
          explanation: "Subtract 6: 2x = 12, then divide by 2: x = 6"
        },
        {
          question: "Solve: 4x - 7 = 25",
          options: ["x = 8", "x = 7", "x = 9", "x = 6"],
          correct: 0,
          explanation: "Add 7: 4x = 32, then divide by 4: x = 8"
        },
        {
          question: "Solve: 3(x + 2) = 21",
          options: ["x = 5", "x = 6", "x = 7", "x = 4"],
          correct: 0,
          explanation: "Distribute: 3x + 6 = 21, subtract 6: 3x = 15, divide by 3: x = 5"
        },
        {
          question: "Solve: 2x + 3 = x + 8",
          options: ["x = 5", "x = 4", "x = 6", "x = 3"],
          correct: 0,
          explanation: "Subtract x from both sides: x + 3 = 8, subtract 3: x = 5"
        },
        {
          question: "Solve: 5x - 4 = 3x + 10",
          options: ["x = 7", "x = 6", "x = 8", "x = 5"],
          correct: 0,
          explanation: "Subtract 3x: 2x - 4 = 10, add 4: 2x = 14, divide by 2: x = 7"
        }
      ]
    };
    return questionSets[levelId] || questionSets[1];
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login attempt:', loginForm.username, loginForm.password);
    const user = users[loginForm.username];
    console.log('Found user:', user);
    if (user && user.password === loginForm.password) {
      setCurrentUser(user);
      setShowLogin(false);
      setCurrentView('dashboard');
      setLoginForm({ username: '', password: '' });
    } else {
      alert('Invalid credentials. Try username: demo, password: demo123');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (users[registerForm.username]) {
      alert('Username already exists');
      return;
    }
    const newUser = {
      username: registerForm.username,
      email: registerForm.email,
      password: registerForm.password,
      level: 1,
      experience: 0,
      achievements: [],
      completedLevels: [],
      streakDays: 0,
      totalPoints: 0
    };
    setUsers({...users, [registerForm.username]: newUser});
    setCurrentUser(newUser);
    setShowLogin(false);
    setCurrentView('dashboard');
    setRegisterForm({ username: '', email: '', password: '' });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowLogin(true);
    setCurrentView('dashboard');
  };

  const startQuiz = (level) => {
    setSelectedLevel(level);
    setCurrentQuestion(0);
    setUserAnswer('');
    setShowResult(false);
    setQuizResults([]);
    setCurrentView('quiz');
  };

  const submitAnswer = () => {
    const questions = generateQuestions(selectedLevel.id);
    const currentQ = questions[currentQuestion];
    const isCorrect = parseInt(userAnswer) === currentQ.correct;
    
    const newResults = [...quizResults, {
      question: currentQ.question,
      userAnswer: userAnswer,
      correct: currentQ.correct,
      isCorrect: isCorrect,
      explanation: currentQ.explanation
    }];
    
    setQuizResults(newResults);
    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setUserAnswer('');
        setShowResult(false);
      } else {
        completeQuiz(newResults);
      }
    }, 2000);
  };

  const completeQuiz = (results) => {
    const correctAnswers = results.filter(r => r.isCorrect).length;
    const percentage = (correctAnswers / results.length) * 100;
    const xpGained = Math.floor(percentage * 2);
    
    // Update user progress
    const updatedUser = {
      ...currentUser,
      experience: currentUser.experience + xpGained,
      totalPoints: currentUser.totalPoints + xpGained
    };
    
    if (percentage >= 70 && !updatedUser.completedLevels.includes(selectedLevel.id)) {
      updatedUser.completedLevels.push(selectedLevel.id);
      updatedUser.level = Math.max(updatedUser.level, selectedLevel.id + 1);
    }
    
    setCurrentUser(updatedUser);
    setUsers({...users, [updatedUser.username]: updatedUser});
    setCurrentView('results');
  };

  if (showLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🎯</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Dash</h1>
            <p className="text-gray-600">Master algebra through gamified learning</p>
          </div>
          
          {!isRegistering ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter username"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin(e);
                }}
              >
                <LogIn size={20} />
                Sign In
              </button>
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsRegistering(true)}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Create new account
                </button>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-600">
                <strong>Demo Account:</strong><br />
                Username: demo<br />
                Password: demo123
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={registerForm.username}
                  onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Choose username"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Create password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <UserPlus size={20} />
                Create Account
              </button>
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsRegistering(false)}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Back to sign in
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* User Stats */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white bg-opacity-20 p-3 rounded-full">
            <User size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Welcome back, {currentUser.username}!</h2>
            <p className="opacity-90">Level {currentUser.level} • {currentUser.experience} XP</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">{currentUser.completedLevels.length}</div>
            <div className="opacity-80">Levels Complete</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{currentUser.achievements.length}</div>
            <div className="opacity-80">Achievements</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{currentUser.streakDays}</div>
            <div className="opacity-80">Day Streak</div>
          </div>
        </div>
      </div>

      {/* Levels Grid */}
      <div>
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Choose Your Quest</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levels.map((level) => {
            const isUnlocked = level.unlocked || currentUser.completedLevels.includes(level.id - 1) || level.id === 1;
            const isCompleted = currentUser.completedLevels.includes(level.id);
            
            return (
              <div
                key={level.id}
                className={`relative bg-white rounded-xl shadow-lg p-6 transition-all duration-200 ${
                  isUnlocked ? 'hover:shadow-xl hover:scale-105 cursor-pointer' : 'opacity-50'
                }`}
                onClick={() => isUnlocked && startQuiz(level)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">{level.badge}</div>
                  {isCompleted ? (
                    <CheckCircle className="text-green-500" size={24} />
                  ) : !isUnlocked ? (
                    <Lock className="text-gray-400" size={24} />
                  ) : (
                    <Unlock className="text-blue-500" size={24} />
                  )}
                </div>
                <h4 className="text-xl font-bold mb-2">{level.title}</h4>
                <p className="text-gray-600 mb-4">{level.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    level.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                    level.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {level.difficulty}
                  </span>
                  <div className="flex items-center gap-1 text-purple-600">
                    <Star size={16} />
                    <span className="font-medium">{level.xpReward} XP</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderQuiz = () => {
    const questions = generateQuestions(selectedLevel.id);
    const currentQ = questions[currentQuestion];

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{selectedLevel.title}</h2>
              <div className="bg-purple-100 px-4 py-2 rounded-full">
                <span className="text-purple-800 font-medium">
                  {currentQuestion + 1} / {questions.length}
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">{currentQ.question}</h3>
            
            {!showResult ? (
              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <label key={index} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="answer"
                      value={index}
                      checked={userAnswer === index.toString()}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-lg">{option}</span>
                  </label>
                ))}
                
                <button
                  onClick={submitAnswer}
                  disabled={userAnswer === ''}
                  className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Submit Answer
                </button>
              </div>
            ) : (
              <div className={`p-6 rounded-xl ${quizResults[currentQuestion].isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}`}>
                <div className="flex items-center gap-3 mb-4">
                  {quizResults[currentQuestion].isCorrect ? (
                    <CheckCircle className="text-green-600" size={24} />
                  ) : (
                    <XCircle className="text-red-600" size={24} />
                  )}
                  <h4 className={`text-xl font-bold ${quizResults[currentQuestion].isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                    {quizResults[currentQuestion].isCorrect ? 'Correct!' : 'Incorrect'}
                  </h4>
                </div>
                <p className="text-gray-700 mb-4">{currentQ.explanation}</p>
                {!quizResults[currentQuestion].isCorrect && (
                  <p className="text-gray-600">
                    Correct answer: {currentQ.options[currentQ.correct]}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const correctAnswers = quizResults.filter(r => r.isCorrect).length;
    const percentage = (correctAnswers / quizResults.length) * 100;
    const passed = percentage >= 70;

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className={`text-6xl mb-4 ${passed ? '🎉' : '📚'}`}>
            {passed ? '🎉' : '📚'}
          </div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            {passed ? 'Congratulations!' : 'Keep Learning!'}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            You scored {correctAnswers} out of {quizResults.length} ({percentage.toFixed(0)}%)
          </p>
          
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-xl">
              <Trophy className="text-blue-600 mx-auto mb-2" size={32} />
              <div className="text-2xl font-bold text-blue-800">{Math.floor(percentage * 2)} XP</div>
              <div className="text-blue-600">Experience Gained</div>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl">
              <Target className="text-purple-600 mx-auto mb-2" size={32} />
              <div className="text-2xl font-bold text-purple-800">{percentage.toFixed(0)}%</div>
              <div className="text-purple-600">Accuracy</div>
            </div>
          </div>

          {passed && (
            <div className="bg-green-50 border-2 border-green-200 p-4 rounded-xl mb-6">
              <Award className="text-green-600 mx-auto mb-2" size={24} />
              <p className="text-green-800 font-semibold">Level Completed!</p>
              <p className="text-green-600">You've unlocked the next level!</p>
            </div>
          )}

          <button
            onClick={() => setCurrentView('dashboard')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
          >
            Continue Learning
          </button>
        </div>
      </div>
    );
  };

  const renderAchievements = () => (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Your Achievements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => {
          const earned = currentUser.achievements.includes(achievement.name);
          return (
            <div
              key={achievement.id}
              className={`bg-white rounded-xl shadow-lg p-6 ${earned ? 'ring-2 ring-yellow-400' : 'opacity-60'}`}
            >
              <div className="text-4xl mb-4 text-center">{achievement.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-center">{achievement.name}</h3>
              <p className="text-gray-600 text-center">{achievement.description}</p>
              {earned && (
                <div className="mt-4 text-center">
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    Earned!
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🎯</div>
              <h1 className="text-xl font-bold text-gray-800">Dash</h1>
            </div>
            
            <nav className="flex items-center gap-6">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'dashboard' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <BookOpen size={20} />
                Dashboard
              </button>
              <button
                onClick={() => setCurrentView('achievements')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'achievements' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <Trophy size={20} />
                Achievements
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut size={20} />
                Logout
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'dashboard' && renderDashboard()}
        {currentView === 'quiz' && renderQuiz()}
        {currentView === 'results' && renderResults()}
        {currentView === 'achievements' && renderAchievements()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">🎯 Dash - Making Algebra Fun and Engaging</p>
            <p className="text-sm">Built with React • Designed for High School Students</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dash;

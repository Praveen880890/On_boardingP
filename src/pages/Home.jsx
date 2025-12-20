import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, Brain, TrendingUp, Award, 
  Upload, Play, BarChart, ArrowRight
} from 'lucide-react';
import useAuthStore from '../store/authStore';
import Navbar from '../components/layout/Navbar';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const stats = [
    { 
      icon: <BookOpen className="w-6 h-6" />, 
      label: "Courses Completed", 
      value: "12", 
      change: "+3 this week",
      gradient: "from-blue-500 to-cyan-500"
    },
    { 
      icon: <Brain className="w-6 h-6" />, 
      label: "Quizzes Taken", 
      value: "48", 
      change: "+8 today",
      gradient: "from-purple-500 to-pink-500"
    },
    { 
      icon: <TrendingUp className="w-6 h-6" />, 
      label: "Success Rate", 
      value: "92%", 
      change: "+5% improvement",
      gradient: "from-green-500 to-emerald-500"
    },
    { 
      icon: <Award className="w-6 h-6" />, 
      label: "Achievements", 
      value: "24", 
      change: "3 new badges",
      gradient: "from-orange-500 to-red-500"
    },
  ];

  const quickActions = [
    {
      title: "Upload Knowledge",
      description: "Add new learning materials",
      icon: <Upload className="w-8 h-8" />,
      action: () => navigate('/knowledge'),
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Take Quiz",
      description: "Test your knowledge",
      icon: <Play className="w-8 h-8" />,
      action: () => navigate('/quiz'),
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "View Progress",
      description: "Track your learning",
      icon: <BarChart className="w-8 h-8" />,
      action: () => navigate('/progress'),
      gradient: "from-green-500 to-emerald-500"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, <span className="gradient-text">{user?.name || 'Learner'}!</span>
          </h1>
          <p className="text-gray-600 text-lg">Here's your learning overview for today</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
              <p className="text-sm text-green-600 font-semibold">{stat.change}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={action.action}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${action.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                  {action.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-gray-600 mb-4">{action.description}</p>
                <div className="flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform">
                  Get Started <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity & Progress Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { activity: "Completed Python Quiz", time: "2 hours ago", icon: <Brain className="w-5 h-5 text-purple-500" /> },
                { activity: "Uploaded new materials", time: "5 hours ago", icon: <Upload className="w-5 h-5 text-blue-500" /> },
                { activity: "Earned Achievement Badge", time: "1 day ago", icon: <Award className="w-5 h-5 text-orange-500" /> },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0">{item.icon}</div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{item.activity}</p>
                    <p className="text-sm text-gray-600">{item.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Learning Goals */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 shadow-lg text-white"
          >
            <h3 className="text-xl font-bold mb-4">Today's Learning Goals</h3>
            <div className="space-y-4">
              {[
                { goal: "Complete 3 quizzes", progress: 66 },
                { goal: "Study for 2 hours", progress: 80 },
                { goal: "Review weak areas", progress: 40 },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">{item.goal}</span>
                    <span>{item.progress}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.progress}%` }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                      className="bg-white rounded-full h-2"
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
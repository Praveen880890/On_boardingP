import Navbar from '../components/layout/Navbar';
import { TrendingUp, Award, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const Progress = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Progress</h1>
          <p className="text-gray-600 mb-8">Track your learning journey and achievements</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: <TrendingUp className="w-8 h-8" />, title: "Overall Score", value: "92%", color: "from-green-500 to-emerald-500" },
            { icon: <Award className="w-8 h-8" />, title: "Achievements", value: "24", color: "from-orange-500 to-red-500" },
            { icon: <Target className="w-8 h-8" />, title: "Goals Met", value: "18/20", color: "from-blue-500 to-cyan-500" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white mb-4`}>
                {stat.icon}
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-8 shadow-lg mb-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">Learning Streak</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-4xl font-bold text-purple-600 mb-2">7 Days</p>
              <p className="text-gray-600">Keep it up! 🔥</p>
            </div>
            <div className="flex space-x-2">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                  ✓
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">Subject Performance</h3>
          <div className="space-y-4">
            {[
              { subject: "Python Programming", progress: 85, color: "bg-blue-500" },
              { subject: "Data Structures", progress: 92, color: "bg-purple-500" },
              { subject: "Algorithms", progress: 78, color: "bg-green-500" },
              { subject: "Web Development", progress: 65, color: "bg-orange-500" },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-gray-900">{item.subject}</span>
                  <span className="text-gray-600">{item.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.progress}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className={`${item.color} rounded-full h-3`}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Progress;
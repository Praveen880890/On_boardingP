import Navbar from '../components/layout/Navbar';
import { Brain, Play, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const Quiz = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Center</h1>
          <p className="text-gray-600 mb-8">Generate and take AI-powered quizzes</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: <Brain className="w-8 h-8" />, title: "AI Generated", count: "15", color: "from-purple-500 to-pink-500" },
            { icon: <Play className="w-8 h-8" />, title: "In Progress", count: "3", color: "from-blue-500 to-cyan-500" },
            { icon: <Trophy className="w-8 h-8" />, title: "Completed", count: "48", color: "from-green-500 to-emerald-500" },
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
              <p className="text-3xl font-bold text-gray-900">{stat.count}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Start New Quiz</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Topic</label>
              <input
                type="text"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none"
                placeholder="e.g., Python Programming"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty</label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Questions</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none"
                  placeholder="5"
                  min="1"
                  max="20"
                />
              </div>
            </div>
            <button className="w-full btn-primary">Generate Quiz</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Quiz;
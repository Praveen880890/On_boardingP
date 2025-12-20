import api from './api';

export const quizService = {
  generateQuiz: async (data) => {
    const response = await api.post('/api/v1/quiz/generate', data);
    return response.data;
  },

  validateAnswer: async (question, userAnswer, topic) => {
    const response = await api.post('/api/v1/assessment/validate-answer', {
      question,
      user_answer: userAnswer,
      topic,
    });
    return response.data;
  },

  getUserAssessment: async (userId) => {
    const response = await api.get(`/api/v1/assessment/user/${userId}`);
    return response.data;
  },
};

export default quizService;
import api from './api';

export const knowledgeService = {
  ingestText: async (data) => {
    const response = await api.post('/api/v1/knowledge/ingest/text', data);
    return response.data;
  },

  ingestFile: async (formData) => {
    const response = await api.post('/api/v1/knowledge/ingest/file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/api/v1/knowledge/stats');
    return response.data;
  },

  analyzeContent: async (content) => {
    const response = await api.post('/api/v1/knowledge/analyze', { content });
    return response.data;
  },
};

export default knowledgeService;
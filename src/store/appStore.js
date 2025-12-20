import { create } from 'zustand';

const useAppStore = create((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),

  currentQuiz: null,
  setCurrentQuiz: (quiz) => set({ currentQuiz: quiz }),
  clearCurrentQuiz: () => set({ currentQuiz: null }),

  userProgress: null,
  setUserProgress: (progress) => set({ userProgress: progress }),

  knowledgeStats: null,
  setKnowledgeStats: (stats) => set({ knowledgeStats: stats }),

  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { id: Date.now(), ...notification },
      ],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  clearNotifications: () => set({ notifications: [] }),

  theme: 'light',
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    })),
}));

export default useAppStore;
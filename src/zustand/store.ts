import { create } from 'zustand';

type AuthState = {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
};

export const useAuthStore = create<AuthState>((set) => {
  const storedToken = localStorage.getItem('token');  
  return {
    token: storedToken,
    setToken: (token) => {
      localStorage.setItem('token', token); 
      set({ token });
    },
    clearToken: () => {
      localStorage.removeItem('token'); 
      set({ token: null });
    },
  };
});

//zustand

import create from "zustand";

const useUserStore = create((set) => ({
  user: {
    name: null,
    email: null,
    password: null,
    phone: null,
    isLoggedIn: false,
  },

  setUser: (user) => set((state) => ({ ...state, user })),
  setName: (name) =>
    set((state) => ({ ...state, user: { ...state.user, name } })),
  setEmail: (email) =>
    set((state) => ({ ...state, user: { ...state.user, email } })),
  setPassword: (password) =>
    set((state) => ({ ...state, user: { ...state.user, password } })),
  setPhone: (phone) =>
    set((state) => ({ ...state, user: { ...state.user, phone } })),
  setIsLoggedIn: (isLoggedIn) =>
    set((state) => ({ ...state, user: { ...state.user, isLoggedIn } })),
}));

export default useUserStore;

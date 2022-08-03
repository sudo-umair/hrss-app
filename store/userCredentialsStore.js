import create from "zustand";

const userCredentialsStore = create((set) => ({
  userCredentials: {
    email: "",
    password: "",
  },
  isLoggedIn: false,

  setUserCredentials: (userCredentials) =>
    set((state) => ({
      userCredentials,
    })),

  setIsLoggedIn: (isLoggedIn) =>
    set((state) => ({
      isLoggedIn,
    })),
}));

export default userCredentialsStore;

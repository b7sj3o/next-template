import { create } from "zustand";

export interface AuthStore {
  token: boolean;
  checkToken: (boolean: boolean) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  token: false,
  checkToken: (boolean) => set(() => ({
    token: boolean
  }))
}))

export default useAuthStore;
'use client'

import useMainStore from "@/store/main-store";
import useAdminStore, { AdminStore } from '@/store/admin-store'

import type { MainStore } from "@/store/main-store"; // Просто импортируем тип функций и стейтов нашего стора из стора

import { createContext, useContext } from "react";
import { AuthStore } from "@/store/auth-store";

import useAuthStore from "@/store/auth-store";

type StoresContextType = {
  store: MainStore;
  authStore: AuthStore;
  adminStore: AdminStore;
};

const StoreContext = createContext<StoresContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const store = useMainStore();
  const adminStore = useAdminStore();
  const authStore = useAuthStore();

  return <StoreContext.Provider value={{store, adminStore, authStore}}>
    {children}
  </StoreContext.Provider>
}

export const useStoreContext = (): StoresContextType => {
    const context = useContext(StoreContext);
    if (!context) throw new Error("Чтобы использовать стор нужно чтобы он был обёрнут в провайдер");
    return context;
};
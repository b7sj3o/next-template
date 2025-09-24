'use client'

import { createContext, useContext, useEffect } from "react";
import { useStoreContext } from "./store-provider";
import { toast } from "sonner";

import { useRouter } from "next/navigation";

type AuthContextType = {
    login: (data: {username?: string, password?: string}) => void;
    register: (data: {username?: string, email?: string, password?: string}) => Promise<void>;
    logout: () => void;
    refreshUser: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const {authStore} = useStoreContext();
    const router = useRouter();

    useEffect(() => {
      refreshUser();
    }, [])

    const refreshUser = async () => {
      try {
        const res = await fetch('/api/v1/users/me');
        const data = await res.json();
        if (data.success) {
          authStore.checkToken(true)
        } else {
          authStore.checkToken(false)
        }
        return data;
      } catch(e) {
        console.log(e)
      }
    }

    const login = async (data: {username?: string, password?: string}) => {
      try {
        const request = await fetch('/api/v1/users/login', {
          method: 'POST',
          headers: {
              'Content-type': 'application/json'
          },
          body: JSON.stringify({username: data.username, password: data.password})
        })

        const response = await request.json();

        if (response.success) {
          authStore.checkToken(true)
          toast(response.data)
          router.push('/admin-dashboard')
        } else {
          authStore.checkToken(false)
          toast(response.error)
        }

        return request;
      } catch (e) {
        toast('Помилка при логінці')
        console.log(e)
      }
    };

    const register = async (data: {username?: string, email?: string, password?: string}) => {
      try {
        const request = await fetch('/api/v1/users/register', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({username: data.username, email: data.email, password: data.password})
        })

        const message = await request.json();

        if (message.success) {
          toast('Успішна реєстрація')
          router.push('/admin-dashboard')
        } else {
          toast(message.error)
        }
      } catch (e) {
        toast('Помилка при реєстрації')
        console.log(e)
      }
    }

    const logout = async () => {
      try {
        const res = await fetch('/api/v1/users/logout', {
          method: 'POST'
        });
        const data = await res.json();
        toast('Успішний вихід з адмін панелі')
        authStore.checkToken(false)
        router.push('/admin-auth')
        return data;
      } catch(e) {
        console.log(e)
      }
    }

    return (
      <AuthContext.Provider value={{ login, logout, refreshUser, register }}>
        {children}
      </AuthContext.Provider>
    );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
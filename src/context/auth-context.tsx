import React, { useState, useContext, ReactNode, useEffect } from 'react';
import * as auth from './../auth-provider';
import { User } from './../screens/project-list/Search';
import { http } from './../helper';

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => void;
      register: (form: AuthForm) => void;
      logout: () => void;
    }
  | undefined
>(undefined);

interface AuthForm {
  username: string;
  password: string;
}

AuthContext.displayName = 'AuthContext';

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    user = await http('/me', { token });
  }
  return user;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (form: AuthForm) => {
    auth.login(form).then((res) => setUser(res));
  };
  const register = (form: AuthForm) => {
    auth.register(form).then((res) => setUser(res));
  };
  const logout = () => {
    auth.logout().then(() => setUser(null));
  };

  useEffect(() => {
    bootstrapUser().then((res) => {
      return setUser(res?.user);
    });
  }, []);
  return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth 必须在AuthProvider中使用');
  return context;
};

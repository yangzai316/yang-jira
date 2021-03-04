import React, { useState, useContext, ReactNode, useEffect } from 'react';
import { User } from './../pages/screens/project-list/search';
import { http, auth } from 'helper';

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => void;
      logout: () => void;
      loading: Boolean;
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

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useEffect(() => {
    bootstrapUser()
      .then((res) => {
        setUser(res?.user);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);
  return <AuthContext.Provider children={children} value={{ user, login, register, logout, loading }} />;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth 必须在AuthContextProvider中使用');
  return context;
};

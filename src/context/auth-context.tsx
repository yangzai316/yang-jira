import React, { useState, useContext, ReactNode, useEffect } from 'react';
import { User } from './../pages/screens/project-list/search';
import { http, auth } from './../helper';

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => void;
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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

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
    bootstrapUser()
      .then((res) => {
        setUser(res?.user);
        setLoading(true);
      })
      .catch(() => {
        setLoading(true);
      });
  }, []);
  return <AuthContext.Provider children={children} value={{ user, login, register, logout, loading }} />;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth 必须在AuthProvider中使用');
  return context;
};

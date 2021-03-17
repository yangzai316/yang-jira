import React, { useState, useContext,    useEffect } from 'react'; 
import { http, auth } from 'helper';

const AuthContext = React.createContext(undefined);

 

AuthContext.displayName = 'AuthContext';

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    user = await http('/me', { token });
  }
  return user;
};

export const AuthContextProvider = ({ children } ) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (form) => auth.login(form).then(setUser);
  const register = (form ) => auth.register(form).then(setUser);
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

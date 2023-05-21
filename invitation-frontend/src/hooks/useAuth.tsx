/**
 * Reference: https://blog.logrocket.com/complete-guide-authentication-with-react-router-v6/
 */

import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';

interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  token: string;
  subdomains: string[];
}

interface IAuthContext {
  user: IUser | null;
  login: (data: object) => void;
  logout: () => void;
}

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<Partial<IAuthContext>>({});

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const login = async (data: object) => {
    setUser(data);
    navigate("/list");
  };

  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(() => ({
      user,
      login,
      logout
    }),
    [user]
  );
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export const useAuth = () => {
  return useContext(AuthContext);
};

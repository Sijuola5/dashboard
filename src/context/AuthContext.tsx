import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type User = {
  email: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  signup: (data: User) => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signup = (data: User) => {
    localStorage.setItem("authUser", JSON.stringify(data));
    setUser(data);
  };

  const login = (email: string, password: string) => {
    const storedUser = localStorage.getItem("authUser");
    if (!storedUser) return false;

    const parsedUser: User = JSON.parse(storedUser);
    if (parsedUser.email === email && parsedUser.password === password) {
      setUser(parsedUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "student";
};

type AuthContextType = {
  user: User | null;
  login: (role: "admin" | "student") => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (role: "admin" | "student") => {
    const dummyUser: User = {
      id: "1",
      name: "Aryan Sharma",
      email: "aryan@gmail.com",
      role,
    };

    setUser(dummyUser);
    localStorage.setItem("user", JSON.stringify(dummyUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
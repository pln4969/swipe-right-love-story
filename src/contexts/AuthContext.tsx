import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  firstName: string;
  email: string;
  isAuthenticated: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => void;
}

interface SignUpData {
  firstName: string;
  email: string;
  password: string;
  birthDate: string;
  agreeToTerms: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (email: string, password: string) => {
    // Simulate API call - in real app, this would validate credentials
    const mockUser: User = {
      id: "1",
      firstName: email.split('@')[0],
      email,
      isAuthenticated: true,
    };
    setUser(mockUser);
  };

  const signUp = async (data: SignUpData) => {
    // Simulate API call - in real app, this would create account
    const mockUser: User = {
      id: "1",
      firstName: data.firstName,
      email: data.email,
      isAuthenticated: true,
    };
    setUser(mockUser);
  };

  const signOut = () => {
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { supabase } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isAuthenticated: boolean;
  logout: () => void; // Thêm hàm logout
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isAuthenticated: false,
  logout: () => {}, // Cung cấp giá trị mặc định
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  
    return () => {
      authListener.subscription.unsubscribe(); // Cleanup khi unmount
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setSession(null); // Cập nhật lại session sau khi đăng xuất
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user,
        isAuthenticated: !!session?.user && !session?.user.is_anonymous,
        logout, // Cung cấp hàm logout cho context
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

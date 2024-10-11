import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { supabase } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import database, { accountAllocationCollection, accountsCollection, allocationsCollection } from '../db';
import { mySync } from '../db/sync';

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
    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session) {
        await mySync();
      }
    });
  
    return () => {
      authListener.subscription.unsubscribe(); // Cleanup khi unmount
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setSession(null); // Cập nhật lại session sau khi đăng xuất

    await database.write(async () => {
      // Xóa dữ liệu trong bảng accounts
      const accounts = await accountsCollection.query().fetch();
      for (const account of accounts) {
        await account.destroyPermanently(); // Sử dụng destroyPermanently thay vì delete
      }
  
      // Xóa dữ liệu trong bảng allocations
      const allocations = await allocationsCollection.query().fetch();
      for (const allocation of allocations) {
        await allocation.destroyPermanently(); // Sử dụng destroyPermanently thay vì delete
      }
  
      // Xóa dữ liệu trong bảng account_allocations
      const accountAllocations = await accountAllocationCollection.query().fetch();
      for (const accountAllocation of accountAllocations) {
        await accountAllocation.destroyPermanently(); // Sử dụng destroyPermanently thay vì delete
      }
    });
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

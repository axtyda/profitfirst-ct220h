import { Redirect, Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../../providers/AuthProvider';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function TabsLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href={'/login'} />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#f53f5e', // dinh nghia mau
      }}
    >
      <Tabs.Screen
        name="allocations"
        options={{
          title: 'Allocations',
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="account-tree" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="accounts"
        options={{
          title: 'Accounts',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="account-balance-wallet" size={size} color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="session"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <FontAwesome6 name="user-large" size={20} color={color} />),
        }}
      />
    </Tabs>
  );
}
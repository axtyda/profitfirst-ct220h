import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zlwkgucrzmyqxkzfggxe.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpsd2tndWNyem15cXhremZnZ3hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc1ODM3MzcsImV4cCI6MjA0MzE1OTczN30.0eqGQfTMFtgHF6bQUuQmU8Gl0uibp4xiC2sXBwcfLpg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

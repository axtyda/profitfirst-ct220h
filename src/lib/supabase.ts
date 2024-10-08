import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hxfmmnygimrhpotinoyh.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4Zm1tbnlnaW1yaHBvdGlub3loIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcyNTgzODYsImV4cCI6MjA0MjgzNDM4Nn0.gfjLRbP4BEGcwGf-sM0bdy4ze7VEieujFH7net8n95U';
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

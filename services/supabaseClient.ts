import { createClient } from '@supabase/supabase-js';

// This file initializes the Supabase client using credentials for your project.
// It uses an ES module import, which is managed by the importmap in index.html.

// Use the credentials you provided to connect to your Supabase project.
const supabaseUrl = 'https://twiojujlmgannxhmrbou.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3aW9qdWpsbWdhbm54aG1yYm91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1ODQxMTUsImV4cCI6MjA3NTE2MDExNX0.ERRP5GVChsoxxUbVgWP7bRXRUUyFSFYYtiLoLWOPuGE'; 

/**
 * Initializes and exports the Supabase client.
 * This client is used throughout the application to interact with the database,
 * including authentication, reading courses, etc.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
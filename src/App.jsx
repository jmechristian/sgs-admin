import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Shop from './components/shop';
import Login from './components/Login';
import Layout from './components/layout/Layout';

const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [isUSer, setIsUser] = useState(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setIsUser(true);
      }
      // console.log('session', session);
    });
  });
  return isUSer ? (
    <Layout>
      <Shop />
    </Layout>
  ) : (
    <Login />
  );
}

export default App;

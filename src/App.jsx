import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import SharedLayout from "./components/SharedLayout.jsx";
import { AuthProvider } from "./contexts/AuthContext";
import { SupabaseProvider } from './integrations/supabase/index.js';

function App() {
  return (
    <Router>
      <SupabaseProvider>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<SharedLayout />}>
              <Route exact path="/" element={<Index />} />
            </Route>
          </Routes>
        </AuthProvider>
      </SupabaseProvider>
    </Router>
  );
}

export default App;
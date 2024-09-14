import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import SharedLayout from "./components/SharedLayout.jsx";
import {
  SupabaseAuthProvider,
  useSupabaseAuth,
} from "./integrations/supabase/auth.jsx";
import Settings from "./pages/Setting.jsx";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }) => {
  const { session, getAuthenticatorAssuranceLevel } = useSupabaseAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (session) {
        const { data: aal } = await getAuthenticatorAssuranceLevel();
        setIsAuthenticated(aal.currentLevel === "aal2");
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, [session, getAuthenticatorAssuranceLevel]);

  if (isLoading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function AppContent() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
        }
      >
        <Route exact path="/" element={<Index />} />
        <Route exact path="/setting" element={<Settings />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <SupabaseAuthProvider>
          <AppContent />
        </SupabaseAuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

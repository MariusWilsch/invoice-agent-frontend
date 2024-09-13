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
  const { session } = useSupabaseAuth();
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function AppContent() {
  const { session, loading } = useSupabaseAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
    }
  }, [loading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          session && isOtpVerified ? (
            <Navigate to="/" replace />
          ) : (
            <Login setIsOtpVerified={setIsOtpVerified} />
          )
        } 
      />
      <Route path="/signup" element={session ? <Navigate to="/" replace /> : <SignUp />} />
      <Route
        element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
        }
      >
        <Route 
          exact 
          path="/" 
          element={
            session && isOtpVerified ? (
              <Index />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
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
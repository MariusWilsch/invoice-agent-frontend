import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import SharedLayout from "./components/SharedLayout.jsx";
import { SupabaseAuthProvider, useSupabaseAuth } from "./integrations/supabase/auth.jsx";

const ProtectedRoute = ({ children }) => {
  const { session } = useSupabaseAuth();
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function AppContent() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route element={
        <ProtectedRoute>
          <SharedLayout />
        </ProtectedRoute>
      }>
        <Route exact path="/" element={<Index />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <SupabaseAuthProvider>
        <AppContent />
      </SupabaseAuthProvider>
    </Router>
  );
}

export default App;
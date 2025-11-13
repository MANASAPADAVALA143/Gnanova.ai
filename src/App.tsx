import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ClientProvider } from './contexts/ClientContext';
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Content } from './pages/Content';
import { ContentDetail } from './pages/ContentDetail';
import { Calendar } from './pages/Calendar';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';
import { SrikanthDashboard } from './pages/client/SrikanthDashboard';
import { ToastContainer } from './components/Toast';
import { AIChat } from './components/AIChat';
import { useToast } from './hooks/useToast';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

function AppContent() {
  const toast = useToast();

  return (
    <>
      <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
      <AIChat />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/content"
          element={
            <ProtectedRoute>
              <Content />
            </ProtectedRoute>
          }
        />
        <Route
          path="/content/:id"
          element={
            <ProtectedRoute>
              <ContentDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/srikanth-academy/dashboard"
          element={
            <ProtectedRoute>
              <SrikanthDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/srikanth-academy/*"
          element={
            <ProtectedRoute>
              <SrikanthDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ClientProvider>
          <AppContent />
        </ClientProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AppProvider, useApp } from './context/AppContext';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import BusinessRecognitionScreen from './screens/BusinessRecognitionScreen';
import ExperiencesScreen from './screens/ExperiencesScreen';
import ExperienceDetailScreen from './screens/ExperienceDetailScreen';
import CommunityScreen from './screens/CommunityScreen';
import ProfileScreen from './screens/ProfileScreen';
import MerchDetailScreen from './screens/MerchDetailScreen';
import RedeemScreen from './screens/RedeemScreen';

function ProtectedRoute({ children }) {
  const { state } = useApp();
  if (!state.isAuthenticated) return <Navigate to="/" replace />;
  return children;
}

function AppRoutes() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomeScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/business/:id"
          element={
            <ProtectedRoute>
              <BusinessRecognitionScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/experiences"
          element={
            <ProtectedRoute>
              <ExperiencesScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/experience/:id"
          element={
            <ProtectedRoute>
              <ExperienceDetailScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/community"
          element={
            <ProtectedRoute>
              <CommunityScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfileScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/merch/:id"
          element={
            <ProtectedRoute>
              <MerchDetailScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/redeem/:id"
          element={
            <ProtectedRoute>
              <RedeemScreen />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/Analog-BC">
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}

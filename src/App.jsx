import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import InfluencerDashboard from './pages/influencer/InfluencerDashboard';
import InfluencerProfile from './pages/influencer/InfluencerProfile';
import InfluencerPortfolio from './pages/influencer/InfluencerPortfolio';
import BrandDashboard from './pages/brand/BrandDashboard';
import BrandProfile from './pages/brand/BrandProfile';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes within main layout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />

            {/* Influencer routes */}
            <Route
              path="/influencer/dashboard"
              element={
                <ProtectedRoute allowedRole="influencer">
                  <InfluencerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/influencer/profile"
              element={
                <ProtectedRoute allowedRole="influencer">
                  <InfluencerProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/influencer/portfolio"
              element={
                <ProtectedRoute allowedRole="influencer">
                  <InfluencerPortfolio />
                </ProtectedRoute>
              }
            />

            {/* Brand routes */}
            <Route
              path="/brand/dashboard"
              element={
                <ProtectedRoute allowedRole="brand">
                  <BrandDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/brand/profile"
              element={
                <ProtectedRoute allowedRole="brand">
                  <BrandProfile />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Auth routes without main layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

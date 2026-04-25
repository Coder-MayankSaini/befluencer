import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import BrandDashboard from './pages/BrandDashboard';
import InfluencerDashboard from './pages/InfluencerDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';

const getLoggedInUser = () => {
  const userData = localStorage.getItem('loggedInUser');
  return userData ? JSON.parse(userData) : null;
};

const HomeOrDashboard = () => {
  const user = getLoggedInUser();

  if (user?.userType === 'brand') {
    return <Navigate to="/brand" replace />;
  }

  if (user?.userType === 'influencer') {
    return <Navigate to="/influencer" replace />;
  }

  return <Home />;
};

const ProtectedDashboard = ({ userType, children }) => {
  const user = getLoggedInUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.userType !== userType) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeOrDashboard />} />
          <Route
            path="brand"
            element={
              <ProtectedDashboard userType="brand">
                <BrandDashboard />
              </ProtectedDashboard>
            }
          />
          <Route
            path="influencer"
            element={
              <ProtectedDashboard userType="influencer">
                <InfluencerDashboard />
              </ProtectedDashboard>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

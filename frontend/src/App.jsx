import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/User/LoginPage';
import SignupPage from './pages/User/SignupPage';
import HomePage from './pages/User/HomePage';
import UserProfile from './pages/User/UserProfile';
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'




function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* User routes*/}
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        {/* <Route path="/profile" element={<UserProfile />} /> */}

         <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } 
        />

          {/* Admin routes */}
        {/* <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        /> */}

      </Routes>
    </Router>
  );
}

export default App;

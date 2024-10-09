import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';


import AdminLogin from './components/admin/adminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminHome from './pages/AdminHome';
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* User routes*/}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

          {/* Admin routes */}
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;

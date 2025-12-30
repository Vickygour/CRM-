import { Navigate, Outlet } from 'react-router-dom';

const AdminProtectedRoute = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // ❌ Not logged in
  if (!token || !user) {
    return <Navigate to="/admin/login" replace />;
  }

  // ❌ Logged in but not admin
  if (user.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  // ✅ Admin allowed
  return <Outlet />;
};

export default AdminProtectedRoute;

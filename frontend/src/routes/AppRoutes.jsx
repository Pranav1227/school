import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/Login';
import AdminDashboard from '../components/AdminDashboard';
import StudentProfile from '../components/StudentProfile';
import ProtectedRoute from '../components/ProtectedRoute';

/**
 * Main Application Routes with Role-Based Access Control
 * - /login: Public login page (redirects to dashboard if already authenticated)
 * - /admin: Admin dashboard (accessible only by admin users)
 * - /student: Student profile (accessible only by student users)
 * - /: Automatic redirect based on authentication and role
 * - *: Fallback to /
 */
export default function AppRoutes({ usersData, currentUser, onLoginSuccess }) {
  return (
    <Routes>
      {/* Public Login Route */}
      <Route
        path="/login"
        element={
          currentUser ? (
            currentUser['User type'] === 'admin' ? (
              <Navigate to="/admin" replace />
            ) : (
              <Navigate to="/student" replace />
            )
          ) : (
            <Login users={usersData} onLoginSuccess={onLoginSuccess} />
          )
        }
      />

      {/* Admin Route (Protected for Admin role only) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute currentUser={currentUser} allowedRoles={['admin']}>
            <AdminDashboard allUsers={usersData} />
          </ProtectedRoute>
        }
      />

      {/* Student Route (Protected for Student role only) */}
      <Route
        path="/student"
        element={
          <ProtectedRoute currentUser={currentUser} allowedRoles={['student']}>
            <StudentProfile student={currentUser} />
          </ProtectedRoute>
        }
      />

      {/* Root Path - Smart redirect based on login status and role */}
      <Route
        path="/"
        element={
          !currentUser ? (
            <Navigate to="/login" replace />
          ) : currentUser['User type'] === 'admin' ? (
            <Navigate to="/admin" replace />
          ) : (
            <Navigate to="/student" replace />
          )
        }
      />

      {/* Wildcard / 404 Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

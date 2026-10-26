import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ currentUser, allowedRoles, children }) {
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser['User type'])) {
    if (currentUser['User type'] === 'admin') {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/student" replace />;
    }
  }

  return children;
}

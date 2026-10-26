import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usersData from './data/users.json';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  const navigate = useNavigate();

  // Store currently authenticated user with lazy initialization from localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('school_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Handle successful login
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('school_current_user', JSON.stringify(user));
    } catch (e) {
      console.warn('Could not save user to localStorage', e);
    }

    // Role-based route navigation on successful login
    if (user['User type'] === 'admin') {
      navigate('/admin');
    } else {
      navigate('/student');
    }
  };

  // Handle user logout
  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('school_current_user');
    } catch (e) {
      console.warn('Could not remove user from localStorage', e);
    }
    navigate('/login');
  };

  return (
    <div className="app-layout">
      {/* If user is logged in, show Navbar */}
      {currentUser && (
        <Navbar currentUser={currentUser} onLogout={handleLogout} />
      )}

      {/* Main Content Area controlled by AppRoutes */}
      <main className="main-content">
        <AppRoutes
          usersData={usersData}
          currentUser={currentUser}
          onLoginSuccess={handleLoginSuccess}
        />
      </main>

      {/* Footer */}
      {/* <footer className="app-footer">
        <p>School User Data Application</p>
      </footer> */}
    </div>
  );
}

export default App;

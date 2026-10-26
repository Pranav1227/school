import { School, LogOut } from 'lucide-react';

export default function Navbar({ currentUser, onLogout }) {
  if (!currentUser) return null;

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="brand-icon-wrapper">
            <School className="brand-icon" size={26} />
          </div>
          <div>
            <span className="brand-title">School Portal</span>
            <span className="brand-subtitle">School Management System</span>
          </div>
        </div>

        <div className="navbar-user">
          <div className="user-info">
            <div className="user-name-wrapper">
              <span className="user-name">{currentUser.UserName}</span>
            </div>
            <span className="user-email">{currentUser.Email}</span>
          </div>

          <button
            type="button"
            className="btn btn-logout"
            onClick={onLogout}
            title="Log out"
            id="logout-btn"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}

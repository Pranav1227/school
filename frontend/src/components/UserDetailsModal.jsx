import { useEffect } from 'react';
import { X, Mail, BookOpen, MapPin, Globe, GraduationCap, Shield, Key } from 'lucide-react';
import { decryptPassword } from '../utils/crypto';

export default function UserDetailsModal({ user, onClose }) {
  useEffect(() => {
    if (!user) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [user, onClose]);

  if (!user) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      onWheel={(e) => {
        if (e.target === e.currentTarget) {
          e.preventDefault();
        }
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-wrapper">
            <div className="modal-avatar">
              {user.UserName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="modal-user-name">{user.UserName}</h3>
              <span className="badge badge-student">
                <GraduationCap size={13} style={{ marginRight: '4px' }} />
                Student ({user.Standard} Standard)
              </span>
            </div>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="detail-grid">
            <div className="detail-item">
              <div className="detail-label">
                <Mail size={16} />
                <span>Email Address</span>
              </div>
              <div className="detail-value">{user.Email}</div>
            </div>

            {/* Standard / Class */}
            <div className="detail-item">
              <div className="detail-label">
                <GraduationCap size={16} />
                <span>Standard / Grade</span>
              </div>
              <div className="detail-value">{user.Standard} Standard</div>
            </div>

            {/* Language */}
            <div className="detail-item">
              <div className="detail-label">
                <Globe size={16} />
                <span>Language</span>
              </div>
              <div className="detail-value">{user.Language}</div>
            </div>

            {/* User Type */}
            <div className="detail-item">
              <div className="detail-label">
                <Shield size={16} />
                <span>Account Role</span>
              </div>
              <div className="detail-value" style={{ textTransform: 'capitalize' }}>
                {user['User type']}
              </div>
            </div>

            {/* Address */}
            <div className="detail-item detail-full-width">
              <div className="detail-label">
                <MapPin size={16} />
                <span>Residential Address</span>
              </div>
              <div className="detail-value">{user.Address}</div>
            </div>

            {/* Subjects */}
            <div className="detail-item detail-full-width">
              <div className="detail-label">
                <BookOpen size={16} />
                <span>Enrolled Subjects</span>
              </div>
              <div className="subjects-tags-container">
                {Array.isArray(user.Subjects) && user.Subjects.length > 0 ? (
                  user.Subjects.map((subject, idx) => (
                    <span key={idx} className="subject-tag">
                      {subject}
                    </span>
                  ))
                ) : (
                  <span className="text-muted">No subjects assigned</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

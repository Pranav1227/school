import { Mail, BookOpen, MapPin, Globe, GraduationCap, Key } from 'lucide-react';
import { decryptPassword } from '../utils/crypto';

export default function StudentProfile({ student }) {
  if (!student) return null;

  return (
    <div className="student-portal-container">
      {/* Student Welcome Banner */}
      <div className="student-hero-banner">
        <div className="student-hero-content">
          <div className="student-hero-avatar">
            {student.UserName.charAt(0).toUpperCase()}
          </div>
          <div className="student-hero-info">
            <div className="hero-tag-row">
              <span className="badge badge-student">
                <GraduationCap size={14} style={{ marginRight: '4px' }} />
                Student Portal
              </span>
              <span className="badge badge-standard">{student.Standard} Standard</span>
            </div>
            <h1 className="student-hero-name">Welcome back, {student.UserName}!</h1>
            <p className="student-hero-desc">
              Here are your academic registration details, assigned curriculum subjects, and contact information.
            </p>
          </div>
        </div>
      </div>

      {/* Profile Details Sections */}
      <div className="student-details-grid">
        {/* Card 1: Academic Information */}
        <div className="profile-card">
          <div className="card-header">
            <div className="card-header-icon bg-indigo">
              <GraduationCap size={20} color="#6366f1" />
            </div>
            <h3 className="card-title">Academic Details</h3>
          </div>
          <div className="card-body">
            <div className="info-row">
              <span className="info-label">Full Name</span>
              <span className="info-value font-semibold">{student.UserName}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Current Standard</span>
              <span className="info-value">
                <span className="badge badge-standard">{student.Standard} Grade</span>
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Account Role</span>
              <span className="info-value" style={{ textTransform: 'capitalize' }}>
                {student['User type']}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Enrolled Subjects Count</span>
              <span className="info-value font-semibold">
                {Array.isArray(student.Subjects) ? student.Subjects.length : 0} Subjects
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Contact & Language Information */}
        <div className="profile-card">
          <div className="card-header">
            <div className="card-header-icon bg-emerald">
              <Globe size={20} color="#10b981" />
            </div>
            <h3 className="card-title">Personal & Contact Info</h3>
          </div>
          <div className="card-body">
            <div className="info-row">
              <span className="info-label">Email ID</span>
              <span className="info-value">
                <a href={`mailto:${student.Email}`} className="contact-link">
                  <Mail size={14} style={{ marginRight: '6px' }} />
                  {student.Email}
                </a>
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Primary Language</span>
              <span className="info-value">{student.Language}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Residential Address</span>
              <span className="info-value address-value">
                <MapPin size={14} style={{ marginRight: '6px', flexShrink: 0 }} />
                <span>{student.Address}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Enrolled Subjects */}
        <div className="profile-card">
          <div className="card-header">
            <div className="card-header-icon bg-amber">
              <BookOpen size={20} color="#f59e0b" />
            </div>
            <h3 className="card-title">Curriculum & Subjects</h3>
          </div>
          <div className="card-body">
            <div className="student-subjects-list">
              {Array.isArray(student.Subjects) && student.Subjects.length > 0 ? (
                student.Subjects.map((subject, index) => (
                  <div key={index} className="student-subject-box">
                    <div className="subject-box-icon">
                      <BookOpen size={16} />
                    </div>
                    <div className="subject-box-content">
                      <span className="subject-title">{subject}</span>
                      <span className="subject-standard-tag">{student.Standard} Curriculum</span>
                    </div>
                  </div>
                ))
              ) : (
                <span className="text-muted">No subjects assigned currently.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

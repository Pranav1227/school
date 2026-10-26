import { useState, useMemo } from 'react';
import { Search, BookOpen, Eye, Filter, RefreshCw, GraduationCap } from 'lucide-react';
import UserDetailsModal from './UserDetailsModal';

export default function AdminDashboard({ allUsers }) {
  const [searchTermName, setSearchTermName] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedStudentForModal, setSelectedStudentForModal] = useState(null);

  const students = useMemo(() => {
    return allUsers.filter((u) => u['User type'] === 'student');
  }, [allUsers]);

  const allUniqueSubjects = useMemo(() => {
    const subjectsSet = new Set();
    students.forEach((student) => {
      if (Array.isArray(student.Subjects)) {
        student.Subjects.forEach((sub) => subjectsSet.add(sub));
      }
    });
    return Array.from(subjectsSet).sort();
  }, [students]);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const nameMatch = student.UserName.toLowerCase().includes(
        searchTermName.trim().toLowerCase()
      );

      let subjectMatch = true;
      if (selectedSubject) {
        subjectMatch = Array.isArray(student.Subjects) &&
          student.Subjects.some(
            (sub) => sub.toLowerCase().includes(selectedSubject.trim().toLowerCase())
          );
      }

      return nameMatch && subjectMatch;
    });
  }, [students, searchTermName, selectedSubject]);

  // Reset filters
  const handleResetFilters = () => {
    setSearchTermName('');
    setSelectedSubject('');
  };

  const hasActiveFilters = searchTermName !== '' || selectedSubject !== '';

  return (
    <div className="admin-container">
      {/* Top Banner */}
      <div className="admin-header">
        <div>
          <h2 className="section-title">Student Directory</h2>
          <p className="section-description">
            Administrative overview of all registered students, their enrolled subjects, and academic profiles.
          </p>
        </div>
        <div className="admin-stat-pill">
          <GraduationCap size={20} color="#6366f1" />
          <span>
            Total Students: <strong>{students.length}</strong>
          </span>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="filter-card">
        <div className="filter-grid">
          {/* Search by Name */}
          <div className="filter-item">
            <label htmlFor="search-name-input" className="filter-label">
              <Search size={16} />
              <span>Search by Student Name</span>
            </label>
            <div className="input-wrapper">
              <input
                id="search-name-input"
                type="text"
                className="form-input"
                placeholder="Type a student name (e.g. Rahul, Priya)..."
                value={searchTermName}
                onChange={(e) => setSearchTermName(e.target.value)}
              />
              {searchTermName && (
                <button
                  type="button"
                  className="clear-input-btn"
                  onClick={() => setSearchTermName('')}
                  title="Clear name search"
                >
                  &times;
                </button>
              )}
            </div>
          </div>

          {/* Search by Subject */}
          <div className="filter-item">
            <label htmlFor="search-subject-select" className="filter-label">
              <BookOpen size={16} />
              <span>Filter by Subject</span>
            </label>
            <div className="input-wrapper">
              <select
                id="search-subject-select"
                className="form-select"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="">All Subjects</option>
                {allUniqueSubjects.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Reset button if filter is active */}
          {hasActiveFilters && (
            <div className="filter-action-item">
              <button
                type="button"
                className="btn btn-secondary btn-reset"
                onClick={handleResetFilters}
              >
                <RefreshCw size={15} />
                <span>Reset Filters</span>
              </button>
            </div>
          )}
        </div>

        {/* Active filter summary */}
        <div className="filter-summary">
          <span>
            Showing <strong>{filteredStudents.length}</strong> of <strong>{students.length}</strong> students
          </span>
          {hasActiveFilters && (
            <span className="active-filter-tag">
              Filters active: {searchTermName ? `Name: "${searchTermName}"` : ''}
              {searchTermName && selectedSubject ? ' & ' : ''}
              {selectedSubject ? `Subject: "${selectedSubject}"` : ''}
            </span>
          )}
        </div>
      </div>

      {/* Student List / Table */}
      <div className="table-responsive-container">
        <table className="students-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Email ID</th>
              <th>Standard</th>
              <th>Subjects</th>
              <th style={{ textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student, index) => (
                <tr key={index} className="table-row-hover">
                  {/* Name with initials avatar */}
                  <td>
                    <div className="student-profile-cell">
                      <div className="avatar-circle">
                        {student.UserName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <span className="student-name-text">{student.UserName}</span>
                        <span className="student-lang-subtext">{student.Language}</span>
                      </div>
                    </div>
                  </td>

                  {/* Email ID */}
                  <td>
                    <span className="student-email-text">{student.Email}</span>
                  </td>

                  {/* Standard */}
                  <td>
                    <span className="badge badge-standard">{student.Standard} Standard</span>
                  </td>

                  {/* Subjects list */}
                  <td>
                    <div className="subjects-chips-group">
                      {Array.isArray(student.Subjects) && student.Subjects.map((subject, sIdx) => {
                        const isMatch = selectedSubject &&
                          subject.toLowerCase().includes(selectedSubject.toLowerCase());
                        return (
                          <span
                            key={sIdx}
                            className={`subject-chip ${isMatch ? 'subject-chip-highlight' : ''}`}
                          >
                            {subject}
                          </span>
                        );
                      })}
                    </div>
                  </td>

                  {/* Details Button */}
                  <td style={{ textAlign: 'center' }}>
                    <button
                      type="button"
                      className="btn btn-details"
                      onClick={() => setSelectedStudentForModal(student)}
                      id={`details-btn-${index}`}
                      title="View complete user details"
                    >
                      <Eye size={15} />
                      <span>Details</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-state-cell">
                  <div className="empty-state-wrapper">
                    <Filter size={36} color="#94a3b8" />
                    <h4>No Students Match Your Criteria</h4>
                    <p>Try adjusting your search by name or selecting a different subject filter.</p>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleResetFilters}
                      style={{ marginTop: '12px' }}
                    >
                      Clear All Filters
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* User Details Modal Popup */}
      {selectedStudentForModal && (
        <UserDetailsModal
          user={selectedStudentForModal}
          onClose={() => setSelectedStudentForModal(null)}
        />
      )}
    </div>
  );
}

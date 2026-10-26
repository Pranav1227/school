import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, School, AlertCircle, ArrowRight, ShieldCheck, GraduationCap } from 'lucide-react';
import { verifyPassword } from '../utils/crypto';

export default function Login({ users, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');

  const handleEmailChange = (e) => {
    let value = e.target.value.toLowerCase();

    if (value.length > 50) {
      value = value.slice(0, 50);
    }

    const hasSpecialChars = /[^a-z0-9@.]/.test(value);
    if (hasSpecialChars) {
      setErrors((prev) => ({
        ...prev,
        email: 'Special characters are not allowed in email. Only letters, numbers, @ and . are permitted.'
      }));
      value = value.replace(/[^a-z0-9@.]/g, '');
    } else if (errors.email) {
      setErrors((prev) => ({ ...prev, email: '' }));
    }

    setEmail(value);
    if (authError) setAuthError('');
  };

  const validateForm = () => {
    const newErrors = {};
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      newErrors.email = 'Email address is required.';
    } else if (trimmedEmail.length > 50) {
      newErrors.email = 'Email address cannot exceed 50 characters.';
    } else if (!trimmedEmail.includes('@')) {
      newErrors.email = 'Email address must contain the @ symbol.';
    } else if (/[^a-z0-9@.]/.test(trimmedEmail)) {
      newErrors.email = 'Special characters are not allowed in email. Only letters, numbers, @ and . are permitted.';
    } else {
      const emailRegex = /^[a-z0-9]+@[a-z0-9]+(\.[a-z0-9]+)+$/;
      if (!emailRegex.test(trimmedEmail)) {
        newErrors.email = 'Please enter a valid email format (e.g. user@gmail.com).';
      }
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthError('');

    if (!validateForm()) {
      return;
    }

    const trimmedEmail = email.trim().toLowerCase();

    const matchedUser = users.find(
      (u) => u.Email.toLowerCase() === trimmedEmail
    );

    if (!matchedUser) {
      setAuthError('No account found with this email address.');
      return;
    }

    const isPasswordValid = verifyPassword(password, matchedUser.Password);

    if (!isPasswordValid) {
      setAuthError('Incorrect password. Please try again.');
      return;
    }

    onLoginSuccess(matchedUser);
  };

  const handleQuickLogin = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrors({});
    setAuthError('');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Brand header */}
        <div className="login-header">
          <div className="login-logo-circle">
            <School size={36} color="#6366f1" />
          </div>
          <h1 className="login-title">School Portal Login</h1>
          <p className="login-subtitle">
            Enter your credentials to access your administrative or student dashboard
          </p>
        </div>

        {/* Global auth error */}
        {authError && (
          <div className="alert alert-error" role="alert">
            <AlertCircle size={18} />
            <span>{authError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          {/* Email Field */}
          <div className="form-group">
            <div className="form-label-row">
              <label htmlFor="email-input" className="form-label">
                Email Address
              </label>
              <span className="char-count-hint">
                {email.length}/50
              </span>
            </div>
            <div className={`input-wrapper ${errors.email ? 'input-error' : ''}`}>
              <Mail className="input-icon" size={18} />
              <input
                id="email-input"
                type="email"
                maxLength={50}
                className="form-input"
                placeholder="e.g. admin@gmail.com"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password-input" className="form-label">
              Password
            </label>
            <div className={`input-wrapper ${errors.password ? 'input-error' : ''}`}>
              <Lock className="input-icon" size={18} />
              <input
                id="password-input"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: '' });
                  if (authError) setAuthError('');
                }}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary btn-block" id="login-submit-btn">
            <span>Sign In</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Quick Demo Access Bar */}
        <div className="demo-credentials-section">
          <div className="demo-title">
            <span>Quick Demo Credentials</span>
          </div>
          <div className="demo-buttons-grid">
            <button
              type="button"
              className="demo-btn demo-btn-admin"
              onClick={() => handleQuickLogin('admin@gmail.com', 'admin@123')}
            >
              <ShieldCheck size={16} />
              <div className="demo-btn-text">
                <strong>Admin Login</strong>
                <small>admin@gmail.com</small>
              </div>
            </button>

            <button
              type="button"
              className="demo-btn demo-btn-student"
              onClick={() => handleQuickLogin('pranav@gmail.com', 'pranav@123')}
            >
              <GraduationCap size={16} />
              <div className="demo-btn-text">
                <strong>Student Login</strong>
                <small>pranav@gmail.com</small>
              </div>
            </button>
          </div>
          <div className="demo-password-hint">
            <span>Admin: <code>admin@123</code> &bull; Student: <code>[name]@123</code> (e.g. <code>pranav@123</code>, <code>rahul@123</code>)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

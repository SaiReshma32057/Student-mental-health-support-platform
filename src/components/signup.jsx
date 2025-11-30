import React, { useState } from 'react';
import './auth.css';

console.log('Signup component loaded successfully!');

const Signup = ({ onSwitchToLogin, onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    userType: 'student', 
    password: '',
    confirmPassword: '',
    studentId: '',
    course: '',
    semester: '',
    adminCode: '',
    department: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm password';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.userType === 'student') {
      if (!formData.studentId.trim()) newErrors.studentId = 'Student ID is required';
      if (!formData.course.trim()) newErrors.course = 'Course is required';
    }

    if (formData.userType === 'admin') {
      if (!formData.adminCode.trim()) newErrors.adminCode = 'Admin code is required';
      if (!formData.department.trim()) newErrors.department = 'Department is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✨ BACKEND CONNECTED SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log("Signup Attempt:", formData);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      alert(`Account created successfully! Welcome ${formData.firstName}`);
      if (onSignupSuccess) onSignupSuccess();
      if (onSwitchToLogin) onSwitchToLogin();

    } catch (err) {
      console.error(err);
      alert("Server error during signup.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Your Account</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Account Type</label>
            <div className="user-type-selector">
              <button
                type="button"
                className={`user-type-btn ${formData.userType === 'student' ? 'active' : ''}`}
                onClick={() => setFormData({...formData, userType: 'student'})}
              >
                Student
              </button>
              <button
                type="button"
                className={`user-type-btn ${formData.userType === 'admin' ? 'active' : ''}`}
                onClick={() => setFormData({...formData, userType: 'admin'})}
              >
                Administrator
              </button>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input type="text" id="firstName" name="firstName" value={formData.firstName}
                onChange={handleChange} required className={errors.firstName ? 'error' : ''} />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="middleName">Middle Name</label>
              <input type="text" id="middleName" name="middleName" value={formData.middleName} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input type="text" id="lastName" name="lastName" value={formData.lastName}
              onChange={handleChange} required className={errors.lastName ? 'error' : ''} />
            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input type="email" id="email" name="email" value={formData.email}
                onChange={handleChange} required className={errors.email ? 'error' : ''} />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number *</label>
              <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber}
                onChange={handleChange} required className={errors.phoneNumber ? 'error' : ''} />
              {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
            </div>
          </div>

          {formData.userType === 'student' && (
            <div className="user-type-fields">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="studentId">Student ID *</label>
                  <input type="text" id="studentId" name="studentId" value={formData.studentId}
                    onChange={handleChange} required className={errors.studentId ? 'error' : ''} />
                  {errors.studentId && <span className="error-message">{errors.studentId}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="semester">Semester</label>
                  <select id="semester" name="semester" value={formData.semester} onChange={handleChange}>
                    <option value="">Select Semester</option>
                    <option value="1">1st Semester</option>
                    <option value="2">2nd Semester</option>
                    <option value="3">3rd Semester</option>
                    <option value="4">4th Semester</option>
                    <option value="5">5th Semester</option>
                    <option value="6">6th Semester</option>
                    <option value="7">7th Semester</option>
                    <option value="8">8th Semester</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="course">Course/Program *</label>
                <input type="text" id="course" name="course" value={formData.course}
                  onChange={handleChange} required className={errors.course ? 'error' : ''} />
                {errors.course && <span className="error-message">{errors.course}</span>}
              </div>
            </div>
          )}

          {formData.userType === 'admin' && (
            <div className="user-type-fields">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="adminCode">Admin Code *</label>
                  <input type="password" id="adminCode" name="adminCode" value={formData.adminCode}
                    onChange={handleChange} required className={errors.adminCode ? 'error' : ''} />
                  {errors.adminCode && <span className="error-message">{errors.adminCode}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="department">Department *</label>
                  <input type="text" id="department" name="department" value={formData.department}
                    onChange={handleChange} required className={errors.department ? 'error' : ''} />
                  {errors.department && <span className="error-message">{errors.department}</span>}
                </div>
              </div>
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input type="password" id="password" name="password" value={formData.password}
                onChange={handleChange} required className={errors.password ? 'error' : ''} />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password *</label>
              <input type="password" id="confirmPassword" name="confirmPassword"
                value={formData.confirmPassword} onChange={handleChange} required
                className={errors.confirmPassword ? 'error' : ''} />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
          </div>

          <button type="submit" className="auth-submit-btn">Create Account</button>
        </form>

        <div className="auth-switch">
          <p>Already have an account? 
            <span className="switch-link" onClick={onSwitchToLogin}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

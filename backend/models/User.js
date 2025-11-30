const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minlength: [2, 'First name must be at least 2 characters'],
    },
    middleName: {
      type: String,
      trim: true,
      default: ''
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      minlength: [2, 'Last name must be at least 2 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [/.+@.+\..+/, 'Please enter a valid email'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    userType: {
      type: String,
      required: [true, 'User type is required'],
      enum: ['student', 'admin'],
      default: 'student'
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    
    // Student-specific fields
    studentId: {
      type: String,
      required: function() { return this.userType === 'student'; }
    },
    course: {
      type: String,
      required: function() { return this.userType === 'student'; }
    },
    semester: {
      type: String,
      default: ''
    },
    
    // Admin-specific fields
    adminCode: {
      type: String,
      required: function() { return this.userType === 'admin'; }
    },
    department: {
      type: String,
      required: function() { return this.userType === 'admin'; }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router(); // ⭐ ADD THIS LINE - YOU'RE MISSING IT!

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    console.log("Received registration data:", req.body);

    const { 
      firstName, 
      middleName, 
      lastName, 
      email, 
      phoneNumber, 
      userType, 
      password, 
      confirmPassword,
      studentId, 
      course, 
      semester, 
      adminCode, 
      department 
    } = req.body;

    // Enhanced validation matching frontend
    if (!firstName || !lastName || !email || !phoneNumber || !password || !userType) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    // Password length check
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Password match check
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // User type specific validation
    if (userType === 'student') {
      if (!studentId || !course) {
        return res.status(400).json({ message: 'Student ID and Course are required for students' });
      }
    }

    if (userType === 'admin') {
      if (!adminCode || !department) {
        return res.status(400).json({ message: 'Admin code and Department are required for administrators' });
      }
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user object with all fields
    const userData = {
      firstName,
      middleName: middleName || '',
      lastName,
      email,
      phoneNumber,
      userType,
      password: hashedPassword,
      ...(userType === 'student' && { 
        studentId, 
        course, 
        semester: semester || '' 
      }),
      ...(userType === 'admin' && { 
        adminCode, 
        department 
      })
    };

    // Create user in database
    const newUser = await User.create(userData);

    // Create token
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        userType: newUser.userType,
      },
      token,
    });

  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType,
      },
      token,
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; // ⭐ MAKE SURE THIS EXPORT IS AT THE END
// // /controllers/authController.js
// const supabase = require('../services/supabaseClient'); // Ensure Supabase client is configured

// // Handle login request
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password are required' });
//   }

//   try {
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) {
//       return res.status(401).json({ message: 'Invalid credentials', error });
//     }

//     return res.status(200).json({ message: 'Login successful', user: data });
//   } catch (err) {
//     return res.status(500).json({ message: 'Internal server error', error: err });
//   }
// };

// module.exports = { loginUser }; // Ensure loginUser is exported


// const jwt = require('jsonwebtoken');
// const supabase = require('../services/supabaseClient'); // Ensure Supabase client is configured

// const generateToken = (userId) => {
//   const payload = { id: userId };
//   const secret = process.env.JWT_SECRET;
//   const options = { expiresIn: '1h' };

//   return jwt.sign(payload, secret, options);
// };

// // Handle login request
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password are required' });
//   }

//   try {
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) {
//       return res.status(401).json({ message: 'Invalid credentials', error });
//     }

//     const token = generateToken(data.user.id); // Generate JWT token
//     return res.status(200).json({ token, message: 'Login successful', user: data.user });
//   } catch (err) {
//     return res.status(500).json({ message: 'Internal server error', error: err });
//   }
// };

// const createProject = async (req, res) => {
//   // Example function to create a project
//   // Ensure this function is implemented properly
//   const { project_title, about } = req.body;

//   if (!project_title || !about) {
//     return res.status(400).json({ message: 'Project title and description are required' });
//   }

//   // Add your logic to create a project
//   // ...
  
//   return res.status(201).json({ message: 'Project created successfully' });
// };

// const authenticateUser = (req, res, next) => {
//   const token = req.headers['authorization']?.split(' ')[1]; // Bearer token

//   if (!token) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.id; // Set userId in the request
//     next();
//   } catch (err) {
//     return res.status(403).json({ message: 'Invalid or expired token' });
//   }
// };

// module.exports = { loginUser, createProject, authenticateUser }; // Ensure loginUser is exported

// const jwt = require('jsonwebtoken');
// const supabase = require('../services/supabaseClient'); // Ensure Supabase client is configured

// // Generate JWT token
// const generateToken = (userId) => {
//   const payload = { id: userId };
//   const secret = process.env.JWT_SECRET;
//   const options = { expiresIn: '1h' };

//   return jwt.sign(payload, secret, options);
// };

// // Handle login request
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password are required' });
//   }

//   try {
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) {
//       return res.status(401).json({ message: 'Invalid credentials', error });
//     }

//     const token = generateToken(data.user.id); // Generate JWT token
//     return res.status(200).json({ message: 'Login successful', token, user: data.user });
//   } catch (err) {
//     return res.status(500).json({ message: 'Internal server error', error: err });
//   }
// };

// module.exports = { loginUser }; // Ensure loginUser is exported



const jwt = require('jsonwebtoken');
const supabase = require('../services/supabaseClient'); // Ensure Supabase client is configured

// Generate JWT token
const generateToken = (userId) => {
  const payload = { id: userId };
  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: '1h' };

  return jwt.sign(payload, secret, options);
};

// Handle login request
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Supabase login error:', error); // Log Supabase error details for debugging
      return res.status(401).json({ message: 'Invalid credentials', error });
    }

    const token = generateToken(data.user.id); // Generate JWT token
    return res.status(200).json({ message: 'Login successful', token, user: data.user });
  } catch (err) {
    console.error('Internal server error:', err); // Log internal error details
    return res.status(500).json({ message: 'Internal server error', error: err });
  }
};

module.exports = { loginUser }; // Ensure loginUser is exported

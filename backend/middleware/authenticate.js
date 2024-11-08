// // /middleware/authenticate.js
// const supabase = require('../services/supabaseClient');

// const authenticate = async (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'Authentication token missing' });
//   }

//   const { data: { user }, error } = await supabase.auth.getUser(token);

//   if (error || !user) {
//     return res.status(401).json({ message: 'Invalid or expired token' });
//   }

//   req.user = user;
//   next();
// };

// module.exports = authenticate;


// // /middleware/authenticate.js
// const jwt = require('jsonwebtoken');

// // Middleware to authenticate the user
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

// module.exports = { authenticateUser };


// /middleware/authenticate.js
const jwt = require('jsonwebtoken');

// Middleware to authenticate the user
const authenticateUser = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer token

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store decoded token data in req.user
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { authenticateUser };


// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../modals/User'); // Adjust according to your file structure

// app.post('/api/auth/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const match = await bcrypt.compare(password, user.password); // Use bcrypt to compare password
//     if (!match) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.status(200).json({ token });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

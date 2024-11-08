// const express = require('express');
// const { loginUser } = require('../controllers/authController'); // Fixed the space

// const router = express.Router();

// // POST route to login a user
// router.post('/login', loginUser);

// module.exports = router; // Export the routes
// const express = require('express');
// const { loginUser, createProject, authenticateUser } = require('../controllers/ authController');


// const router = express.Router();

// // Login Route
// router.post('/login', loginUser);

// // Create Project Route (using authentication middleware)
// router.post('/projects', authenticateUser, createProject);

// module.exports = router;
const express = require('express');
const { loginUser } = require('../controllers/authController');

const router = express.Router();

// Login Route
router.post('/login', loginUser);

module.exports = router;





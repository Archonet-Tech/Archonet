

// // /routes/projectRoutes.js
// const express = require('express');
// const { createProject } = require('../controllers/projectController'); // Import the controller
// const { authenticateUser } = require('../middleware/authenticate'); // Import the middleware

// const router = express.Router();

// // Create Project Route (using authentication middleware)
// router.post('/', authenticateUser, createProject); // Make sure this route is mapped correctly

// module.exports = router;

// // /routes/projectRoutes.js
// const express = require('express');
// const { createProject, getProjects } = require('../controllers/projectController'); // Import both functions
// const { authenticateUser } = require('../middleware/authenticate'); // Import the middleware

// const router = express.Router();

// // Route for creating a project
// router.post('/', authenticateUser, createProject);

// // Route for fetching projects (no authentication needed)
// router.get('/', getProjects); // Add this route to fetch all projects

// module.exports = router;

const express = require('express');
const { createProject, getProjects } = require('../controllers/projectController');
const { authenticateUser } = require('../middleware/authenticate'); // Import authentication middleware

const router = express.Router();

// Route for creating a project
router.post('/', authenticateUser, createProject);

// Route for fetching projects (no authentication needed)
router.get('/', getProjects); // Add this route to fetch all projects

module.exports = router;




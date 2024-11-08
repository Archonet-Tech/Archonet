
// const express = require('express');
// const cors = require('cors');
// const authRoutes = require('./routes/authRoutes'); // Import auth routes

// const app = express();

// app.use(cors());
// app.use(express.json()); // Middleware to parse JSON

// // Mount the login route under /api/auth
// app.use('/api/auth', authRoutes);

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// /server.js
// const express = require('express');
// const cors = require('cors');
// const authRoutes = require('./routes/authRoutes'); // Import auth routes
// const projectRoutes = require('./routes/projectRoutes'); // Import project routes

// const app = express();

// // Allow CORS for specific frontend URL
// app.use(cors({
//   origin: 'http://localhost:3000', // React frontend URL
//   credentials: true
// }));

// // Middleware to parse JSON
// app.use(express.json());

// // Mount the routes
// app.use('/api/auth', authRoutes); // Auth route for login
// app.use('/api/projects', projectRoutes); // Project routes for handling projects

// // Start the server
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// const express = require('express');
// const cors = require('cors');
// const authRoutes = require('./routes/authRoutes');
// const projectRoutes = require('./routes/projectRoutes');
// const mapRoutes = require('./routes/mapRoutes'); // Import map routes
// require('dotenv').config();

// const app = express();

// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true
// }));

// app.use(express.json());

// app.use('/api/auth', authRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/map', mapRoutes); // Use map routes

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const mapRoutes = require('./routes/mapRoutes'); // Import map routes
require('dotenv').config();

const app = express();

// Check for required environment variables
if (!process.env.PORT) {
  console.error("Error: PORT is not defined in the environment variables.");
  process.exit(1); // Exit if required environment variable is missing
}

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(helmet()); // Set security headers
app.use(morgan('combined')); // HTTP request logging
app.use(express.json()); // Parse JSON bodies

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later."
});
app.use(limiter); // Apply rate limit to all routes

// Route handlers
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/map', mapRoutes); // Use map routes

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log("SIGTERM received, shutting down gracefully...");
  server.close(() => {
    console.log("Server shut down successfully.");
  });
});


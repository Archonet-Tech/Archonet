// /app.js
// app.js
const express = require('express');
const cors = require('cors');
const projectRoutes = require('./routes/projectRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;

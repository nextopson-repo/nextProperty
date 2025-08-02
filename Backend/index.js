const dotenv = require('dotenv');
dotenv.config(); // Load env vars before anything else

const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const propertyRoutes = require('./routes/property/propertyRouter');
const authRoutes = require('./routes/user/userRoutes');
const contactRoutes = require('./routes/contact/contactRoutes');

// Connect to MongoDB
connectDB();

// Initialize express app
const app = express();

// Setup CORS to allow all origins for development
app.use(cors({
  origin: '*', // Allow all origins
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Parse incoming JSON
app.use(express.json());

// Mount API routes
app.use('/api', authRoutes);
app.use('/api', propertyRoutes);
app.use('/api', contactRoutes);

// Serve static files from the React build
app.use(express.static(path.join(__dirname, 'dist')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

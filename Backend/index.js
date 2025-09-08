const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const propertyRoutes = require('./routes/property/propertyRouter');
const authRoutes = require('./routes/user/userRoutes');
const contactRoutes = require('./routes/contact/contactRoutes');

connectDB();

const app = express();

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// API Routes
app.use('/api', authRoutes);
app.use('/api', propertyRoutes);
app.use('/api', contactRoutes);

// Health check endpoint for render
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'NextProperty API is running',
    timestamp: new Date().toISOString()
  });
});

// Serve static files from the React app build directory
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
} else {
  // Development route
  app.get('/', (req, res) => {
    res.json({ message: 'NextProperty API is running' });
  });
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
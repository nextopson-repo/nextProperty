const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
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

app.use('/api', authRoutes);
app.use('/api', propertyRoutes);
app.use('/api', contactRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'NextProperty API is running' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
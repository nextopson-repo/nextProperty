// config/db.js

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('🔌 Attempting to connect to MongoDB...');
    console.log('📡 URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    console.error('🔍 Error details:', error);
    process.exit(1);
  }
};

module.exports = connectDB;

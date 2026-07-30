const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lifeline');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // Do not crash the application in development if mongo is not running immediately
    console.log('Ensure MongoDB is running locally on port 27017 or provide MONGO_URI in .env');
  }
};

module.exports = connectDB;

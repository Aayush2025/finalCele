const mongoose = require('mongoose');
const config = require('./keys'); // Assuming your MongoDB URI is here

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI, {
      
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

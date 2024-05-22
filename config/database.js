const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/PGP-Keys-DB';

async function connectDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectDB();

module.exports = mongoose;

const mongoose = require('mongoose');
const User = require('../models/User');

async function createAdmin() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/trademark_verification', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const adminUser = await User.findOne({ email: 'admin@example.com' });
    if (adminUser) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    const admin = new User({
      username: 'admin',
      email: 'admin@example.com',
      password: 'Admin@123',
      role: 'admin'
    });

    await admin.save();
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();

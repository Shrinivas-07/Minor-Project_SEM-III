require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error('MONGO_URI not set in .env');
  process.exit(1);
}

(async () => {
  try {
    await mongoose.connect(uri, { dbName: undefined });
    const db = mongoose.connection.db;
    console.log('Connected. Database name:', db.databaseName);

    const cols = await db.listCollections().toArray();
    console.log('Collections:', cols.map(c => c.name).join(', ') || '(none)');

    const hasUsers = cols.some(c => c.name === 'users');
    if (hasUsers) {
      const users = await db.collection('users').find().limit(10).toArray();
      console.log('Users sample count:', users.length);
      users.forEach((u, i) => console.log(`#${i+1}:`, JSON.stringify({ _id: u._id, name: u.name, email: u.email, createdAt: u.createdAt }))); 
    } else {
      console.log('No `users` collection found in this database.');
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message || err);
    process.exit(2);
  }
})();

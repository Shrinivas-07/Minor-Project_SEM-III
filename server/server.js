const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoMemoryServer } = require("mongodb-memory-server");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// serve uploaded files when stored locally
app.use('/uploads', express.static('uploads'));

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    if (process.env.NODE_ENV === "production") {
      console.error("MongoDB connection failed:", err.message);
      process.exit(1);
    }

    console.warn("MongoDB Atlas connection failed, using in-memory fallback:", err.message);
    const mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri(), {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("MongoDB Connected (in-memory fallback)");
  }
};

connectToDatabase();

app.use("/api/auth", require("./routes/authroutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
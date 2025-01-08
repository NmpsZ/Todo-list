const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config()

const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_HOST = process.env.DB_HOST

// เช็คการเชื่อมต่อ MongoDB ก่อน
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("MongoDB already connected");
    return;
  }

  try {
    await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
    process.exit(1);  // หยุดโปรแกรมถ้าเชื่อมต่อไม่สำเร็จ
  }
};

// เรียกใช้งานการเชื่อมต่อ
connectDB();

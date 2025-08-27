import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) return

  try {
    await mongoose.connect(process.env.DB_URI || '');

    isConnected = true

    console.log(`✅ MongoDB connected with: ${process.env.DB_URI}`);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err)
  }
}

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: String,
    posts: [],
    friends: []
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model('User', UserSchema, 'users');

export default UserModel;

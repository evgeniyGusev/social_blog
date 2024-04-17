import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
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
    avatar: String,
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    invoices: {
      in: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      out: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    favs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model('User', UserSchema, 'users');

export default UserModel;

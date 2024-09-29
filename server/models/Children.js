import mongoose from 'mongoose';

const ChildrenSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female'],
    },
    parent: {
      type: String,
    },
    avatar: {
      type: String,
    },
    // community: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Community',
    // },
    // payments: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Payment',
    //   },
    // ],
    costPerMonth: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ChildrenModel = mongoose.model('Children', ChildrenSchema, 'children');

export default ChildrenModel;

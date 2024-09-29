import mongoose from 'mongoose';

const CommunitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Children',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const CommunityModel = mongoose.model(
  'Community',
  CommunitySchema,
  'community'
);

export default CommunityModel;

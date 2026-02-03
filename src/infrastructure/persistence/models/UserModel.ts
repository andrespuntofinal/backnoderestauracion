import { Schema, model, Document } from 'mongoose';

export interface IUserDocument extends Document {
  email: string;
  name: string;
  role: 'admin' | 'user';
  permissions: string[];
  avatar?: string;
  createdAt: Date;
}

const userSchema = new Schema<IUserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    permissions: {
      type: [String],
      default: [],
    },
    avatar: {
      type: String,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const UserModel = model<IUserDocument>('User', userSchema);
import { Schema, model, Document } from 'mongoose';

export interface IMinistryDocument extends Document {
  name: string;
  status: 'Activo' | 'Inactivo';
  createdAt: Date;
}

const ministrySchema = new Schema<IMinistryDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['Activo', 'Inactivo'],
      default: 'Activo',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const MinistryModel = model<IMinistryDocument>('Ministry', ministrySchema);
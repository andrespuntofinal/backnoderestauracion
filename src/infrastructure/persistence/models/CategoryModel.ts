import { Schema, model, Document } from 'mongoose';

export interface ICategoryDocument extends Document {
  name: string;
  type: 'Ingreso' | 'Gasto';
  createdAt: Date;
}

const categorySchema = new Schema<ICategoryDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['Ingreso', 'Gasto'],
      required: true,
      index: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const CategoryModel = model<ICategoryDocument>('Category', categorySchema);
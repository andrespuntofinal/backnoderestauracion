import { Schema, model, Document, Types } from 'mongoose';

export interface ITransactionDocument extends Document {
  type: 'Ingreso' | 'Gasto';
  medioTrx: 'Efectivo' | 'Transferencia';
  categoryId: Types.ObjectId;
  date: string;
  value: number;
  personId?: Types.ObjectId;
  observations?: string;
  attachmentUrl?: string;
  attachmentName?: string;
  createdAt: Date;
}

const transactionSchema = new Schema<ITransactionDocument>(
  {
    type: {
      type: String,
      enum: ['Ingreso', 'Gasto'],
      required: true,
      index: true,
    },
    medioTrx: {
      type: String,
      enum: ['Efectivo', 'Transferencia'],
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    date: {
      type: String,
      required: true,
      index: true,
    },
    value: {
      type: Number,
      required: true,
      min: 0,
    },
    personId: {
      type: Schema.Types.ObjectId,
      ref: 'Person',
      default: null,
    },
    observations: {
      type: String,
      default: null,
    },
    attachmentUrl: {
      type: String,
      default: null,
    },
    attachmentName: {
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

export const TransactionModel = model<ITransactionDocument>(
  'Transaction',
  transactionSchema
);
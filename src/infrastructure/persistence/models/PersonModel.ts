import { Schema, model, Document, Types } from 'mongoose';

export interface IPersonDocument extends Document {
  identification: string;
  idType: 'CC' | 'TI' | 'PAS' | 'CE';
  fullName: string;
  email: string;
  sex: 'Masculino' | 'Femenino' | 'Otro';
  civilStatus: 'Soltero' | 'Casado' | 'Divorciado' | 'Viudo' | 'Unión Libre';
  birthDate: string;
  phone: string;
  address: string;
  neighborhood: string;
  ministryId?: Types.ObjectId;
  membershipType: 'Miembro' | 'Visitante' | 'Simpatizante';
  membershipDate: string;
  status: 'Activo' | 'Inactivo';
  occupation?: string;
  photoUrl?: string;
  isBaptized: boolean;
  populationGroup: 'Niño' | 'Adulto';
  createdAt: Date;
}

const personSchema = new Schema<IPersonDocument>(
  {
    identification: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    idType: {
      type: String,
      enum: ['CC', 'TI', 'PAS', 'CE'],
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    sex: {
      type: String,
      enum: ['Masculino', 'Femenino', 'Otro'],
      required: true,
    },
    civilStatus: {
      type: String,
      enum: ['Soltero', 'Casado', 'Divorciado', 'Viudo', 'Unión Libre'],
      required: true,
    },
    birthDate: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    neighborhood: {
      type: String,
    },
    ministryId: {
      type: Schema.Types.ObjectId,
      ref: 'Ministry',
      default: null,
    },
    membershipType: {
      type: String,
      enum: ['Miembro', 'Visitante', 'Simpatizante'],
      default: 'Visitante',
    },
    membershipDate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Activo', 'Inactivo'],
      default: 'Activo',
    },
    occupation: {
      type: String,
      default: null,
    },
    photoUrl: {
      type: String,
      default: null,
    },
    isBaptized: {
      type: Boolean,
      default: false,
    },
    populationGroup: {
      type: String,
      enum: ['Niño', 'Adulto'],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const PersonModel = model<IPersonDocument>('Person', personSchema);
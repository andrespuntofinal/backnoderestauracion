import { Schema, model, Document } from 'mongoose';

export interface IEventDocument {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
}

export interface IContactInfoDocument {
  address: string;
  phone: string;
  email: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
}

export interface ISiteParametersDocument extends Document {
  heroImages: string[];
  aboutUs: string;
  mission: string;
  vision: string;
  events: IEventDocument[];
  contact: IContactInfoDocument;
  updatedAt: Date;
}

const eventSchema = new Schema<IEventDocument>(
  {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const contactInfoSchema = new Schema<IContactInfoDocument>(
  {
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    facebook: {
      type: String,
      default: null,
    },
    instagram: {
      type: String,
      default: null,
    },
    youtube: {
      type: String,
      default: null,
    },
  },
  { _id: false }
);

const siteParametersSchema = new Schema<ISiteParametersDocument>(
  {
    heroImages: {
      type: [String],
      default: [],
    },
    aboutUs: {
      type: String,
      required: true,
    },
    mission: {
      type: String,
      required: true,
    },
    vision: {
      type: String,
      required: true,
    },
    events: {
      type: [eventSchema],
      default: [],
    },
    contact: {
      type: contactInfoSchema,
      required: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const SiteParametersModel = model<ISiteParametersDocument>(
  'SiteParameters',
  siteParametersSchema
);
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

export interface ISiteThemeDocument {
  primaryColor: string;
  primaryHover: string;
  secondaryColor: string;
  accentColor: string;
  cardBg: string;
  cardBorder: string;
  tableHeaderBg: string;
  tableHeaderText: string;
  sidebarBg: string;
  activeNavBg: string;
  activeNavText: string;
  sidebarHoverBg: string;
  sidebarTextColor: string;
  formHeaderBg: string;
  formLabelColor: string;
  formInputText: string;
  formTitleColor: string;
}

export interface ISiteParametersDocument extends Document {
  heroImages: string[];
  aboutUs: string;
  mission: string;
  vision: string;
  events: IEventDocument[];
  contact: IContactInfoDocument;
  theme?: ISiteThemeDocument;
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

const siteThemeSchema = new Schema<ISiteThemeDocument>(
  {
    primaryColor: { type: String, default: '#00555C' },
    primaryHover: { type: String, default: '#004247' },
    secondaryColor: { type: String, default: '#0f172a' },
    accentColor: { type: String, default: '#06b6d4' },
    cardBg: { type: String, default: '#ffffff' },
    cardBorder: { type: String, default: '#e2e8f0' },
    tableHeaderBg: { type: String, default: '#f8fafc' },
    tableHeaderText: { type: String, default: '#475569' },
    sidebarBg: { type: String, default: '#c9d1d2' },
    activeNavBg: { type: String, default: '#00555C' },
    activeNavText: { type: String, default: '#ffffff' },
    sidebarHoverBg: { type: String, default: '#b8c1c2' },
    sidebarTextColor: { type: String, default: '#1e293b' },
    formHeaderBg: { type: String, default: '#0f172a' },
    formLabelColor: { type: String, default: '#475569' },
    formInputText: { type: String, default: '#0f172a' },
    formTitleColor: { type: String, default: '#ffffff' },
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
    theme: {
      type: siteThemeSchema,
      required: false,
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
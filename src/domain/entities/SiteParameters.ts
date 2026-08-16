export interface Event {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  imageUrl: string;
  
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
}

export interface SiteTheme {
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

export class SiteParameters {
  id?: string;
  heroImages: string[]; // URLs o Base64
  aboutUs: string;
  mission: string;
  vision: string;
  events: Event[];
  contact: ContactInfo;
  theme?: SiteTheme;
  updatedAt?: Date;

  constructor(data: {
    id?: string;
    heroImages: string[];
    aboutUs: string;
    mission: string;
    vision: string;
    events: Event[];
    contact: ContactInfo;
    theme?: SiteTheme;
    updatedAt?: Date;
  }) {
    this.id = data.id;
    this.heroImages = data.heroImages;
    this.aboutUs = data.aboutUs;
    this.mission = data.mission;
    this.vision = data.vision;
    this.events = data.events;
    this.contact = data.contact;
    this.theme = data.theme;
    this.updatedAt = data.updatedAt;
  }

  // Reglas de negocio
  hasValidContact(): boolean {
    return !!(
      this.contact.address &&
      this.contact.phone &&
      this.contact.email
    );
  }

  addEvent(event: Event): void {
    this.events.push(event);
  }

  removeEvent(eventId: string): void {
    this.events = this.events.filter(e => e.id !== eventId);
  }

  updateEvent(eventId: string, updatedEvent: Partial<Event>): void {
    const index = this.events.findIndex(e => e.id === eventId);
    if (index !== -1) {
      this.events[index] = { ...this.events[index], ...updatedEvent };
    }
  }
}
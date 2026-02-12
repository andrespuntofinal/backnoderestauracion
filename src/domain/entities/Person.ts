export class Person {
  id?: string;
  identification: string; // Unique
  idType: 'CC' | 'TI' | 'PAS' | 'CE'; // Tipo de identificación
  fullName: string;
  email?: string;
  sex: 'Masculino' | 'Femenino';
  civilStatus: 'Soltero' | 'Casado' | 'Divorciado' | 'Viudo' | 'Unión Libre';
  birthDate: string; // YYYY-MM-DD
  phone?: string;
  address?: string;
  neighborhood?: string;
  ministryId?: string; // Reference a Ministry
  membershipType: 'Miembro' | 'Visitante' | 'Simpatizante';
  membershipDate: string; // YYYY-MM-DD
  status: 'Activo' | 'Inactivo';
  occupation?: string;
  photoUrl?: string; // Base64 o URL
  isBaptized: boolean;
  populationGroup: 'Niño' | 'Adulto'; // Clasificación
  createdAt?: Date;

  constructor(data: {
    id?: string;
    identification: string;
    idType: 'CC' | 'TI' | 'PAS' | 'CE';
    fullName: string;
    email?: string;
    sex: 'Masculino' | 'Femenino';
    civilStatus: 'Soltero' | 'Casado' | 'Divorciado' | 'Viudo' | 'Unión Libre';
    birthDate: string;
    phone?: string;
    address?: string;
    neighborhood?: string;
    ministryId?: string;
    membershipType: 'Miembro' | 'Visitante' | 'Simpatizante';
    membershipDate: string;
    status: 'Activo' | 'Inactivo';
    occupation?: string;
    photoUrl?: string;
    isBaptized: boolean;
    populationGroup: 'Niño' | 'Adulto';
    createdAt?: Date;
  }) {
    this.id = data.id;
    this.identification = data.identification;
    this.idType = data.idType;
    this.fullName = data.fullName;
    this.email = data.email;
    this.sex = data.sex;
    this.civilStatus = data.civilStatus;
    this.birthDate = data.birthDate;
    this.phone = data.phone;
    this.address = data.address;
    this.neighborhood = data.neighborhood;
    this.ministryId = data.ministryId;
    this.membershipType = data.membershipType;
    this.membershipDate = data.membershipDate;
    this.status = data.status;
    this.occupation = data.occupation;
    this.photoUrl = data.photoUrl;
    this.isBaptized = data.isBaptized;
    this.populationGroup = data.populationGroup;
    this.createdAt = data.createdAt;
  }

  // Reglas de negocio
  isActive(): boolean {
    return this.status === 'Activo';
  }

  isValidEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return this.email ? emailRegex.test(this.email) : false;
  }

  isValidIdentification(): boolean {
    return typeof this.identification === 'string' && this.identification.length >= 5;
  }

  isMember(): boolean {
    return this.membershipType === 'Miembro';
  }

  getAgeGroup(): string {
    const birthYear = parseInt(this.birthDate.split('-')[0]);
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    return age < 18 ? 'Menor' : 'Mayor';
  }

  deactivate(): void {
    this.status = 'Inactivo';
  }

  activate(): void {
    this.status = 'Activo';
  }
}
export class UpdatePersonDTO {
  // Nota: identification NO se incluye porque es único y no debería cambiar
  
  idType?: 'CC' | 'TI' | 'PAS' | 'CE';
  fullName?: string;
  email?: string;
  sex?: 'Masculino' | 'Femenino';
  civilStatus?: 'Soltero' | 'Casado' | 'Divorciado' | 'Viudo' | 'Unión Libre';
  birthDate?: string;
  phone?: string;
  address?: string;
  neighborhood?: string;
  ministryId?: string;
  membershipType?: 'Miembro' | 'Visitante' | 'Simpatizante';
  membershipDate?: string;
  status?: 'Activo' | 'Inactivo';
  occupation?: string;
  photoUrl?: string;
  isBaptized?: boolean;
  populationGroup?: 'Niño' | 'Adulto';

  constructor(data: {
    idType?: 'CC' | 'TI' | 'PAS' | 'CE';
    fullName?: string;
    email?: string;
    sex?: 'Masculino' | 'Femenino';
    civilStatus?: 'Soltero' | 'Casado' | 'Divorciado' | 'Viudo' | 'Unión Libre';
    birthDate?: string;
    phone?: string;
    address?: string;
    neighborhood?: string;
    ministryId?: string;
    membershipType?: 'Miembro' | 'Visitante' | 'Simpatizante';
    membershipDate?: string;
    status?: 'Activo' | 'Inactivo';
    occupation?: string;
    photoUrl?: string;
    isBaptized?: boolean;
    populationGroup?: 'Niño' | 'Adulto';
  }) {
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
  }
}
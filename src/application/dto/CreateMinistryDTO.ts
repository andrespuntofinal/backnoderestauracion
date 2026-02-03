export class CreateMinistryDTO {
  name: string;
  status: 'Activo' | 'Inactivo';

  constructor(data: { name: string; status: 'Activo' | 'Inactivo' }) {
    this.name = data.name;
    this.status = data.status;
  }
}
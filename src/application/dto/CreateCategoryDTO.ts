export class CreateCategoryDTO {
  name: string;
  type: 'Ingreso' | 'Gasto';

  constructor(data: { name: string; type: 'Ingreso' | 'Gasto' }) {
    this.name = data.name;
    this.type = data.type;
  }
}
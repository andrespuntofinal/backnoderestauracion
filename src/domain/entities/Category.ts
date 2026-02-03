export class Category {
  id?: string;
  name: string;
  type: 'Ingreso' | 'Gasto'; // Tipo de transacción
  createdAt?: Date;

  constructor(data: {
    id?: string;
    name: string;
    type: 'Ingreso' | 'Gasto';
    createdAt?: Date;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.createdAt = data.createdAt;
  }

  // Reglas de negocio
  isIncomeCategory(): boolean {
    return this.type === 'Ingreso';
  }

  isExpenseCategory(): boolean {
    return this.type === 'Gasto';
  }
}
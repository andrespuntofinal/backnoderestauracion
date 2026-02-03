export class Transaction {
  id?: string;
  type: 'Ingreso' | 'Gasto';
  categoryId: string; // Reference a Category
  medioTrx: 'Efectivo' | 'Transferencia';
  date: string; // YYYY-MM-DD
  value: number; // Monto
  personId?: string; // Reference a Person (opcional)
  observations?: string;
  attachmentUrl?: string;
  attachmentName?: string;
  createdAt?: Date;

  constructor(data: {
    id?: string;
    type: 'Ingreso' | 'Gasto';
    categoryId: string;
    medioTrx: 'Efectivo' | 'Transferencia';
    date: string;
    value: number;
    personId?: string;
    observations?: string;
    attachmentUrl?: string;
    attachmentName?: string;
    createdAt?: Date;
  }) {
    this.id = data.id;
    this.type = data.type;
    this.categoryId = data.categoryId;
    this.medioTrx = data.medioTrx;
    this.date = data.date;
    this.value = data.value;
    this.personId = data.personId;
    this.observations = data.observations;
    this.attachmentUrl = data.attachmentUrl;
    this.attachmentName = data.attachmentName;
    this.createdAt = data.createdAt;
  }

  // Reglas de negocio
  isIncome(): boolean {
    return this.type === 'Ingreso';
  }

  isExpense(): boolean {
    return this.type === 'Gasto';
  }

  isValidValue(): boolean {
    return this.value > 0;
  }

  isValidDate(): boolean {
    return /^\d{4}-\d{2}-\d{2}$/.test(this.date);
  }

  /**
   * Valida que el tipo de transacción coincida con el tipo de categoría
   * Esta regla de negocio es crítica para la integridad financiera
   */
  validateTypeMatchesCategory(categoryType: 'Ingreso' | 'Gasto'): boolean {
    return this.type === categoryType;
  }
}
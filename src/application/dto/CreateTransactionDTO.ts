export class CreateTransactionDTO {
  type: 'Ingreso' | 'Gasto';
  medioTrx: 'Efectivo' | 'Transferencia';
  categoryId: string;
  date: string;
  value: number;
  personId?: string;
  observations?: string;
  attachmentUrl?: string;
  attachmentName?: string;

  constructor(data: {
    type: 'Ingreso' | 'Gasto';
    medioTrx: 'Efectivo' | 'Transferencia';
    categoryId: string;
    date: string;
    value: number;
    personId?: string;
    observations?: string;
    attachmentUrl?: string;
    attachmentName?: string;
  }) {
    this.type = data.type;
    this.medioTrx = data.medioTrx;
    this.categoryId = data.categoryId;
    this.date = data.date;
    this.value = data.value;
    this.personId = data.personId;
    this.observations = data.observations;
    this.attachmentUrl = data.attachmentUrl;
    this.attachmentName = data.attachmentName;
  }
}
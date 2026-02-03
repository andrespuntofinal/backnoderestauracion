import { Transaction } from '../entities/Transaction';

export interface ITransactionRepository {
  findAll(): Promise<Transaction[]>;
  findById(id: string): Promise<Transaction | null>;
  findByCategory(categoryId: string): Promise<Transaction[]>;
  findByMedioTrx(medioTrx: string): Promise<Transaction[]>;
  findByPerson(personId: string): Promise<Transaction[]>;
  findByDateRange(startDate: string, endDate: string): Promise<Transaction[]>;
  create(transaction: Transaction): Promise<Transaction>;
  update(id: string, transaction: Partial<Transaction>): Promise<Transaction | null>;
  delete(id: string): Promise<boolean>;
}
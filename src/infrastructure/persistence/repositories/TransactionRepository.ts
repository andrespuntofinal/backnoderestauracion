import { Transaction, ITransactionRepository } from '../../../domain';
import { TransactionModel } from '../models';

export class TransactionRepository implements ITransactionRepository {
  async findAll(): Promise<Transaction[]> {
    const transactions = await TransactionModel.find().lean();
    return transactions.map(this.mapToEntity);
  }

  async findById(id: string): Promise<Transaction | null> {
    const transaction = await TransactionModel.findById(id).lean();
    return transaction ? this.mapToEntity(transaction) : null;
  }

  async findByCategory(categoryId: string): Promise<Transaction[]> {
    const transactions = await TransactionModel.find({ categoryId }).lean();
    return transactions.map(this.mapToEntity);
  }
    async findByMedioTrx(medioTrx: string): Promise<Transaction[]> {
    const transactions = await TransactionModel.find({ medioTrx }).lean();
    return transactions.map(this.mapToEntity);
    }

  async findByPerson(personId: string): Promise<Transaction[]> {
    const transactions = await TransactionModel.find({ personId }).lean();
    return transactions.map(this.mapToEntity);
  }

  async findByDateRange(startDate: string, endDate: string): Promise<Transaction[]> {
    const transactions = await TransactionModel.find({
      date: { $gte: startDate, $lte: endDate },
    }).lean();
    return transactions.map(this.mapToEntity);
  }

  async create(transaction: Transaction): Promise<Transaction> {
    const transactionModel = new TransactionModel({
      type: transaction.type,
      medioTrx: transaction.medioTrx,
      categoryId: transaction.categoryId,
      date: transaction.date,
      value: transaction.value,
      personId: transaction.personId,
      observations: transaction.observations,
      attachmentUrl: transaction.attachmentUrl,
      attachmentName: transaction.attachmentName,
    });

    const savedTransaction = await transactionModel.save();
    return this.mapToEntity(savedTransaction.toObject());
  }

  async update(
    id: string,
    transaction: Partial<Transaction>
  ): Promise<Transaction | null> {
    const updatedTransaction = await TransactionModel.findByIdAndUpdate(
      id,
      {
        type: transaction.type,
        medioTrx: transaction.medioTrx,
        categoryId: transaction.categoryId,
        date: transaction.date,
        value: transaction.value,
        personId: transaction.personId,
        observations: transaction.observations,
        attachmentUrl: transaction.attachmentUrl,
        attachmentName: transaction.attachmentName,
      },
      { new: true }
    ).lean();

    return updatedTransaction ? this.mapToEntity(updatedTransaction) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await TransactionModel.findByIdAndDelete(id);
    return result !== null;
  }

  private mapToEntity(doc: any): Transaction {
    return new Transaction({
      id: doc._id?.toString(),
      type: doc.type,
      medioTrx: doc.medioTrx,
      categoryId: doc.categoryId?.toString(),
      date: doc.date,
      value: doc.value,
      personId: doc.personId?.toString(),
      observations: doc.observations,
      attachmentUrl: doc.attachmentUrl,
      attachmentName: doc.attachmentName,
      createdAt: doc.createdAt,
    });
  }
}
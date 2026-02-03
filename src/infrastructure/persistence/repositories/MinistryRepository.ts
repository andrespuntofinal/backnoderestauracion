import { Ministry, IMinistryRepository } from '../../../domain';
import { MinistryModel } from '../models';

export class MinistryRepository implements IMinistryRepository {
  async findAll(): Promise<Ministry[]> {
    const ministries = await MinistryModel.find().lean();
    return ministries.map(this.mapToEntity);
  }

  async findById(id: string): Promise<Ministry | null> {
    const ministry = await MinistryModel.findById(id).lean();
    return ministry ? this.mapToEntity(ministry) : null;
  }

  async create(ministry: Ministry): Promise<Ministry> {
    const ministryModel = new MinistryModel({
      name: ministry.name,
      status: ministry.status,
    });

    const savedMinistry = await ministryModel.save();
    return this.mapToEntity(savedMinistry.toObject());
  }

  async update(id: string, ministry: Partial<Ministry>): Promise<Ministry | null> {
    const updatedMinistry = await MinistryModel.findByIdAndUpdate(
      id,
      {
        name: ministry.name,
        status: ministry.status,
      },
      { new: true }
    ).lean();

    return updatedMinistry ? this.mapToEntity(updatedMinistry) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await MinistryModel.findByIdAndDelete(id);
    return result !== null;
  }

  private mapToEntity(doc: any): Ministry {
    return new Ministry({
      id: doc._id?.toString(),
      name: doc.name,
      status: doc.status,
      createdAt: doc.createdAt,
    });
  }
}
import { Ministry } from '../entities/Ministry';

export interface IMinistryRepository {
  findAll(): Promise<Ministry[]>;
  findById(id: string): Promise<Ministry | null>;
  create(ministry: Ministry): Promise<Ministry>;
  update(id: string, ministry: Partial<Ministry>): Promise<Ministry | null>;
  delete(id: string): Promise<boolean>;
}
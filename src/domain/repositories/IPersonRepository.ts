import { Person } from '../entities/Person';

export interface IPersonRepository {
  findAll(): Promise<Person[]>;
  findById(id: string): Promise<Person | null>;
  findByIdentification(identification: string): Promise<Person | null>;
  findByMinistry(ministryId: string): Promise<Person[]>;
  create(person: Person): Promise<Person>;
  update(id: string, person: Partial<Person>): Promise<Person | null>;
  delete(id: string): Promise<boolean>;
  existsByIdentification(identification: string): Promise<boolean>;
}
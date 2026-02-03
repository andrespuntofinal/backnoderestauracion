import { Person, IPersonRepository } from '../../../domain';
import { PersonModel } from '../models';

export class PersonRepository implements IPersonRepository {
  async findAll(): Promise<Person[]> {
    const persons = await PersonModel.find().lean();
    return persons.map(this.mapToEntity);
  }

  async findById(id: string): Promise<Person | null> {
    const person = await PersonModel.findById(id).lean();
    return person ? this.mapToEntity(person) : null;
  }

  async findByIdentification(identification: string): Promise<Person | null> {
    const person = await PersonModel.findOne({ identification }).lean();
    return person ? this.mapToEntity(person) : null;
  }

  async findByMinistry(ministryId: string): Promise<Person[]> {
    const persons = await PersonModel.find({ ministryId }).lean();
    return persons.map(this.mapToEntity);
  }

  async create(person: Person): Promise<Person> {
    const personModel = new PersonModel({
      identification: person.identification,
      idType: person.idType,
      fullName: person.fullName,
      email: person.email,
      sex: person.sex,
      civilStatus: person.civilStatus,
      birthDate: person.birthDate,
      phone: person.phone,
      address: person.address,
      neighborhood: person.neighborhood,
      ministryId: person.ministryId,
      membershipType: person.membershipType,
      membershipDate: person.membershipDate,
      status: person.status,
      occupation: person.occupation,
      photoUrl: person.photoUrl,
      isBaptized: person.isBaptized,
      populationGroup: person.populationGroup,
    });

    const savedPerson = await personModel.save();
    return this.mapToEntity(savedPerson.toObject());
  }

  async update(id: string, person: Partial<Person>): Promise<Person | null> {
    const updatedPerson = await PersonModel.findByIdAndUpdate(
      id,
      {
        idType: person.idType,
        fullName: person.fullName,
        email: person.email,
        sex: person.sex,
        civilStatus: person.civilStatus,
        birthDate: person.birthDate,
        phone: person.phone,
        address: person.address,
        neighborhood: person.neighborhood,
        ministryId: person.ministryId,
        membershipType: person.membershipType,
        membershipDate: person.membershipDate,
        status: person.status,
        occupation: person.occupation,
        photoUrl: person.photoUrl,
        isBaptized: person.isBaptized,
        populationGroup: person.populationGroup,
      },
      { new: true }
    ).lean();

    return updatedPerson ? this.mapToEntity(updatedPerson) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await PersonModel.findByIdAndDelete(id);
    return result !== null;
  }

  async existsByIdentification(identification: string): Promise<boolean> {
    const count = await PersonModel.countDocuments({ identification });
    return count > 0;
  }

  private mapToEntity(doc: any): Person {
    return new Person({
      id: doc._id?.toString(),
      identification: doc.identification,
      idType: doc.idType,
      fullName: doc.fullName,
      email: doc.email,
      sex: doc.sex,
      civilStatus: doc.civilStatus,
      birthDate: doc.birthDate,
      phone: doc.phone,
      address: doc.address,
      neighborhood: doc.neighborhood,
      ministryId: doc.ministryId?.toString(),
      membershipType: doc.membershipType,
      membershipDate: doc.membershipDate,
      status: doc.status,
      occupation: doc.occupation,
      photoUrl: doc.photoUrl,
      isBaptized: doc.isBaptized,
      populationGroup: doc.populationGroup,
      createdAt: doc.createdAt,
    });
  }
}
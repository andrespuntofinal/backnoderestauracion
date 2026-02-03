import { Ministry, IMinistryRepository } from '../../../domain';

export class GetAllMinistriesUseCase {
  constructor(private ministryRepository: IMinistryRepository) {}

  async execute(): Promise<Ministry[]> {
    return await this.ministryRepository.findAll();
  }
}
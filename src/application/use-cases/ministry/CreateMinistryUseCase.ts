import { Ministry, IMinistryRepository } from '../../../domain';
import { CreateMinistryDTO } from '../../dto';
import { ValidationError } from '../../errors';

export class CreateMinistryUseCase {
  constructor(private ministryRepository: IMinistryRepository) {}

  async execute(dto: CreateMinistryDTO): Promise<Ministry> {
    // Validar
    if (!dto.name || dto.name.trim().length < 3) {
      throw new ValidationError('El nombre del ministerio debe tener al menos 3 caracteres');
    }

    // Crear entidad
    const ministry = new Ministry({
      name: dto.name,
      status: dto.status,
      createdAt: new Date(),
    });

    // Guardar
    return await this.ministryRepository.create(ministry);
  }
}
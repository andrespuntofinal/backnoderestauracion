import { User, IUserRepository } from '../../../domain';
import { UpdateUserDTO } from '../../dto';
import { NotFoundError, ValidationError } from '../../errors';

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string, dto: UpdateUserDTO): Promise<User> {
    // Obtener usuario existente
    const user = await this.userRepository.findById(userId);
    
    if (!user) {
      throw new NotFoundError('Usuario', userId);
    }

    // Actualizar atributos
    if (dto.name !== undefined) {
      if (dto.name.trim().length < 3) {
        throw new ValidationError('El nombre debe tener al menos 3 caracteres');
      }
      user.name = dto.name;
    }

    if (dto.role !== undefined) {
      user.role = dto.role;
    }

    if (dto.permissions !== undefined) {
      user.permissions = dto.permissions;
    }

    if (dto.avatar !== undefined) {
      user.avatar = dto.avatar;
    }

    // Guardar cambios
    const updatedUser = await this.userRepository.update(userId, user);

    if (!updatedUser) {
      throw new NotFoundError('Usuario', userId);
    }

    return updatedUser;
  }
}
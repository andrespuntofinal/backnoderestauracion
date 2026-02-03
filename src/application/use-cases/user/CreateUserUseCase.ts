import { User, IUserRepository } from '../../../domain';
import { CreateUserDTO } from '../../dto';
import { ValidationError, DuplicateError } from '../../errors';

/**
 * Use Case: Crear un nuevo usuario
 * Responsabilidades:
 * - Validar datos de entrada (DTO)
 * - Validar reglas de negocio
 * - Orquestar la creación
 */
export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(dto: CreateUserDTO): Promise<User> {
    // Validar que no exista un usuario con ese email
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new DuplicateError('Email', dto.email);
    }

    // Crear la entidad
    const user = new User({
      email: dto.email,
      name: dto.name,
      role: dto.role,
      permissions: dto.permissions,
      avatar: dto.avatar,
      createdAt: new Date(),
    });

    // Validar según reglas de dominio
    if (!user.isValidEmail()) {
      throw new ValidationError('El formato del email no es válido');
    }

    if (!user.name || user.name.trim().length < 3) {
      throw new ValidationError('El nombre debe tener al menos 3 caracteres');
    }

    // Guardar en la BD
    const createdUser = await this.userRepository.create(user);

    return createdUser;
  }
}
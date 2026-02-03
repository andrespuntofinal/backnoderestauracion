import { User, IUserRepository } from '../../../domain';

/**
 * Use Case: Obtener todos los usuarios
 * Responsabilidad: Orquestar la obtención de usuarios
 */
export class GetAllUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users;
  }
}
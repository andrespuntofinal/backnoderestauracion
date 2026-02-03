import { IUserRepository } from '../../../domain';
import { NotFoundError } from '../../errors';

export class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<boolean> {
    // Verificar que existe
    const user = await this.userRepository.findById(userId);
    
    if (!user) {
      throw new NotFoundError('Usuario', userId);
    }

    // Eliminar
    const deleted = await this.userRepository.delete(userId);

    return deleted;
  }
}
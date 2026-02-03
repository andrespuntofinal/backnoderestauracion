import { User, IUserRepository } from '../../../domain';
import { NotFoundError } from '../../errors';

export class GetUserByIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    
    if (!user) {
      throw new NotFoundError('Usuario', userId);
    }

    return user;
  }
}
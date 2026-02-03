import { User, IUserRepository } from '../../../domain';
import { NotFoundError } from '../../errors';

export class GetUserByEmailUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    
    if (!user) {
      throw new NotFoundError('Usuario', email);
    }

    return user;
  }
}
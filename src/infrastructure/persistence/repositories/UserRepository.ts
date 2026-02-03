import { User, IUserRepository } from '../../../domain';
import { UserModel } from '../models';

/**
 * Implementación concreta del repositorio de Usuarios
 * Aquí SÍ dependemos de Mongoose
 */
export class UserRepository implements IUserRepository {
  async findAll(): Promise<User[]> {
    const users = await UserModel.find().lean();
    return users.map(this.mapToEntity);
  }

  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findById(id).lean();
    return user ? this.mapToEntity(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email }).lean();
    return user ? this.mapToEntity(user) : null;
  }

  async create(user: User): Promise<User> {
    const userModel = new UserModel({
      email: user.email,
      name: user.name,
      role: user.role,
      permissions: user.permissions,
      avatar: user.avatar,
    });

    const savedUser = await userModel.save();
    return this.mapToEntity(savedUser.toObject());
  }

  async update(id: string, user: Partial<User>): Promise<User | null> {
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        name: user.name,
        role: user.role,
        permissions: user.permissions,
        avatar: user.avatar,
      },
      { new: true }
    ).lean();

    return updatedUser ? this.mapToEntity(updatedUser) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await UserModel.findByIdAndDelete(id);
    return result !== null;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const count = await UserModel.countDocuments({ email });
    return count > 0;
  }

  /**
   * Mapear documento de MongoDB a Entidad de Dominio
   * Esto asegura que siempre trabajamos con objetos de Dominio
   */
  private mapToEntity(doc: any): User {
    return new User({
      id: doc._id?.toString(),
      email: doc.email,
      name: doc.name,
      role: doc.role,
      permissions: doc.permissions,
      avatar: doc.avatar,
      createdAt: doc.createdAt,
    });
  }
}
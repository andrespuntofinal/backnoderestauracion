import { Request, Response } from 'express';
import {
  CreateUserUseCase,
  UpdateUserUseCase,
  GetAllUsersUseCase,
  GetUserByIdUseCase,
  GetUserByEmailUseCase,
  DeleteUserUseCase,
  CreateUserDTO,
  UpdateUserDTO,
  DomainError,
} from '../../application';
import { Container } from '../../infrastructure';

/**
 * Controller de Usuarios
 * Responsabilidad: Recibir requests HTTP y delegar al Use Case
 */
export class UserController {
  private container = Container.getInstance();
  private userRepository = this.container.getUserRepository();

  /**
   * GET /api/users
   */
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const useCase = new GetAllUsersUseCase(this.userRepository);
      const users = await useCase.execute();

      res.json({
        success: true,
        data: users,
        total: users.length,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  /**
   * GET /api/users/:id
   */
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const useCase = new GetUserByIdUseCase(this.userRepository);
      const user = await useCase.execute(id);

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  /**
   * GET /api/users/email/:email
   */
  async getByEmail(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.params;

      const useCase = new GetUserByEmailUseCase(this.userRepository);
      const user = await useCase.execute(email);

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  /**
   * POST /api/users
   */
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { email, name, role, permissions, avatar } = req.body;

      if (!email || !name || !role) {
        res.status(400).json({
          success: false,
          error: 'Email, name y role son requeridos',
        });
        return;
      }

      const dto = new CreateUserDTO({
        email,
        name,
        role,
        permissions: permissions || [],
        avatar,
      });

      const useCase = new CreateUserUseCase(this.userRepository);
      const user = await useCase.execute(dto);

      res.status(201).json({
        success: true,
        data: user,
        message: 'Usuario creado exitosamente',
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  /**
   * PUT /api/users/:id
   */
  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, role, permissions, avatar } = req.body;

      const dto = new UpdateUserDTO({
        name,
        role,
        permissions,
        avatar,
      });

      const useCase = new UpdateUserUseCase(this.userRepository);
      const user = await useCase.execute(id, dto);

      res.json({
        success: true,
        data: user,
        message: 'Usuario actualizado exitosamente',
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  /**
   * DELETE /api/users/:id
   */
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const useCase = new DeleteUserUseCase(this.userRepository);
      await useCase.execute(id);

      res.json({
        success: true,
        message: 'Usuario eliminado exitosamente',
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  private handleError(res: Response, error: any): void {
    console.error('❌ Error en UserController:', error);

    if (error instanceof DomainError) {
      res.status(error.statusCode).json({
        success: false,
        error: error.message,
        code: error.code,
      });
      return;
    }

    res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
    });
  }
}
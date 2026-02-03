import { Request, Response } from 'express';
import {
  CreateMinistryUseCase,
  CreateMinistryDTO,
  DomainError,
} from '../../application';
import { Container } from '../../infrastructure';
import { Ministry } from '../../domain';

export class MinistryController {
  private container = Container.getInstance();
  private ministryRepository = this.container.getMinistryRepository();

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const ministries = await this.ministryRepository.findAll();

      res.json({
        success: true,
        data: ministries,
        total: ministries.length,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const ministry = await this.ministryRepository.findById(id);

      if (!ministry) {
        res.status(404).json({
          success: false,
          error: 'Ministerio no encontrado',
        });
        return;
      }

      res.json({
        success: true,
        data: ministry,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, status } = req.body;

      if (!name) {
        res.status(400).json({
          success: false,
          error: 'name es requerido',
        });
        return;
      }

      const dto = new CreateMinistryDTO({
        name,
        status: status || 'Activo',
      });

      const useCase = new CreateMinistryUseCase(this.ministryRepository);
      const ministry = await useCase.execute(dto);

      res.status(201).json({
        success: true,
        data: ministry,
        message: 'Ministerio creado exitosamente',
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, status } = req.body;

      const ministry = await this.ministryRepository.findById(id);
      if (!ministry) {
        res.status(404).json({
          success: false,
          error: 'Ministerio no encontrado',
        });
        return;
      }

      const updated = await this.ministryRepository.update(id, { name, status });

      res.json({
        success: true,
        data: updated,
        message: 'Ministerio actualizado exitosamente',
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const deleted = await this.ministryRepository.delete(id);
      if (!deleted) {
        res.status(404).json({
          success: false,
          error: 'Ministerio no encontrado',
        });
        return;
      }

      res.json({
        success: true,
        message: 'Ministerio eliminado exitosamente',
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  private handleError(res: Response, error: any): void {
    console.error('❌ Error en MinistryController:', error);

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
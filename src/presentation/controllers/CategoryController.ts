import { Request, Response } from 'express';
import {
  CreateCategoryDTO,
  DomainError,
} from '../../application';
import { Container } from '../../infrastructure';
import { Category } from '../../domain';

export class CategoryController {
  private container = Container.getInstance();
  private categoryRepository = this.container.getCategoryRepository();

  /**
   * GET /api/categories
   * Obtener todas las categorías
   */
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const categories = await this.categoryRepository.findAll();

      res.json({
        success: true,
        data: categories,
        total: categories.length,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  /**
   * GET /api/categories/:id
   * Obtener categoría por ID
   */
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const category = await this.categoryRepository.findById(id);

      if (!category) {
        res.status(404).json({
          success: false,
          error: 'Categoría no encontrada',
        });
        return;
      }

      res.json({
        success: true,
        data: category,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  /**
   * GET /api/categories/type/:type
   * Obtener categorías por tipo (Ingreso/Gasto)
   */
  async getByType(req: Request, res: Response): Promise<void> {
    try {
      const { type } = req.params;

      // Validar tipo
      if (!['Ingreso', 'Gasto'].includes(type)) {
        res.status(400).json({
          success: false,
          error: 'Tipo de categoría inválido. Use: Ingreso o Gasto',
        });
        return;
      }

      const categories = await this.categoryRepository.findByType(type as 'Ingreso' | 'Gasto');

      res.json({
        success: true,
        data: categories,
        total: categories.length,
        filter: { type },
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  /**
   * POST /api/categories
   * Crear nueva categoría
   */
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, type } = req.body;

      // Validaciones básicas
      if (!name || !type) {
        res.status(400).json({
          success: false,
          error: 'name y type son requeridos',
        });
        return;
      }

      // Validar tipo
      if (!['Ingreso', 'Gasto'].includes(type)) {
        res.status(400).json({
          success: false,
          error: 'Tipo de categoría inválido. Use: Ingreso o Gasto',
        });
        return;
      }

      // Verificar que no exista una categoría con el mismo nombre
      /*const existing = await this.categoryRepository.findByNombre(name);
      if (existing) {
        res.status(409).json({
          success: false,
          error: `Ya existe una sssss categoría con el nombre '${name}'`,
        });
        return;
      }*/

      const dto = new CreateCategoryDTO({
        name,
        type,
      });

      const category = new Category({
        name: dto.name,
        type: dto.type,
        createdAt: new Date(),
      });

      const savedCategory = await this.categoryRepository.create(category);

      res.status(201).json({
        success: true,
        data: savedCategory,
        message: 'Categoría creada exitosamente',
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  /**
   * PUT /api/categories/:id
   * Actualizar categoría
   */
  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, type, description, status } = req.body;

      // Obtener categoría existente
      const category = await this.categoryRepository.findById(id);
      if (!category) {
        res.status(404).json({
          success: false,
          error: 'Categoría no encontrada',
        });
        return;
      }

      // Validar tipo si se proporciona
      if (type && !['Ingreso', 'Gasto'].includes(type)) {
        res.status(400).json({
          success: false,
          error: 'Tipo de categoría inválido. Use: Ingreso o Gasto',
        });
        return;
      }

      // Verificar que no exista otra categoría con el mismo nombre
      /*if (name) {
        const newName = name || category.name;
        const existing = await this.categoryRepository.findByNombre(newName);
        
        if (existing) {
          res.status(409).json({
            success: false,
            error: `Ya existe una categoría xxx con el nombre '${newName}'`,
          });
          return;
        }
      }*/

      const updated = await this.categoryRepository.update(id, {
        name,
        type,
      });

      res.json({
        success: true,
        data: updated,
        message: 'Categoría actualizada exitosamente',
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  /**
   * DELETE /api/categories/:id
   * Eliminar categoría
   */
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const deleted = await this.categoryRepository.delete(id);
      if (!deleted) {
        res.status(404).json({
          success: false,
          error: 'Categoría no encontrada',
        });
        return;
      }

      res.json({
        success: true,
        message: 'Categoría eliminada exitosamente',
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  /**
   * GET /api/categories/stats/usage
   * Obtener estadísticas de uso de categorías
   */
  async getUsageStats(req: Request, res: Response): Promise<void> {
    try {
      const categories = await this.categoryRepository.findAll();
      const transactionRepository = this.container.getTransactionRepository();
      const transactions = await transactionRepository.findAll();

      const stats = categories.map((category) => {
        const relatedTransactions = transactions.filter(
          (tx) => tx.categoryId === category.id
        );

        const total = relatedTransactions.reduce((sum, tx) => sum + tx.value, 0);

        return {
          categoryId: category.id,
          categoryName: category.name,
          categoryType: category.type,
          transactionCount: relatedTransactions.length,
          totalAmount: total,
          averageAmount: relatedTransactions.length > 0 
            ? (total / relatedTransactions.length).toFixed(2) 
            : 0,
        };
      });

      res.json({
        success: true,
        data: stats,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  private handleError(res: Response, error: any): void {
    console.error('❌ Error en CategoryController:', error);

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
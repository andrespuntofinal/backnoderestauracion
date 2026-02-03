import { Request, Response } from 'express';
import {
  CreateTransactionDTO,
  DomainError,
} from '../../application';
import { Container } from '../../infrastructure';
import { Transaction } from '../../domain';

export class TransactionController {
  private container = Container.getInstance();
  private transactionRepository = this.container.getTransactionRepository();
  private categoryRepository = this.container.getCategoryRepository();
  private personRepository = this.container.getPersonRepository();

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const transactions = await this.transactionRepository.findAll();

      res.json({
        success: true,
        data: transactions,
        total: transactions.length,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const transaction = await this.transactionRepository.findById(id);

      if (!transaction) {
        res.status(404).json({
          success: false,
          error: 'Transacción no encontrada',
        });
        return;
      }

      res.json({
        success: true,
        data: transaction,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getByCategory(req: Request, res: Response): Promise<void> {
    try {
      const { categoryId } = req.params;

      const category = await this.categoryRepository.findById(categoryId);
      if (!category) {
        res.status(404).json({
          success: false,
          error: 'Categoría no encontrada',
        });
        return;
      }

      const transactions = await this.transactionRepository.findByCategory(categoryId);

      res.json({
        success: true,
        data: transactions,
        total: transactions.length,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getByPerson(req: Request, res: Response): Promise<void> {
    try {
      const { personId } = req.params;

      const person = await this.personRepository.findById(personId);
      if (!person) {
        res.status(404).json({
          success: false,
          error: 'Persona no encontrada',
        });
        return;
      }

      const transactions = await this.transactionRepository.findByPerson(personId);

      res.json({
        success: true,
        data: transactions,
        total: transactions.length,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getByDateRange(req: Request, res: Response): Promise<void> {
    try {
      const { startDate, endDate } = req.params;

      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
        res.status(400).json({
          success: false,
          error: 'Formato de fecha inválido. Use YYYY-MM-DD',
        });
        return;
      }

      if (startDate > endDate) {
        res.status(400).json({
          success: false,
          error: 'La fecha de inicio no puede ser mayor que la fecha de fin',
        });
        return;
      }

      const transactions = await this.transactionRepository.findByDateRange(
        startDate,
        endDate
      );

      res.json({
        success: true,
        data: transactions,
        total: transactions.length,
        filters: { startDate, endDate },
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { type, medioTrx, categoryId, date, value, personId, observations, attachmentUrl, attachmentName } = req.body;

      if (!type || !medioTrx || !categoryId || !date || value === undefined) {
        res.status(400).json({
          success: false,
          error: 'type, medioTrx, categoryId, date y value son requeridos',
        });
        return;
      }

      const category = await this.categoryRepository.findById(categoryId);
      if (!category) {
        res.status(404).json({
          success: false,
          error: 'Categoría no encontrada',
        });
        return;
      }

      if (type !== category.type) {
        res.status(400).json({
          success: false,
          error: `El tipo de transacción '${type}' no coincide con el tipo de categoría '${category.type}'`,
        });
        return;
      }

      if (personId) {
        const person = await this.personRepository.findById(personId);
        if (!person) {
          res.status(404).json({
            success: false,
            error: 'Persona no encontrada',
          });
          return;
        }
      }

      const dto = new CreateTransactionDTO({
        type,
        medioTrx,
        categoryId,
        date,
        value,
        personId,
        observations,
        attachmentUrl,
        attachmentName,
      });

      const transaction = new Transaction({
        type: dto.type,
        medioTrx: dto.medioTrx,
        categoryId: dto.categoryId,
        date: dto.date,
        value: dto.value,
        personId: dto.personId,
        observations: dto.observations,
        attachmentUrl: dto.attachmentUrl,
        attachmentName: dto.attachmentName,
        createdAt: new Date(),
      });

      if (!transaction.isValidValue()) {
        res.status(400).json({
          success: false,
          error: 'El valor debe ser mayor a 0',
        });
        return;
      }

      if (!transaction.isValidDate()) {
        res.status(400).json({
          success: false,
          error: 'Formato de fecha inválido. Use YYYY-MM-DD',
        });
        return;
      }

      const savedTransaction = await this.transactionRepository.create(transaction);

      res.status(201).json({
        success: true,
        data: savedTransaction,
        message: 'Transacción creada exitosamente',
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { type, medioTrx, categoryId, date, value, personId, observations, attachmentUrl, attachmentName } = req.body;

      const transaction = await this.transactionRepository.findById(id);
      if (!transaction) {
        res.status(404).json({
          success: false,
          error: 'Transacción no encontrada',
        });
        return;
      }

      if (categoryId) {
        const category = await this.categoryRepository.findById(categoryId);
        if (!category) {
          res.status(404).json({
            success: false,
            error: 'Categoría no encontrada',
          });
          return;
        }

        const txType = type || transaction.type;
        if (txType !== category.type) {
          res.status(400).json({
            success: false,
            error: `El tipo de transacción '${txType}' no coincide con el tipo de categoría '${category.type}'`,
          });
          return;
        }
      }

      if (personId) {
        const person = await this.personRepository.findById(personId);
        if (!person) {
          res.status(404).json({
            success: false,
            error: 'Persona no encontrada',
          });
          return;
        }
      }

      const updated = await this.transactionRepository.update(id, {
        type,
        medioTrx,
        categoryId,
        date,
        value,
        personId,
        observations,
        attachmentUrl,
        attachmentName,
      });

      res.json({
        success: true,
        data: updated,
        message: 'Transacción actualizada exitosamente',
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const deleted = await this.transactionRepository.delete(id);
      if (!deleted) {
        res.status(404).json({
          success: false,
          error: 'Transacción no encontrada',
        });
        return;
      }

      res.json({
        success: true,
        message: 'Transacción eliminada exitosamente',
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getStatsSummary(req: Request, res: Response): Promise<void> {
    try {
      const transactions = await this.transactionRepository.findAll();

      const summary = {
        totalIncome: 0,
        totalExpense: 0,
        balance: 0,
        transactionCount: transactions.length,
      };

      transactions.forEach((tx) => {
        if (tx.isIncome()) {
          summary.totalIncome += tx.value;
        } else {
          summary.totalExpense += tx.value;
        }
      });

      summary.balance = summary.totalIncome - summary.totalExpense;

      res.json({
        success: true,
        data: summary,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getStatsByCategory(req: Request, res: Response): Promise<void> {
    try {
      const transactions = await this.transactionRepository.findAll();
      const categories = await this.categoryRepository.findAll();

      const stats: any = {};

      categories.forEach((category) => {
        if (!category.id) return;
        const id = category.id;
        stats[id] = {
          categoryName: category.name,
          categoryType: category.type,
          total: 0,
          count: 0,
        };
      });

      transactions.forEach((tx) => {
        if (tx.categoryId && stats[tx.categoryId]) {
          stats[tx.categoryId].total += tx.value;
          stats[tx.categoryId].count += 1;
        }
      });

      res.json({
        success: true,
        data: Object.values(stats),
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  private handleError(res: Response, error: any): void {
    console.error('❌ Error en TransactionController:', error);

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
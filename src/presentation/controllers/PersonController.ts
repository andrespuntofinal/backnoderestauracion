import { Request, Response } from 'express';
import {
  CreatePersonDTO,
  DomainError,
} from '../../application';
import { Container } from '../../infrastructure';
import { Person } from '../../domain';

export class PersonController {
  private container = Container.getInstance();
  private personRepository = this.container.getPersonRepository();
  private ministryRepository = this.container.getMinistryRepository();

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const persons = await this.personRepository.findAll();

      res.json({
        success: true,
        data: persons,
        total: persons.length,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const person = await this.personRepository.findById(id);

      if (!person) {
        res.status(404).json({
          success: false,
          error: 'Persona no encontrada',
        });
        return;
      }

      res.json({
        success: true,
        data: person,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getByIdentification(req: Request, res: Response): Promise<void> {
    try {
      const { identification } = req.params;
      const person = await this.personRepository.findByIdentification(identification);

      if (!person) {
        res.status(404).json({
          success: false,
          error: 'Persona no encontrada',
        });
        return;
      }

      res.json({
        success: true,
        data: person,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const dto = new CreatePersonDTO(req.body);

      if (!dto.identification || !dto.fullName) {
        res.status(400).json({
          success: false,
          error: 'Identification y fullName  son requeridos',
        });
        return;
      }

      const existing = await this.personRepository.findByIdentification(
        dto.identification
      );
      if (existing) {
        res.status(409).json({
          success: false,
          error: 'Ya existe una persona con esta identificación',
        });
        return;
      }

      const person = new Person({
        identification: dto.identification,
        idType: dto.idType,
        fullName: dto.fullName,
        email: dto.email,
        sex: dto.sex,
        civilStatus: dto.civilStatus,
        birthDate: dto.birthDate,
        phone: dto.phone,
        address: dto.address,
        neighborhood: dto.neighborhood,
        ministryId: dto.ministryId,
        membershipType: dto.membershipType,
        membershipDate: dto.membershipDate,
        status: dto.status,
        occupation: dto.occupation,
        photoUrl: dto.photoUrl,
        isBaptized: dto.isBaptized,
        populationGroup: dto.populationGroup,
        createdAt: new Date(),
      });

      const savedPerson = await this.personRepository.create(person);

      res.status(201).json({
        success: true,
        data: savedPerson,
        message: 'Persona creada exitosamente',
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const person = await this.personRepository.findById(id);
      if (!person) {
        res.status(404).json({
          success: false,
          error: 'Persona no encontrada',
        });
        return;
      }

      const updatedPerson = await this.personRepository.update(id, req.body);

      res.json({
        success: true,
        data: updatedPerson,
        message: 'Persona actualizada exitosamente',
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const deleted = await this.personRepository.delete(id);
      if (!deleted) {
        res.status(404).json({
          success: false,
          error: 'Persona no encontrada',
        });
        return;
      }

      res.json({
        success: true,
        message: 'Persona eliminada exitosamente',
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getByMinistry(req: Request, res: Response): Promise<void> {
    try {
      const { ministryId } = req.params;

      const persons = await this.personRepository.findByMinistry(ministryId);

      res.json({
        success: true,
        data: persons,
        total: persons.length,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  private handleError(res: Response, error: any): void {
    console.error('❌ Error en PersonController:', error);

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
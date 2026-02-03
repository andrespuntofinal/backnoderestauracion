import { DomainError } from './DomainError';

export class NotFoundError extends DomainError {
  code = 'NOT_FOUND';
  statusCode = 404;

  constructor(resource: string, identifier?: string) {
    const message = identifier 
      ? `${resource} con identificador ${identifier} no encontrado`
      : `${resource} no encontrado`;
    super(message);
  }
}
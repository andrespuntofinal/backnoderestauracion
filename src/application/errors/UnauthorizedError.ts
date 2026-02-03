import { DomainError } from './DomainError';

export class UnauthorizedError extends DomainError {
  code = 'UNAUTHORIZED';
  statusCode = 403;

  constructor(message: string = 'No tienes permiso para realizar esta acción') {
    super(message);
  }
}
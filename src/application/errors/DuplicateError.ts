import { DomainError } from './DomainError';

export class DuplicateError extends DomainError {
  code = 'DUPLICATE_ERROR';
  statusCode = 409;

  constructor(field: string, value: string) {
    super(`${field} '${value}' ya existe en el sistema`);
  }
}
import { DomainError } from './DomainError';

export class ValidationError extends DomainError {
  code = 'VALIDATION_ERROR';
  statusCode = 400;

  constructor(message: string) {
    super(message);
  }
}
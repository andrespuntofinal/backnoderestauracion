/**
 * Clase base para todos los errores del dominio
 * Permite diferenciar errores de negocio de errores técnicos
 */
export abstract class DomainError extends Error {
  abstract code: string;
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}
import {
  UserRepository,
  PersonRepository,
  MinistryRepository,
  CategoryRepository,
  TransactionRepository,
} from '../persistence/repositories';

/**
 * Contenedor de Inyección de Dependencias
 * Aquí se crean TODAS las instancias que necesita la aplicación
 * Garantiza que haya una única instancia de cada repositorio (Singleton)
 */
export class Container {
  private static instance: Container;

  // Repositorios - Singleton
  private userRepository: UserRepository;
  private personRepository: PersonRepository;
  private ministryRepository: MinistryRepository;
  private categoryRepository: CategoryRepository;
  private transactionRepository: TransactionRepository;

  private constructor() {
    // Inicializar repositorios
    this.userRepository = new UserRepository();
    this.personRepository = new PersonRepository();
    this.ministryRepository = new MinistryRepository();
    this.categoryRepository = new CategoryRepository();
    this.transactionRepository = new TransactionRepository();
  }

  /**
   * Obtener la instancia única del contenedor
   */
  public static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  /**
   * Getters para los repositorios
   */
  public getUserRepository(): UserRepository {
    return this.userRepository;
  }

  public getPersonRepository(): PersonRepository {
    return this.personRepository;
  }

  public getMinistryRepository(): MinistryRepository {
    return this.ministryRepository;
  }

  public getCategoryRepository(): CategoryRepository {
    return this.categoryRepository;
  }

  public getTransactionRepository(): TransactionRepository {
    return this.transactionRepository;
  }
}
import mongoose from 'mongoose';
import { env } from './env';

export class DatabaseConnection {
  static async connect(): Promise<void> {
    try {
      console.log('🔄 Conectando a MongoDB...');
      await mongoose.connect(env.mongodbUrl, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log('✅ MongoDB conectado correctamente');
    } catch (error) {
      console.error('❌ Error al conectar MongoDB:', error);
      process.exit(1);
    }
  }

  static async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log('✅ Desconexión de MongoDB completada');
    } catch (error) {
      console.error('❌ Error al desconectar MongoDB:', error);
    }
  }

  static isConnected(): boolean {
    return mongoose.connection.readyState === 1;
  }
}
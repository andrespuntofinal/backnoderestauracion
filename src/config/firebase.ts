import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';
import { env } from './env';

export class FirebaseConfig {
  private static instance: admin.app.App;

  static initialize(): admin.app.App {
    try {
      const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

      if (!serviceAccountJson) {
        throw new Error('❌ FIREBASE_SERVICE_ACCOUNT_JSON no está configurada');
      }

      const serviceAccount = JSON.parse(serviceAccountJson);

      this.instance = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: env.firebaseProjectId,
      });

      console.log('✅ Firebase Admin SDK inicializado correctamente');
      return this.instance;
    } catch (error) {
      console.error('❌ Error al inicializar Firebase:', error);
      process.exit(1);
    }
  }

  static getInstance(): admin.app.App {
    if (!this.instance) {
      return this.initialize();
    }
    return this.instance;
  }

  static getAuth(): admin.auth.Auth {
    return this.getInstance().auth();
  }
}
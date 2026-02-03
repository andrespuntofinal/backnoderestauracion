
import { DatabaseConnection, FirebaseConfig, env } from './config';
import { app } from './app';

// Exportar para acceso desde otros proyectos/módulos
export * from './config';
export * from './domain';

const PORT = env.port;

const startServer = async () => {
  try {
    // Conectar a MongoDB
    await DatabaseConnection.connect();

    // Inicializar Firebase
    FirebaseConfig.initialize();

    // Iniciar servidor Express
    app.listen(PORT, () => {
      console.log(`\n🚀 Servidor ComunidadPro ejecutándose en puerto ${PORT}`);
      console.log(`📍 URL: http://localhost:${PORT}`);
      console.log(`🔒 Ambiente: ${process.env.NODE_ENV || 'development'}\n`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();

// Manejo de errores no capturados
process.on('unhandledRejection', (reason: Error) => {
  console.error('❌ Promise rechazada sin manejar:', reason);
});

process.on('SIGINT', async () => {
  console.log('\n⏹️ Cerrando servidor...');
  await DatabaseConnection.disconnect();
  process.exit(0);
});
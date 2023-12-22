/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';

process.on('uncaughtException', err => {
  errorLogger.error(err);
  process.exit(1);
});

let server: Server;
async function bootstrap() {
  try {
    // connecting the database
    await mongoose.connect(config.database_url as string);
    logger.info(`✔️ Database connected`);

    // Listening the port
    server = app.listen(config.port, () => {
      logger.info(`✔️ Application listening on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error(`Database connection fail.`);
  }

  process.on('unhandledRejection', err => {
    console.log(
      'Unhandled rejection is detected, we are closing our server',
      err,
    );
    if (server) {
      server.close(() => {
        errorLogger.error(err);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});

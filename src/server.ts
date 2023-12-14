import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { logger, errorLogger } from './shared/logger'

async function bootstrap() {
  try {
    // connecting the database
    await mongoose.connect(config.database_url as string)
    logger.info(`✔️ Database connected`)

    // Listening the port
    app.listen(config.port, () => {
      logger.info(`✔️ Application listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error(`Database connection fail.`)
  }
}

bootstrap()

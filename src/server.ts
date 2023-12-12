import mongoose from 'mongoose'
import app from './app'
import config from './config'

async function bootstrap() {
  try {
    // connecting the database
    await mongoose.connect(config.database_url as string)
    console.log(`✔️ Database connected`)

    // Listening the port
    app.listen(config.port, () => {
      console.log(`✔️ Application listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(`Database connection fail.`)
  }
}

bootstrap()

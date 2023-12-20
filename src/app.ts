import cors from 'cors'
import express, { Application } from 'express'

import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/users/user.route'

const app: Application = express()

app.use(cors())

// parser
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

// Application route
app.use('/api/v1/users', UserRoutes)

// Testing route
app.get('/', async () => {
  // Promise.reject(new Error('Unhandled promise rejection'))
  // console.log(x)
})

app.use(globalErrorHandler)

export default app

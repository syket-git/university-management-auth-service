import cors from 'cors'
import express, { Application, Request, Response } from 'express'

import usersRouter from './app/modules/users/users.route'

const app: Application = express()

app.use(cors())

// parser
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

// Application route
app.use('/api/v1/users', usersRouter)

// Testing route
app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app

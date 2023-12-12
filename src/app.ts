import cors from 'cors'
import express, { Application, Request, Response } from 'express'

const app: Application = express()

app.use(cors())

// parser
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

// Testing route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app

import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';

import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';

const app: Application = express();

app.use(cors());

// parser
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Application route
app.use('/api/v1', routes);

// Testing route
app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Testing route',
  });
});

// global error handler
app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API not found',
      },
    ],
  });
  next();
});

export default app;

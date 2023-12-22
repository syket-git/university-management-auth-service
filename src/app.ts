import cors from 'cors';
import express, { Application } from 'express';

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
app.get('/', async () => {
  // Promise.reject(new Error('Unhandled promise rejection'))
  // console.log(x)
});

app.use(globalErrorHandler);

export default app;

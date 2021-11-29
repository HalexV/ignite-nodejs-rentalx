import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import databaseConnection from './database';
import './shared/container';
import { AppError } from './errors/AppError';
import { router } from './routes';
import swaggerFile from './swagger.json';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        message: error.message,
      });
    }

    console.error(error.message);

    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
);

databaseConnection
  .then(() => {
    console.log('Database connected');
    app.listen(3333, () => console.log('Server is running!'));
  })
  .catch((error) => {
    console.error('Error: ', error.message);
  });

import express from 'express';
import swaggerUi from 'swagger-ui-express';

import databaseConnection from './database';
import { router } from './routes';
import swaggerFile from './swagger.json';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

databaseConnection
  .then(() => {
    console.log('Database connected');
    app.listen(3333, () => console.log('Server is running!'));
  })
  .catch((error) => {
    console.error('Error: ', error.message);
  });

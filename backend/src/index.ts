import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import propertyRoutes from './routes/propertyRoutes';
import { Property } from './entities/Property';


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const startServer = async () => {
  const connection = await createConnection({
    name: 'default',
    type: 'sqlite',
    database: 'db.sqlite',
    synchronize: true,
    logging: false,
    entities: [Property],
  });

  connection.query(`PRAGMA table_info(property)`)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

  app.use(cors());
  app.use(express.json());
  app.use('/api', propertyRoutes);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();


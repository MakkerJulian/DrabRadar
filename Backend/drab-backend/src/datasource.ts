import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';
dotenv.config();

const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres123',
  database: 'postgres',

  entities: ['src/typeorm/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
});

export default PostgresDataSource;

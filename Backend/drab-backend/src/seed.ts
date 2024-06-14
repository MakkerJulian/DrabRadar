import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { runSeeders } from 'typeorm-extension';
import WeatherDataSeeder from './api/weatherdata/seeder';
(async () => {
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
  await PostgresDataSource.initialize();

  runSeeders(PostgresDataSource, {
    seeds: [WeatherDataSeeder],
    factories: ['src/**/*.factory.ts'],
  });
})();

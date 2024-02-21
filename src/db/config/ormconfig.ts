import 'dotenv/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: true,
  },
  synchronize: false,
};

export const dataSource = new DataSource(
  Object.assign(typeOrmModuleOptions as DataSourceOptions, {
    entities: ['src/**/entities/*.entity.ts'],
    migrations: ['src/db/migrations/*.ts'],
  }),
);

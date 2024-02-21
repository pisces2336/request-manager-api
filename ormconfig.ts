import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
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
  entities: ['dist/src/**/entities/*.entity.js'],
  migrations: ['dist/src/migrations/*.js'],
};

export const dataSource = new DataSource(
  typeOrmModuleOptions as DataSourceOptions,
);

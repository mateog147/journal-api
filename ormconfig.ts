import { DataSource } from 'typeorm';

const source = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_DB_HOST,
  port: 3306,
  username: process.env.MYSQL_DB_USER,
  password: process.env.MYSQL_DB_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
  entities: ['src/journal/infrastructure/**/*.entity.ts'],
  migrations: [
    'src/journal/infrastructure/driven-adapters/mysql/migrations/*.{ts,js}',
  ],
  synchronize: false,
  migrationsRun: true,
  logging: true,
  extra: {
    ssl:
      process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
  },
});

export default source;

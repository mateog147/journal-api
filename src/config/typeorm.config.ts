import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Entry } from 'src/journal/infrastructure/driven-adapters/mysql/entities/entry.entity';
import { Migration1735419383516 } from 'src/journal/infrastructure/driven-adapters/mysql/migrations/1735419383516-migration';
config();

const configService = new ConfigService();

const AppDataSource = new DataSource({
  type: 'mysql',
  host: configService.get<string>('MYSQL_DB_HOST'),
  port: 3306,
  username: configService.get<string>('MYSQL_DB_USER'),
  password: configService.get<string>('MYSQL_DB_PASSWORD'),
  database: configService.get<string>('MYSQL_DB_NAME'),
  entities: [Entry],
  migrations: [Migration1735419383516],
  synchronize: false,
  migrationsRun: false,
  logging: true,
});

export default AppDataSource;

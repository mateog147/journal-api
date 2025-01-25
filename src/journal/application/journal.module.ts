import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  AuthController,
  AuthService,
  EntryController,
  EntryService,
  UserController,
  UserService,
} from '../infrastructure/entry-points';
import {
  CreateEntryUseCase,
  CreateUserUseCase,
  GetEntriesByDateUseCase,
  GetUserByEmailUseCase,
  GetUserByIdUseCase,
  UpdateEntryUseCase,
  ValidateUserPasswordUseCase,
} from '../domain/use-cases';
import { EntryDb, UserDb } from '../domain/model';
import { UserDbService } from '../infrastructure/driven-adapters/mongo-database/user/user-db.service';
import {
  User,
  UserSchema,
} from '../infrastructure/driven-adapters/mongo-database/user/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../shared/jwt.constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntryDbService } from '../infrastructure/driven-adapters/mysql/entry.db.service';
import { Entry } from '../infrastructure/driven-adapters/mysql/entities/entry.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2h' },
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: `mongodb+srv://${process.env.MONGO_DATABASE_USER}:${process.env.MONGO_DATABASE_PASSWORD}@${process.env.MONGO_DB_CLUSTER}`,
      }),
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('MYSQL_DB_HOST'),
        port: 3306,
        username: config.get<string>('MYSQL_DB_USER'),
        password: config.get<string>('MYSQL_DB_PASSWORD'),
        database: config.get<string>('MYSQL_DB_NAME'),
        entities: [Entry],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Entry]),
  ],
  controllers: [UserController, AuthController, EntryController],
  providers: [
    UserService,
    AuthService,
    EntryService,
    GetUserByEmailUseCase,
    CreateUserUseCase,
    GetUserByIdUseCase,
    ValidateUserPasswordUseCase,
    CreateEntryUseCase,
    UpdateEntryUseCase,
    GetEntriesByDateUseCase,
    { provide: UserDb, useClass: UserDbService },
    { provide: EntryDb, useClass: EntryDbService },
  ],
})
export class JournalModule {}

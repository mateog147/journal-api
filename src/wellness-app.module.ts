import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JournalModule } from './journal/application/journal.module';
import { MetaServiceModule } from './journal/infrastructure/meta-service/meta-service.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JournalModule,
    MetaServiceModule,
  ],
})
export class WellnessAppModule {}

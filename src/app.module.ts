import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { LoggerModule } from './providers/logger/logger.module';
import { DatabaseModule } from './database/postgress-sql/connection.db';
import { AuthModule } from './authantication/auth.module';
import { ModulesModule } from './modules/modules.module';
import { MailService } from './providers/mail/mail.service';
import { MailModule } from './providers/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV == 'development'
          ? '.development.env'
          : '.production.env',
      cache: true,
      expandVariables: true,
      load: configuration,
    }),
    LoggerModule,
    DatabaseModule,
    AuthModule,
    ModulesModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}

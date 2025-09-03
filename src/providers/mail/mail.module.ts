import { Module } from '@nestjs/common';
import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { LoggerService } from '../logger/logger.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        ({
          transport: {
            service: 'gmail',
            // secure: false, // Use TLS or not
            auth: {
              user: 'teacheronupgrade@gmail.com',
              pass: 'cunb qcfe gzhz adjj',
            },
          },
          defaults: {
            from: '"TeacherOn" <teacheronupgrade@gmail.com>',
          },
          template: {
            dir: process.cwd() + '/src/utils/templates/',
            adapter: new HandlebarsAdapter(),
            options: {
              strict: false,
            },
          },
        }) as MailerOptions,
    }),
  ],
  providers: [MailService, LoggerService],
  exports: [MailService],
})
export class MailModule {}

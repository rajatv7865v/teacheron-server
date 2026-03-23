import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserService } from 'src/modules/user/user.service';
import { UserModule } from 'src/modules/user/user.module';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { GoogleStrategy } from './strategy/google.strategy';
import { MailService } from 'src/providers/mail/mail.service';
import type { StringValue } from 'ms';
// import { SmsService } from 'src/providers/sms/sms.service';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const expiresInValue =
          configService.get<string>('JWT_EXPIRES_IN') || '3600s';
        const parsedExpiresIn = Number(expiresInValue);

        return {
        secret: configService.get<string>('JWT_SECRET') || 'Secret key',
        signOptions: {
            expiresIn: Number.isNaN(parsedExpiresIn)
              ? (expiresInValue as StringValue)
              : parsedExpiresIn,
        },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    MailService,
  ],
  exports: [AuthService],
})
export class AuthModule {}

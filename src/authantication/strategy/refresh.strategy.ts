import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, JwtFromRequestFunction } from 'passport-jwt';
import { Request } from 'express';
import { AuthService } from '../auth.service';

const extractJwtFromCookie: JwtFromRequestFunction = (req: any) => {
  if (req.cookies && 'auth_token' in req.cookies) {
    return req.cookies['auth_token'].access_token;
  }
  return null;
};

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        extractJwtFromCookie,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: true,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any): Promise<any> {
    try {
      if (!payload) {
        throw new BadRequestException('Invalid jwt token');
      }
      let refreshToken = req.cookies['auth_token'].refresh_token;

      if (!refreshToken) {
        throw new BadRequestException('Invalid refresh token');
      }
      //   let user = await this.authService.validRefreshToken(
      //     payload?.email,
      //     refreshToken,
      //   );
      //   if (!user) {
      //     throw new BadRequestException('Refresh Token Expired');
      //   }
      //   return user;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}

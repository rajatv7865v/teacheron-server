import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    try {
      const user = await this.authService.validateUser(email);
      if (!user) {
        throw new UnauthorizedException('Email not Found!');
      }
      const isMatch = await this.authService.compare(password, user.password);
      if (!isMatch) {
        throw new UnauthorizedException('Password not matched!');
      }
      if (user.isVerify === false) {
        {
          throw new UnauthorizedException('User is not verified!');
        }
      }
      // const isActive = user?.status;
      // if (!isActive) {
      //   throw new UnauthorizedException(
      //     'User have not Permission to login Portal!',
      //   );
      // }
      return {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        role: user?.role,
        isAdmin: user?.isAdmin || false,
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}

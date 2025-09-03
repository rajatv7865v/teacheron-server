//auth.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDTO } from './dto/user-register.dto';
import { UserService } from 'src/modules/user/user.service';
import * as bcrypt from 'bcrypt';
import { CustomHttpException } from 'src/core/exceptions';
import { genderType, UserRole } from 'src/modules/user/entity/user.entity';
import { MailService } from 'src/providers/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  async validateUser(email: string): Promise<any> {
    const user = await this.userService.findUser(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async login(user: any): Promise<any> {
    const payload = { email: user.email, id: user._id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async registerUser(user: RegisterUserDTO) {
    try {
      const existingUser = await this.userService.findUser(user.email);
      if (existingUser) {
        throw new BadRequestException('Email already exists');
      }

      const hashedPassword = await this.hashPassword(user.password);
      const newUser = {
        ...user,
        password: hashedPassword,
      };

      const response: any = await this.userService.register(newUser);
      this.mailService.sendMail(
        response.email,
        'Account Verification',
        'verifyAccount',
        {
          name: newUser.name,
          verificationLink: `http://localhost:8080/api/v1/auth/verify-account?verificationCode=${response?.id}`,
        },
      );
      return this.login(user);
    } catch (error) {
      throw new CustomHttpException(error.message);
    }
  }

  //GOoGLE Login
  async upsertGoogleUser(g: {
    googleId: string;
    email?: string;
    name?: string;
    avatar?: string;
  }) {
    const user: any = this.userService.findUserByGoogle(g);
    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.login(payload);
    return { user, accessToken };
  }

  async verifyCode(verificationCode: any) {
    const user: any =
      await this.userService.findByIdAndVerify(verificationCode);

    return user;
  }
}

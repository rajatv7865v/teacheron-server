import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  Request,
  Res,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CustomHttpException } from 'src/core/exceptions';
import { RegisterUserDTO } from './dto/user-register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SignInDTO } from './dto/signIn.dto';
import { GoogleAuthGuard } from './guards/google.guard';
import { ConfigService } from '@nestjs/config';

@ApiTags('User')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly cfg: ConfigService,
    // private smsService: SmsService,
  ) {}

  @ApiCookieAuth('access-token')
  @ApiOperation({
    summary: 'Validate User Login',
    description: 'If User does not exist, it returns status 0; otherwise, 1',
  })
  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  @UseGuards(LocalAuthGuard)
  async validateUserForLogin(
    @Request() { user }: any,
    @Body() signInDTO: SignInDTO,
    @Response() res: any,
  ): Promise<void> {
    try {
      const data = await this.authService.login(user);

      res.cookie('access-token', data?.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'Lax',
        maxAge: 3600000, // 1 hour
      });

      res.status(200).json({
        message: 'User Login Successfully!',
        access_token: data?.access_token,
        data: user,
      });
    } catch (error) {
      throw new CustomHttpException(error);
    }
  }

  @ApiOperation({
    summary: 'Register a new user',
    description: 'Creates a user and returns the created user data.',
  })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(
    @Body() registerUserDTO: RegisterUserDTO,
  ): Promise<any | BadRequestException> {
    return this.authService.registerUser(registerUserDTO);
  }

  //Login with google
  // Step 1: redirect user to Google
  @ApiOperation({
    summary: 'Login With Google _Redirec API',
    description: 'Creates a user and returns the created user data.',
  })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(GoogleAuthGuard)
  @Get('google')
  async googleAuth() {
    console.log('first');
    // Passport handles the redirect to Google
  }

  // Step 2: Google redirects here

  @ApiOperation({
    summary: 'Login with google callback',
    description: 'Creates a user and returns the created user data.',
  })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @HttpCode(HttpStatus.CREATED)
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req: any, @Res() res: any) {
    // req.user comes from GoogleStrategy.validate
    const { accessToken, user } = await this.authService.upsertGoogleUser(
      req.user as any,
    );

    // Option A: redirect back to front-end with token in query/hash
    const redirectUrl =
      this.cfg.get<string>('POST_LOGIN_REDIRECT') ||
      'http://localhost:5173/auth/callback';

    return res.redirect(
      `${redirectUrl}?token=${encodeURIComponent(accessToken)}&uid=${user.id}`,
    );

    // Option B (API only): return JSON
    // return res.json({ accessToken, user });
  }

  // Verify By a email
  @ApiOperation({
    summary: 'Verify Account By Email.',
    description: 'Sends a verification email to the user.',
  })
  @ApiQuery({ name: 'verificationCode', required: true })
  @ApiResponse({ status: 201, description: 'Account Verify Succesfully!.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @HttpCode(HttpStatus.CREATED)
  @Get('verify-account')
  async verifyAccount(@Query('verificationCode') verificationCode: string) {
    try {
      return await this.authService.verifyCode(verificationCode);
    } catch (error) {
      throw new CustomHttpException(error.message, error.status);
    }
  }
}

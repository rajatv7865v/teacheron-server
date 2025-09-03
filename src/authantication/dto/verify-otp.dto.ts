import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class VerifyOTPDTO {
  @ApiProperty({
    example: '+91 00000-00000',
    required: true,
  })
  @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    example: '000000',
    required: true,
    description: 'It takes 6 digit OTP',
  })
  @IsString()
  @IsNotEmpty()
  otp: string;
}

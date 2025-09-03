import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsStrongPassword,
} from 'class-validator';

export class SignInDTO {
  @ApiProperty({
    example: 'rajat@budgetreecs.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'rajat123@',
    required: true,
  })
  // @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}

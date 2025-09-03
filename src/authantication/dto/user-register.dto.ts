import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../enum/rule.enum';

export class RegisterUserDTO {
  @ApiProperty({
    example: 'John Doe',
    required: true,
    description: 'It takes your name which register in PAN',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'someone@example.com',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Someone123@#',
    required: true,
    description: 'It takes as Strong',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'student',
    required: true,
    description: 'It takes user role',
    enum: UserRole,
  })
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole = UserRole.STUDENT;
}

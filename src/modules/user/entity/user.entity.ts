// user.entity.ts
import { generateOTP } from 'src/utils/helper';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export enum UserRole {
  STUDENT = 'student',
  ADMIN = 'admin',
  TEACHER = 'teacher',
}

export enum genderType {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isVerify: boolean;

  @Column({ enum: UserRole })
  role: UserRole;

  @Column({ enum: genderType, nullable: true })
  gender: genderType;

  @Column({ nullable: true, unique: true })
  googleId?: string;
}

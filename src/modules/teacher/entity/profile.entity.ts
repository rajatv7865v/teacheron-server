// user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Teacher } from './techer.entity';

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
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  profilePhoto: string;

  @Column()
  introductionVideo: string;

  // Many subjects belong to one teacher
  @OneToOne(() => Teacher, (teacher) => teacher.profile, {
    onDelete: 'CASCADE',
  })
  teacher: Teacher;
}

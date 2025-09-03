// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
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
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  fromLevel: string;

  @Column()
  toLevel: string;

  // Many subjects belong to one teacher
  @ManyToOne(() => Teacher, (teacher) => teacher.subjects, {
    onDelete: 'CASCADE',
  })
  teacher: Teacher;
}

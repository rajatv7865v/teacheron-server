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
export class Education {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  instituteName: string;

  @Column()
  degreeType: string;

  @Column()
  degreeName: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column()
  association: string;

  @Column()
  speciality: string;

  @Column()
  score: string;

  // Many subjects belong to one teacher
  @ManyToOne(() => Teacher, (teacher) => teacher.educations, {
    onDelete: 'CASCADE',
  })
  teacher: Teacher;
}

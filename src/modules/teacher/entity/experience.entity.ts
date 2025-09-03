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
export class Experience {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  organizationName: string;

  @Column()
  designation: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column()
  association: string;

  @Column()
  responsibility: string;

  // Many subjects belong to one teacher
  @ManyToOne(() => Teacher, (teacher) => teacher.experiences, {
    onDelete: 'CASCADE',
  })
  teacher: Teacher;
}

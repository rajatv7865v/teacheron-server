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
export class Requirements {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chargeType: string;

  @Column()
  minFee: string;

  @Column()
  maxFee: string;

  @Column()
  feeDetails: string;

  @Column()
  totalExp: string;

  @Column()
  totalTeachingExp: string;

  @Column()
  onlineTeachingExp: string;

  @Column()
  availabilityHours: string;

  @Column()
  willingToTravel: boolean;

  @Column()
  avlForOnlineTeaching: boolean;

  @Column()
  haveDigitalPen: boolean;

  @Column()
  fullTimeEmployee: boolean;

  @Column()
  opportunity: string;

  @Column()
  profileDesc: string;

  // Many subjects belong to one teacher
  @ManyToOne(() => Teacher, (teacher) => teacher.requirement, {
    onDelete: 'CASCADE',
  })
  teacher: Teacher;
}

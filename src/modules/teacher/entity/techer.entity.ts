// user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Subject } from './subject.entity';
import { Education } from './education.entity';
import { Experience } from './experience.entity';
import { Requirements } from './requirements.entity';
import { Profile } from './profile.entity';
import { User } from 'src/modules/user/entity/user.entity';

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
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  currentRole: string;

  @Column()
  gender: string;

  @Column()
  dateOfBirth: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  postalCode: string;

  @Column()
  phoneNumber: string;

  // One teacher can have many subjects
  @OneToMany(() => Subject, (subject) => subject.teacher)
  subjects: Subject[];

  @OneToMany(() => Education, (education) => education.teacher, {
    cascade: true,
  })
  educations: Education[];

  @OneToMany(() => Experience, (experience) => experience.teacher, {
    cascade: true,
  })
  experiences: Experience[];

  @OneToOne(() => Requirements, (requirements) => requirements.teacher)
  requirement: Requirements;

  @OneToOne(() => Profile, (profile) => profile.teacher)
  profile: Profile;

  @OneToOne(() => User, (user) => user.id)
  user: User;
}

import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entity/techer.entity';
import { Education } from './entity/education.entity';
import { Experience } from './entity/experience.entity';
import { Profile } from './entity/profile.entity';
import { Requirements } from './entity/requirements.entity';
import { Subject } from './entity/subject.entity';
import { CustomHttpException } from 'src/core/exceptions';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
    @InjectRepository(Education)
    private readonly educationRepo: Repository<Education>,
    @InjectRepository(Experience)
    private readonly experienceRepo: Repository<Experience>,
    @InjectRepository(Profile)
    private readonly profileRepo: Repository<Profile>,
    @InjectRepository(Requirements)
    private readonly requirementsRepo: Repository<Requirements>,
    @InjectRepository(Subject)
    private readonly subjectRepo: Repository<Subject>,
  ) {}
  async createTeacherAccount(
    createTeacherDto: CreateTeacherDto,
  ): Promise<string> {
    try {
      const {
        address,
        currentRole,
        dateOfBirth,
        educations,
        expectation,
        experience,
        gender,
        phoneNumber,
        subjects,
      } = createTeacherDto;

      // 1️⃣ Check if teacher already exists (e.g. by phoneNumber or id)
      let teacher = await this.teacherRepository.findOne({
        where: { phoneNumber }, // adjust your unique field
        relations: ['educations', 'experiences', 'requirement', 'subjects'],
      });
      console.log('teacher:', phoneNumber);
      if (teacher) {
        // 2️⃣ Update existing teacher
        teacher.currentRole = currentRole;
        teacher.gender = gender;
        teacher.dateOfBirth = dateOfBirth;
        teacher.address = address;
        teacher.phoneNumber = phoneNumber;

        teacher = await this.teacherRepository.save(teacher);
      } else {
        // 3️⃣ Create new teacher
        teacher = this.teacherRepository.create({
          currentRole,
          gender,
          dateOfBirth,
          address,
          phoneNumber,
        });
        teacher = await this.teacherRepository.save(teacher);
      }

      // 4️⃣ Clear and re-add related entities (simple approach)
      if (educations?.length) {
        await this.educationRepo.delete({ teacher: { id: teacher.id } }); // remove old
        const educationEntities = this.educationRepo.create(
          educations.map((edu) => ({ ...edu, teacher })),
        );
        await this.educationRepo.save(educationEntities);
      }

      if (experience?.length) {
        await this.experienceRepo.delete({ teacher: { id: teacher.id } });
        const experienceEntities = this.experienceRepo.create(
          experience.map((exp) => ({ ...exp, teacher })),
        );
        await this.experienceRepo.save(experienceEntities);
      }

      if (expectation?.length) {
        await this.requirementsRepo.delete({ teacher: { id: teacher.id } });
        const requirementEntities = this.requirementsRepo.create(
          expectation.map((exp) => ({ ...exp, teacher })),
        );
        await this.requirementsRepo.save(requirementEntities);
      }
      if (subjects?.length) {
        await this.subjectRepo.delete({ teacher: { id: teacher.id } });
        const subjectEntities = this.subjectRepo.create(
          subjects.map((sub) => ({ ...sub, teacher })),
        );
        await this.subjectRepo.save(subjectEntities);
      }

      return teacher.id
        ? 'Teacher account updated!'
        : 'Teacher account created!';
    } catch (error) {
      console.error(error);
      throw new CustomHttpException(error.message, error.status);
    }
  }
}

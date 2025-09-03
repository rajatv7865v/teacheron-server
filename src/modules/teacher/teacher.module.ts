import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entity/techer.entity';
import { Profile } from './entity/profile.entity';
import { Requirements } from './entity/requirements.entity';
import { Experience } from './entity/experience.entity';
import { Education } from './entity/education.entity';
import { Subject } from './entity/subject.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Teacher,
      Profile,
      Requirements,
      Subject,
      Experience,
      Education,
    ]),
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}

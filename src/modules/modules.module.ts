import { Module } from '@nestjs/common';
import { TeacherModule } from './teacher/teacher.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TeacherModule, UserModule],
  controllers: [],
  providers: [],
})
export class ModulesModule {}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTeacherDto } from './dto/create-teacher.dto';

@ApiTags('teacher')
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @ApiOperation({ summary: 'Create a new teacher' })
  @Post()
  createTeacherAccount(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.createTeacherAccount(createTeacherDto);
  }
}

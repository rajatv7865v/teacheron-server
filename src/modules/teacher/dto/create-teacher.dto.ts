import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

class Subjects {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fromLevel: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  toLevel: string;
}

class Educations {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  instituteName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  degreeType: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  degreeName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  endDate: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  association: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  speciality: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  score: string;
}
class Experience {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  organizationName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  designation: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  endDate: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  association: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  responsibility: string;
}
class Expectation {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  chargeType: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  minFee: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  maxFee: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  feeDetails: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  totalExp: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  totalTeachingExp: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  onlineTeachingExp: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  availabilityHours: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  willingToTravel: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  avlForOnlineTeaching: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  haveDigitalPen: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  helpWithAssignments: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  fullTimeEmployee: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  opportunity: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  profileDesc: string;
}

export class CreateTeacherDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  currentRole: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  dateOfBirth: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ type: [Subjects] })
  subjects: Subjects[];

  @ApiProperty({ type: [Educations] })
  educations: Educations[];

  @ApiProperty({ type: [Experience] })
  experience: Experience[];

  @ApiProperty({ type: [Expectation] })
  expectation: Expectation[];
}

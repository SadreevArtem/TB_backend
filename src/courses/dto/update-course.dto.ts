import { PartialType } from '@nestjs/mapped-types';

import { IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { CreateCourseDto } from './create-course.dto';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
  @IsString()
  @Length(1, 255)
  @IsOptional()
  name: string;
  @IsString()
  @IsUrl()
  @IsOptional()
  image: string;
  @IsString()
  @Length(1, 1024)
  @IsOptional()
  description: string;
}

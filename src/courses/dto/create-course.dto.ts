import { IsString, IsUrl, Length } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @Length(1, 255)
  name: string;
  @IsString()
  @IsUrl()
  image: string;
  @IsString()
  @Length(1, 1024)
  description: string;
}
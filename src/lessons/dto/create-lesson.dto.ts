import { IsInt, IsString, IsUrl, Length } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  @Length(1, 255)
  title: string;
  @IsString()
  @IsUrl()
  image: string;
  @IsString()
  @Length(1, 1024)
  content: string;
  @IsInt()
  courseId: number;
  @IsInt()
  orderNumber: number;
}
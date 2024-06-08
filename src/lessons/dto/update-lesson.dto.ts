import { IsInt, IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class UpdateLessonDto {
  @IsString()
  @IsOptional()
  @Length(1, 255)
  title: string;
  @IsString()
  @IsOptional()
  @IsUrl()
  image: string;
  @IsString()
  @IsOptional()
  @Length(1, 1024)
  content: string;
  @IsInt()
  @IsOptional()
  orderNumber: number;
}
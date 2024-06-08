import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { CoursesService } from 'src/courses/courses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/courses/entities/course.entity';
import { UserCourseProgress } from 'src/progress/entities/progress.entity';
import { UserLessonProgress } from 'src/user-lesson-progress/entities/user-lesson-progress.entity';
import { Lesson } from './entities/lesson.entity';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Course,UserCourseProgress,UserLessonProgress,Lesson])],
  providers: [LessonsService, CoursesService],
  controllers: [LessonsController]
})
export class LessonsModule {}

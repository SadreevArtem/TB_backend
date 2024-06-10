import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { CoursesService } from './courses.service';
import { UserCourseProgress } from 'src/progress/entities/progress.entity';
import { UserLessonProgress } from 'src/user-lesson-progress/entities/user-lesson-progress.entity';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule,TypeOrmModule.forFeature([User, Course, UserCourseProgress,UserLessonProgress,Lesson])],
  providers: [CoursesService],
  controllers: [CoursesController]
})
export class CoursesModule {}

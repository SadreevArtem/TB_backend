import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { UserCourseProgress } from 'src/progress/entities/progress.entity';
import { UserLessonProgress } from 'src/user-lesson-progress/entities/user-lesson-progress.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './entities/course.entity';
import { UpdateCourseDto } from './dto/update-course.dto';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class CoursesService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(UserCourseProgress)
    private userCourseProgressRepository: Repository<UserCourseProgress>,
    @InjectRepository(UserLessonProgress)
    private userLessonProgressRepository: Repository<UserLessonProgress>,
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    
  ) {}

  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = this.courseRepository.create(createCourseDto);
    return this.courseRepository.save(course);
  }

  async findAllCourses(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  async updateCourse(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const course = await this.findOneCourse(id);
    Object.assign(course, updateCourseDto);
    return this.courseRepository.save(course);
  }

  async findOneCourse(id: number): Promise<Course> {
    return await this.courseRepository.findOne({ where: {id}, relations: {lessons: true} });
  }

  async removeCourse(id: number): Promise<void> {
    const course = await this.findOneCourse(id);
    await this.courseRepository.remove(course);
  }

  async startCourse(userId: number, courseId: number): Promise<void> {
    const course = await this.courseRepository.findOneBy({id: courseId});
    const user = await this.usersService.findById(userId);
     await this.userCourseProgressRepository.save({
      user,
      course,
      status: 'in_progress',
      startedAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async startLesson(userId: number, lessonId: number, courseId: number): Promise<any> {
    const user = await this.usersService.findById(userId);
    const course = await this.courseRepository.findOneBy({id: courseId});
    const lesson = await this.lessonRepository.findOne({
      where: { id: lessonId },
    });
    await this.userLessonProgressRepository.save({
      user,
      lesson,
      course,
      status: 'in_progress',
      startedAt: new Date(),
      updatedAt: new Date(),
    });
    return {
      startLesson: lessonId
    }
  }

  async completeLesson(userId: number, lessonId: number): Promise<any> {
    await this.userLessonProgressRepository.update({ user: { id: userId }, lesson: { id: lessonId } }, {
      status: 'completed',
      completedAt: new Date(),
      updatedAt: new Date(),
    });

    const lesson = await this.lessonRepository.findOne({
      where: { id: lessonId },
      relations: { course: true },
    });
    const courseId = lesson.course.id;

    const totalLessons = await this.lessonRepository.count({
      where: { course: { id: courseId } },
    });
    const completedLessons = await this.userLessonProgressRepository.count({ where: {user: {id: userId}, status: 'completed', lesson: {course: {id:courseId}}} });
    const completeCorse = totalLessons === completedLessons

    if (completeCorse) {
      await this.userCourseProgressRepository.update({ user: { id: userId }, course: { id: courseId } }, {
        status: 'completed',
        completedAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return {
      completeLesson: lessonId,
      completeCorse
    }
  }
}

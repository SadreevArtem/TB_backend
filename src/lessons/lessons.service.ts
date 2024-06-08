import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { CoursesService } from 'src/courses/courses.service';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
    private readonly coursesServices: CoursesService
  ) {}

  async createLesson(createLessonDto: CreateLessonDto, courseId: number): Promise<Lesson> {
    const course = await this.coursesServices.findOneCourse(courseId) ;
    const lesson = await this.lessonRepository.create({...createLessonDto, course});
    return this.lessonRepository.save(lesson);
  }

  async findAllLessons(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  async findOneLesson(id: number): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOneBy({id});
    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }
    return lesson;
  }

  async updateLesson(id: number, updateLessonDto: UpdateLessonDto): Promise<Lesson> {
    const lesson = await this.findOneLesson(id);
    Object.assign(lesson, updateLessonDto);
    return this.lessonRepository.save(lesson);
  }

  async removeLesson(id: number): Promise<void> {
    const lesson = await this.findOneLesson(id);
    await this.lessonRepository.remove(lesson);
  }
}


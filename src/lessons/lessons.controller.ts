import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CoursesService } from 'src/courses/courses.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { LessonsService } from './lessons.service';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Controller("lessons")
export class LessonsController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly lessonsService: LessonsService
  ) {}
  @Post()
  async create(@Body() createLessonDto: CreateLessonDto) {
    const {courseId} = createLessonDto;
    return this.lessonsService.createLesson(createLessonDto, courseId);
  }
  @Get()
  async findAll() {
    return this.lessonsService.findAllLessons();
  }
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.lessonsService.findOneLesson(id);
  }
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.updateLesson(id, updateLessonDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.lessonsService.removeLesson(id);
  }

  @Post(":lessonId/start")
  async startLesson(
    @Param("lessonId") lessonId: number,
    @Body("userId") userId: number, 
    @Body("courseId") courseId: number,
  ): Promise<void> {
    await this.coursesService.startLesson(userId, lessonId, courseId);
  }

  @Post(":lessonId/complete")
  async completeLesson(
    @Param("lessonId") lessonId: number,
    @Body("userId") userId: number,
  ): Promise<void> {
    await this.coursesService.completeLesson(userId, lessonId);
  }
}

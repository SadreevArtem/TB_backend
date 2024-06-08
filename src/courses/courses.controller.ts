import { Controller, Post, Param, Body, Get, Put, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';


@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.createCourse(createCourseDto);
  }

  @Get()
  async findAll() {
    return this.coursesService.findAllCourses();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.coursesService.findOneCourse(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.updateCourse(id, updateCourseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.coursesService.removeCourse(id);
  }

  @Post(':courseId/start')
  async startCourse(@Param('courseId') courseId: number, @Body('userId') userId: number): Promise<void> {
    await this.coursesService.startCourse(userId, courseId);
  }
}


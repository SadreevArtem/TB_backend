import { Controller, Post, Param, Body, Get, Put, Delete, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { User } from 'src/users/entities/user.entity';
import { AuthUser } from 'src/common/decorators/user.decorator';
import { JwtGuard } from 'src/guard/jwt.guard';


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

  @UseGuards(JwtGuard)
  @Get(':courseId/lessons-status')
  async getStatusLessons(@AuthUser() user: User, @Param('courseId') courseId: number){
    return this.coursesService.lessonsProgress(user.id, courseId)
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


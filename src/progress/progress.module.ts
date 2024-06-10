import { Module } from '@nestjs/common';
import { UserCourseProgressController } from './progress.controller';
import { UserCourseProgressService } from './progress.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCourseProgress } from './entities/progress.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserCourseProgress])],
  controllers: [UserCourseProgressController],
  providers: [UserCourseProgressService]
})
export class UserCourseProgressModule {}

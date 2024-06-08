import { Module } from '@nestjs/common';
import { UserCourseProgressController } from './progress.controller';
import { UserCourseProgressService } from './progress.service';

@Module({
  controllers: [UserCourseProgressController],
  providers: [UserCourseProgressService]
})
export class UserCourseProgressModule {}

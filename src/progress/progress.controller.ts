import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserCourseProgressService } from './progress.service';
import { AuthUser } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { JwtGuard } from 'src/guard/jwt.guard';

@Controller('user-course-progress')
export class UserCourseProgressController {
    constructor(private readonly userCourseProgressService: UserCourseProgressService) {}
    @UseGuards(JwtGuard)
    @Get('my')
    findAllMy(@AuthUser() user: User) {
        
    return this.userCourseProgressService.findAll({
        select: {
            course: {
                id: true,
                name: true
            }
        },
        where: {
            user: {id: user.id},
        },
        relations: {
            user: true,
            course: true
        }
    });
  }
}

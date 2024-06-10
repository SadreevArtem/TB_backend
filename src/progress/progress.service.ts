import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { UserCourseProgress } from './entities/progress.entity';

@Injectable()
export class UserCourseProgressService {
  constructor(
    @InjectRepository(UserCourseProgress)
    private userCourseProgressRepository: Repository<UserCourseProgress>
  ) {}
  async findAll(query?: FindOneOptions<UserCourseProgress>) {
      const progress = await this.userCourseProgressRepository.find(query);
    return progress;
  }
}

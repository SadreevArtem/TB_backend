import { IsUrl, Length } from 'class-validator';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { UserCourseProgress } from 'src/progress/entities/progress.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @Length(1, 250)
  name: string;
  @Column()
  @IsUrl()
  image: string;
  @Column()
  @Length(1, 1024)
  description: string;
  @OneToMany(() => Lesson, lesson => lesson.course)
  lessons: Lesson[];
  @OneToMany(() => UserCourseProgress, progress => progress.course)
  userProgress: UserCourseProgress[];
  @Column()
  @CreateDateColumn()
  createdAt: Date;
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}

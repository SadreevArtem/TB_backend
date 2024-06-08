import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Course } from 'src/courses/entities/course.entity';

@Entity()
@Unique(['user', 'course'])
export class UserCourseProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.courseProgress)
  user: User;

  @ManyToOne(() => Course, course => course.userProgress)
  course: Course;

  @Column({ default: 'not_started' })
  status: 'not_started' | 'in_progress' | 'completed';

  @Column({ nullable: true })
  startedAt: Date;

  @Column({ nullable: true })
  completedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

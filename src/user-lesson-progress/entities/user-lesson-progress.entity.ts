import { Lesson } from 'src/lessons/entities/lesson.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm';


@Entity()
@Unique(['user', 'lesson'])
export class UserLessonProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.lessonProgress)
  user: User;

  @ManyToOne(() => Lesson, lesson => lesson.userProgress)
  lesson: Lesson;

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

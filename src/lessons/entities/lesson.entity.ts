import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Course } from 'src/courses/entities/course.entity';
import { UserLessonProgress } from 'src/user-lesson-progress/entities/user-lesson-progress.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course, course => course.lessons)
  course: Course;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column()
  orderNumber: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => UserLessonProgress, progress => progress.lesson)
  userProgress: UserLessonProgress[];
}

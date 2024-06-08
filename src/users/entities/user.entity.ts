import { IsEmail, Length } from 'class-validator';
import { UserCourseProgress } from 'src/progress/entities/progress.entity';
import { UserLessonProgress } from 'src/user-lesson-progress/entities/user-lesson-progress.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    unique: true,
  })
  @Length(2, 30)
  username: string;
  @Column({
    default: 'Пока ничего не рассказал о себе',
  })
  @Length(2, 200)
  about: string;
  @Column({
    default: 'https://i.pravatar.cc/300',
  })
  avatar: string;
  @Column({
    unique: true,
  })
  @IsEmail()
  email: string;
  @Column({ select: false })
  password: string;
  @Column()
  @CreateDateColumn()
  createdAt: Date;
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
  @OneToMany(() => UserCourseProgress, progress => progress.user)
  courseProgress: UserCourseProgress[];
  @OneToMany(() => UserLessonProgress, progress => progress.user)
  lessonProgress: UserLessonProgress[];
}

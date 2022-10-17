import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { AuthModule } from 'src/users/auth.module';
import { Like } from 'src/likes/entities/like.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import { Image } from 'src/images/entities/image.entity';
import { ImagesService } from 'src/images/images.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Comment, Like, User, Image]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService, ImagesService],
  exports: [TypeOrmModule]
})
export class TasksModule {}

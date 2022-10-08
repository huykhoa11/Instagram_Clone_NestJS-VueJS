import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { AuthModule } from 'src/users/auth.module';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  imports: [TypeOrmModule.forFeature([Like, Task]), AuthModule, TasksModule],
  controllers: [LikesController],
  providers: [LikesService],
  exports: [TypeOrmModule]
})
export class LikesModule {}

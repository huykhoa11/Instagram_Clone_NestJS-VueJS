import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/tasks/entities/task.entity';
import { AuthModule } from 'src/users/auth.module';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { Follow } from './entities/follows.entity';
import { FollowsController } from './follows.controller';
import { FollowsService } from './follows.service';

@Module({
  imports: [TypeOrmModule.forFeature([Follow, User]), AuthModule, UsersModule],
  controllers: [FollowsController],
  providers: [FollowsService],
  exports: [TypeOrmModule]
})
export class FollowsModule {}

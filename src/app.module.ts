import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './users/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { TasksModule } from './tasks/tasks.module';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/entities/comment.entity';
import { Task } from './tasks/entities/task.entity';
import { JwtStrategy } from './users/dto/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { LikesModule } from './likes/likes.module';
import { Like } from './likes/entities/like.entity';

@Module({
  imports: [AuthModule, TasksModule, CommentsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'khoa1998',
      database: 'socialmedia',
      entities: [User, Task, Comment, Like],
      synchronize: true,
  }),
    CommentsModule,
    LikesModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}

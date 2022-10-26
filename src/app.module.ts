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
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Image } from './images/entities/image.entity';
import { ImagesModule } from './images/images.module';
import { MulterModule } from '@nestjs/platform-express';
import { FollowsModule } from './follows/follows.module';
import { Follow } from './follows/entities/follows.entity';

@Module({
  imports: [AuthModule, TasksModule, CommentsModule,
            CommentsModule, LikesModule, UsersModule,
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService:ConfigService)=>({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User, Task, Comment, Like, Image, Follow],
        synchronize: true,
      })
    }),
    ImagesModule, MulterModule.register({dest: './uploads'}), FollowsModule
  ],
  //   TypeOrmModule.forRoot({
  //     type: 'mysql',
  //     host: 'localhost',
  //     port: 3306,
  //     username: 'root',
  //     password: 'khoa1998',
  //     database: 'socialmedia',
  //     entities: [User, Task, Comment, Like],
  //     synchronize: true,
  // }),
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}

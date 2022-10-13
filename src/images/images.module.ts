import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/tasks/entities/task.entity';
import { TasksModule } from 'src/tasks/tasks.module';
import { AuthModule } from 'src/users/auth.module';
import { Image } from './entities/image.entity';
import { ImagesController } from './images.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Image, Task]), AuthModule, TasksModule],
    controllers: [ImagesController],

    exports: [TypeOrmModule],

  })
  export class ImagesModule {}
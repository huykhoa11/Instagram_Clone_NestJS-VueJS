import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: 'http://localhost:8080',
    credentials: true,
  });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();


/**
 *  valdiate Sign Up ------ (Done)
    createdAt updatedAt ------ (Done)
    update created time in main page  ------ (Done)
    time ago in comment ------ (Done)
 *  unique username validate ------ (Done)
    Max 5 images ------ (Done)
    create task with images ------ (Done)
    task with carousel of images ------ (Done)
    Edit user info page ------ (Done)
    User page ------ (Done)
    View 1 task
    edit task with images drag drop
    validate images size
    Search User
    Regex username, username cant have space
 */

    /**
     * [
  {
    fieldname: 'image',
    originalname: 'wave1.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    destination: './uploads',
    filename: 'wave1-46210.jpg',
    path: 'uploads\\wave1-46210.jpg',
    size: 379236
  },
  {
    fieldname: 'image',
    originalname: 'wave2.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    destination: './uploads',
    filename: 'wave2-edb3.jpg',
    path: 'uploads\\wave2-edb3.jpg',
    size: 180731
  }
]
     */
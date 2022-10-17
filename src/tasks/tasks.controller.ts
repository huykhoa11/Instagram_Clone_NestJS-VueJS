import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, UseInterceptors, UploadedFile, UploadedFiles, Request, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetUser } from 'src/users/dto/getUserDecorator';
import { User } from 'src/users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ImagesService } from 'src/images/images.service';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly imagesService: ImagesService,
  ) {}

  // @Post()
  // create(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User) {
  //   return this.tasksService.create(createTaskDto, user);
  // }

  @Post('/upload')
  @UseInterceptors(
    FilesInterceptor('image', 5, {
      storage: diskStorage({
        destination: './frontend/src/assets',
        filename: (req, file, callback) => {
          const name = file.originalname.split('.')[0];
          const fileExtName = extname(file.originalname);
          const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          callback(null, `${name}-${randomName}${fileExtName}`);
        }
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
          // throw new Error('please uplaod image only hihihihi');
          return callback(new Error('Only image files are allowed! hihihihihi'), false);
        }
        callback(null, true);
      }
    }))
  async create(
      // @Body() createTaskDto: CreateTaskDto,
      @Body() createTaskDto: any,
      @GetUser() user: User,
      @UploadedFiles() files: Array<Express.Multer.File>
    ) {
      console.log()
      console.log()
      console.log()
      console.log()
      console.log()
      console.log(files)

      const {image, content} = createTaskDto;
      const contentCreateTaskDto = {content: content};
      const newTask = await this.tasksService.create(contentCreateTaskDto, user);
      const createImages = await this.imagesService.create(files, user, newTask.id);

      // this.imagesService.create(files, user)

      const response = [];
      const typeOf = value => Object.prototype.toString.call(value);
      // files.forEach(file => {
      //   const fileReponse = {
      //     originalname: file.originalname,
      //     mimetype: file.mimetype,
      //     destination: file.destination,
      //     filename: file.filename,
      //     path: file.path,
      //     type: typeOf(file),
      //   };
      //   response.push(fileReponse);
      // });
      // return response;
      return newTask;
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) taskId: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(taskId, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) taskId: number) {
    return this.tasksService.remove(taskId);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.tasksService.findAll(user);
  }
  
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOne(id);
  }

  
  // @Get('/users')
  // async getUsers (@GetUser() user: User) {
  //   const otherUsers = await this.tasksService.findOtherUsers(user.id);
  //   console.log(otherUsers);
  //   return {user, otherUsers};
  // }




}

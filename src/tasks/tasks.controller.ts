import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetUser } from 'src/users/dto/getUserDecorator';
import { User } from 'src/users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User) {
    return this.tasksService.create(createTaskDto, user);
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

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, Put } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/entities/user.entity';
import { GetUser } from 'src/users/dto/getUserDecorator';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post('/:task_id/likes')
  create(
    @Body() createLikeDto: CreateLikeDto,
    @GetUser() user: User,
    @Param('task_id', ParseIntPipe) taskId: number,
  ) {
    return this.likesService.create(createLikeDto, user, taskId);
  }

  @Get('/:task_id/likes')
  getLikeStatusOfTask(
    @GetUser() user: User,
    @Param('task_id', ParseIntPipe) taskId: number,
  ) {
    return this.likesService.getLikeStatusOfTask(user, taskId);
  }

  @Get('/:task_id/countLikesOfTask')
  countLikesOfTask(
    @GetUser() user: User,
    @Param('task_id', ParseIntPipe) taskId: number,
  ) {
    return this.likesService.countLikesOfTask(user, taskId);
  }


  @Delete('/:task_id/likes')
  remove(
    @GetUser() user: User,
    @Param('task_id', ParseIntPipe) taskId: number,
  ) {
    return this.likesService.remove(user, taskId);
  }
}

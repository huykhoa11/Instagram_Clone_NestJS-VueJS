import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetTask } from 'src/tasks/dto/GetTaskDecorator';
import { Task } from 'src/tasks/entities/task.entity';
import { GetUser } from 'src/users/dto/getUserDecorator';
import { User } from 'src/users/entities/user.entity';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('/:task_id/comments')
  create(
    @Body() createCommentDto: CreateCommentDto,
    @GetUser() user: User,
    @GetTask() task: Task,
    @Param('task_id', ParseIntPipe) taskId: number,
  ) {
    console.log('inside comments create controller');
    return this.commentsService.create(createCommentDto, user, taskId);
  }

  @Get('/:task_id/comments')
  getAllCmtsFromOneTask(
    @Param('task_id', ParseIntPipe) taskId: number,
  ) {
    return this.commentsService.findAllCmtsFromOneTask(taskId);
  }

  @Delete('/comments/:comment_id')
  remove(
    // @GetUser() user: User,
    @Param('comment_id', ParseIntPipe) commentId: number,
  ) {
    return this.commentsService.remove(commentId);
  }
}

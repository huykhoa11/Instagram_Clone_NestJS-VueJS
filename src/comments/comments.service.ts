import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentsRepository: Repository<Comment>,
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}

  async create(createCommentDto: CreateCommentDto, user: User, taskId: number): Promise<Comment> {
    console.log('inside comments create service');

    const task = await this.tasksRepository.findOne({where: {id: taskId}});
    const newCmt = await this.commentsRepository.create(createCommentDto);
    newCmt.user = user;
    newCmt.task = task;
    await this.commentsRepository.save(newCmt);

    return newCmt;
  }

  async findAllCmtsFromOneTask(taskId: number): Promise<Comment[]> {
    const task = await this.tasksRepository.findOne({where: {id: taskId}});
    const comments = await this.commentsRepository.find({
      where: {task: task}, 
      relations: {user: true,},
    });
    return comments;
  }

  async remove(commentId: number) {
    // const task = await this.tasksRepository.findOne({where: {id: taskId}});
    // const comment = await this.commentsRepository.findOne({where: {user: user, task: task}}); 
    await this.commentsRepository.delete({id: commentId});
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} comment`;
  // }

  // update(id: number, updateCommentDto: UpdateCommentDto) {
  //   return `This action updates a #${id} comment`;
  // }


}

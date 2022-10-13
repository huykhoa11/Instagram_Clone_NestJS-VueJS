import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Like } from './entities/like.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like) private likesRepository: Repository<Like>,
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
     
  ) {}

  async create(createLikeDto: CreateLikeDto, user: User, taskId: number): Promise<Like> {
    const task = await this.tasksRepository.findOne({where: {id: taskId}});
    const newlike = await this.likesRepository.create(createLikeDto);
    newlike.createdAt = new Date().toISOString();
    newlike.updatedAt = new Date().toISOString();
    newlike.user = user;
    newlike.task = task;
    await this.likesRepository.save(newlike);

    return newlike;
  }

  async getLikeStatusOfTask(user: User, taskId: number): Promise<Like> {
    const task = await this.tasksRepository.findOne({where: {id: taskId}});
    const like = await this.likesRepository.findOne({
      where: {user: user, task: task},
      relations: {user: true}
    });
    return like;
  }

  async countLikesOfTask(user: User, taskId: number): Promise<number> {
    const task = await this.tasksRepository.findOne({where: {id: taskId}});
    const likes = await this.likesRepository.find({where: {task: task}});
    return likes.length;

  }

  async remove(user: User, taskId: number) {
    const task = await this.tasksRepository.findOne({where: {id: taskId}});
    const like = await this.likesRepository.findOne({where: {user: user, task: task}}); 
    await this.likesRepository.delete({id: like.id});
  }
}

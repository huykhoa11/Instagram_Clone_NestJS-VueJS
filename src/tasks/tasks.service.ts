import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/comments/entities/comment.entity';
import { Like } from 'src/likes/entities/like.entity';
import { User } from 'src/users/entities/user.entity';
import { Not, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
    @InjectRepository(Comment) private commentsRepository: Repository<Comment>,
    @InjectRepository(Like) private likesRepository: Repository<Like>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const newTask = this.tasksRepository.create(createTaskDto);
    newTask.user = user;
    await this.tasksRepository.save(newTask);

    // return newTask;
    return this.tasksRepository.findOne({
      where: {id: newTask.id},
      relations: {user: {likes: true}, 
                  comments: {user: true}, 
                  likes: {user: true}
                },
    })
  }

  findAll(user: User): Promise<Task[]> {
    return this.tasksRepository.find({
      relations: {user: {likes: true}, 
                  comments: {user: true}, 
                  likes: {user: true}},
    })
  }

  async findOne(id: number): Promise<Task> {
    const task: Task = await this.tasksRepository.findOne({
      where: {id: id},
      relations: {user: {likes: true}, 
                  comments: {user: true}, 
                  likes: {user: true}
              },
    });

    if(!task) {
      throw new NotFoundException(`This task (id=${id}) is not belong to current user!`);
    } else {
      return task;
    }
  }

  async update(taskId: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const {content} = updateTaskDto;

    const task = await this.tasksRepository.findOne({where: {id: taskId}});
    task.content = content;
    await this.tasksRepository.save(task);

    return task;
  }

  async remove(taskId: number) {
    const task = await this.tasksRepository.findOne({where: {id: taskId}});
    this.commentsRepository.delete({task: task});
    this.likesRepository.delete({task: task});
    this.tasksRepository.delete({id: taskId});
  }

  // async findOtherUsers(userId: number): Promise<User[]> {
  //   return this.usersRepository.find({where: {id: Not(userId)}});
  // }
}

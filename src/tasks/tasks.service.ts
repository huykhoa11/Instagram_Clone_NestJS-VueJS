import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/comments/entities/comment.entity';
import { Follow } from 'src/follows/entities/follows.entity';
import { Image } from 'src/images/entities/image.entity';
import { Like } from 'src/likes/entities/like.entity';
import { User } from 'src/users/entities/user.entity';
import { In, Not, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
    @InjectRepository(Comment) private commentsRepository: Repository<Comment>,
    @InjectRepository(Like) private likesRepository: Repository<Like>,
    @InjectRepository(Image) private imagesRepository: Repository<Image>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Follow) private followsRepository: Repository<Follow>,
  ) {}

  async create(createTaskDto: CreateTaskDto, files: Array<Express.Multer.File>, user: User): Promise<Task> {
    const newTask = this.tasksRepository.create(createTaskDto);
    newTask.createdAt = new Date().toISOString();
    newTask.updatedAt = new Date().toISOString();
    newTask.user = user;

    await this.tasksRepository.save(newTask);

    return this.tasksRepository.findOne({
      where: {id: newTask.id},
      relations: {user: {likes: true}, 
                  comments: {user: true}, 
                  likes: {user: true},
                  images: true
                },
    })
  }

  async findAll(user: User, loadedPost: number) {
    const followingRelations = await this.followsRepository.find({where: {followerId: user.id}});
    let arr = [];
    arr.push(user.id);
    followingRelations.forEach(element => {
      arr.push(element.followingId);
    });
    console.log('arr', arr);

    return await this.tasksRepository.find({
      where: {user: {id: In(arr)}},
      relations: {user: {likes: true}, 
                  comments: {user: true}, 
                  likes: {user: true},
                  images: true
                },
      order: {
        id: "DESC",
      },
      skip: loadedPost-2,
      take: 2,
    })
  }

  async findOne(id: number): Promise<Task> {
    const task: Task = await this.tasksRepository.findOne({
      where: {id: id},
      relations: {user: {likes: true}, 
                  comments: {user: true}, 
                  likes: {user: true},
                  images: true,
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
    task.updatedAt = new Date().toISOString();
    await this.tasksRepository.save(task);

    return task;
  }

  async remove(taskId: number) {
    const task = await this.tasksRepository.findOne({where: {id: taskId}});
    await this.commentsRepository.delete({task: task});
    await this.likesRepository.delete({task: task});
    await this.imagesRepository.delete({task: task});
    await this.tasksRepository.delete({id: taskId});
  }

  // async findOtherUsers(userId: number): Promise<User[]> {
  //   return this.usersRepository.find({where: {id: Not(userId)}});
  // }
}

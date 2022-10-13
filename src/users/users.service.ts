import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(    
        @InjectRepository(User) private usersRepository: Repository<User>,
    ) {}

    async findAllUsers(): Promise<User[]> {
        return this.usersRepository.find({
            relations: {tasks: true, comments: true, likes: true},
        });
    }

    async findOtherUsers(userId: number): Promise<User[]> {
        return this.usersRepository.find({
            where: {id: Not(userId)},
            relations: {tasks: true, comments: true, likes: true},
        });
    }


    async findSpecificUser(userId: number): Promise<User> {
        return this.usersRepository.findOne({
            where: {id: userId},
            relations: {tasks: true, comments: true, likes: true}
        })
    }

}

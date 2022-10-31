import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { VerifyPassword } from './dto/verify-password.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(    
        @InjectRepository(User) private usersRepository: Repository<User>,
    ) {}

    async changeAvatar(user: User, filename: string):Promise<User> {
        user.avatar = filename;
        await this.usersRepository.save(user);
        return user;
    }

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
            relations: {tasks: {images: true, comments: {user: true}, likes: {user: true}, user: true}, 
                        }
        })
    }

    async findByUsername(username: string): Promise<number> {
        const foundUser = await this.usersRepository.findOne({
            where: {username: username},
            relations: {tasks: {images: true, comments: {user: true}, likes: {user: true}, user: true}, 
                        }
        })
        return foundUser.id;
    }

    async editCurrentUser(updateUserDto: UpdateUserDto, user: User): Promise<User> {
        const {name, bio, email} = updateUserDto;

        if(name !== '') {user.name = name;} 
        if(bio !== '')  {user.bio = bio;} 
        if(email !== ''){user.email = email;} 
        await this.usersRepository.save(user);

        return user;
    }

    async editPassword(verifyPassword: VerifyPassword, user: User) {
        const {password} = verifyPassword;

        if(user && (await bcrypt.compare(password, user.password))) {
            console.log('compare password for edit')
            user.password = password;
            await this.usersRepository.save(user);
        
            return user;
        } else {
            throw new UnauthorizedException('edit password failed ha ha ha ha')
        }
    }

}

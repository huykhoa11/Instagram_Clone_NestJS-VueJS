import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateFollowDto } from './dto/create-follow.dto';
import { Follow } from './entities/follows.entity';

@Injectable()
export class FollowsService {
    constructor(
        @InjectRepository(Follow) private followsRepository: Repository<Follow>, 
    ) {}

    async findAll() {
        return this.followsRepository.find();
    }

    async isFollowed(followerId: number, followingId: number) {
        const relation = await this.followsRepository.findOne({
            where: {
                followerId: followerId,
                followingId: followingId,
            }
        })
        return relation;
    }

    async getNumOfFollowersFollowing(userId: number) {
        const numbersOfFollowers = await this.followsRepository.find({where: {followingId: userId}});
        const numbersOfFollowing = await this.followsRepository.find({where: {followerId: userId}});
        return {numFollowers: numbersOfFollowers.length, numFollowing: numbersOfFollowing.length}
    }

    async create(createFollowDto: CreateFollowDto) {
        const newFollow = await this.followsRepository.create(createFollowDto);
        newFollow.createdAt = new Date().toISOString();
        newFollow.updatedAt = new Date().toISOString();
        await this.followsRepository.save(newFollow);  
        return newFollow;
    }

    async delete(relationId: number) {
        await this.followsRepository.delete({id: relationId})
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

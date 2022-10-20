import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateImageDto } from 'src/tasks/dto/create-image.dto';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';

@Injectable()
export class ImagesService {
    constructor(
        @InjectRepository(Image) private imagesRepository: Repository<Image>,
        @InjectRepository(Task) private tasksRepository: Repository<Task>,
    ) {}

    async create(files: Array<Express.Multer.File>, user: User, taskId: number) {
        console.log('INSIDE CREATE METHOD OF IMAGES SERVICE');
        const task = await this.tasksRepository.findOne({where: {id: taskId}});
        const returnImages = [];
        files.forEach(async(file) => {
            const newImage = this.imagesRepository.create({name: file.filename});
            // newImage.name = file.filename;
            newImage.createdAt = `${Date.now()}`;
            newImage.updatedAt = `${Date.now()}`;
            newImage.user = user;
            newImage.task = task;
            const imgObj = {
                id: newImage.id,
                name: newImage.name,
                createdAt: newImage.createdAt,
                updatedAt: newImage.updatedAt,
            }
            returnImages.push(imgObj);
            await this.imagesRepository.save(newImage);
        })

        console.log(returnImages);
        return returnImages;
    }
}

import { Exclude } from "class-transformer";
import { IsString } from "class-validator";
import { Task } from "src/tasks/entities/task.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    directory: string;

    @Column()
    createdAt: string;

    @Column()
    updatedAt: string;

    @ManyToOne(() => Task, (task) => task.images)
    task: Task

    @Exclude()
    @ManyToOne(() => User, (user) => user.images)
    user: User

    constructor(partial: Partial<Image>) {
        Object.assign(this, partial);
    }
}
import { Exclude } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "../../tasks/entities/task.entity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    @Column()
    content: string;

    @ManyToOne(() => Task, (task) => task.comments)
    task: Task

    @Exclude()
    @ManyToOne(() => User, (user) => user.comments)
    user: User

    constructor(partial: Partial<Comment>) {
        Object.assign(this, partial);
    }
}
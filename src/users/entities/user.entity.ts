import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { Task } from "src/tasks/entities/task.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { Like } from "src/likes/entities/like.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Exclude()
    @Column()
    password: string;

    @Column()
    refreshToken: string;

    @Column()
    refreshTokenExp: number;

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[]

    @OneToMany(() => Like, (like) => like.user)
    likes: Like[]

    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[]

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}
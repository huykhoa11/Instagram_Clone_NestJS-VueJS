import { Exclude } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Comment } from "src/comments/entities/comment.entity";
import { Like } from "src/likes/entities/like.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @OneToMany(() => Comment, (comment) => comment.task)
    comments: Comment[]

    @OneToMany(() => Like, (like) =>like.task)
    likes: Like[]

    @ManyToOne(() => User, (user) => user.tasks)
    user: User

    // constructor(partial: Partial<Task>) {
    //     Object.assign(this, partial);
    // }
}

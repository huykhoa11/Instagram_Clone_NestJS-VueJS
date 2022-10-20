import { Exclude } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { Comment } from "src/comments/entities/comment.entity";
import { Image } from "src/images/entities/image.entity";
import { Like } from "src/likes/entities/like.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @MinLength(1)
    @MaxLength(140)
    @IsNotEmpty()
    content: string;

    @Column()
    createdAt: string;

    @Column()
    updatedAt: string;

    @OneToMany(() => Comment, (comment) => comment.task)
    comments: Comment[]

    @OneToMany(() => Like, (like) =>like.task)
    likes: Like[]

    @OneToMany(() => Image, (image) =>image.task)
    // @IsNotEmpty()
    images: Image[]

    @ManyToOne(() => User, (user) => user.tasks)
    user: User

    // constructor(partial: Partial<Task>) {
    //     Object.assign(this, partial);
    // }
}

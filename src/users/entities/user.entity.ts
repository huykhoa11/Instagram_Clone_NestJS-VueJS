import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { Task } from "src/tasks/entities/task.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { Like } from "src/likes/entities/like.entity";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import moment from "moment";
import { Image } from "src/images/entities/image.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 'logo.png' })
    @IsString()
    avatar: string;

    @Column()
    @IsString()
    name: string;

    @Column()
    @IsString()
    bio: string;

    @Column()
    @IsString()
    email: string;

    @Column({unique: true,})
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(12)
    username: string;

    @Exclude()
    @Column()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(12)
    password: string;

    @Column()
    refreshToken: string;

    @Column()
    refreshTokenExp: number;

    @Column()
    createdAt: string;
// {type: "varchar", default: () => moment().format('L') }
    @Column()
    updatedAt: string;

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[]

    @OneToMany(() => Like, (like) => like.user)
    likes: Like[]

    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[]

    @OneToMany(() => Image, (image) => image.user)
    images: Image[]

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}
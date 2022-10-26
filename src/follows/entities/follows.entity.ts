import { Exclude } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "../../tasks/entities/task.entity";

@Entity()
export class Follow {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNumber()
    @Column()
    followerId: number;

    @IsNumber()
    @Column()
    followingId: number;

    @Column()
    createdAt: string;

    @Column()
    updatedAt: string;
}
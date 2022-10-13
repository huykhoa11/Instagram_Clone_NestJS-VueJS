import { Exclude } from "class-transformer";
import { Task } from "src/tasks/entities/task.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Like {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: boolean;

    @Column()
    createdAt: string;

    @Column()
    updatedAt: string;

    @ManyToOne(() => Task, (task) => task.likes)
    task: Task

    @Exclude()
    @ManyToOne(() => User, (user) => user.likes)
    user: User

    constructor(partial: Partial<Like>) {
        Object.assign(this, partial);
    }
}

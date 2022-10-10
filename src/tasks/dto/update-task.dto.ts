import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateTaskDto  {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(140)
    content: string;
}
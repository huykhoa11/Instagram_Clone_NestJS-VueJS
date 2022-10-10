import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCommentDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    content: string;
}

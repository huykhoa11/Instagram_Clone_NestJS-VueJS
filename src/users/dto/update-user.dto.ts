import { IsString, MaxLength, MinLength } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    name: string;

    @IsString()
    bio: string;

    @IsString()
    email: string;
}

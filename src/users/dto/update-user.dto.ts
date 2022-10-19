import { IsString, MaxLength, MinLength } from "class-validator";

export class UpdateUserDto {

    @IsString()
    name: string;

    @IsString()
    bio: string;

    @IsString()
    email: string;
}

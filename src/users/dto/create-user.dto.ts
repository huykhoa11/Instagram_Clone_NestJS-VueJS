import { IsString, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(12)
    username: string;

    @IsString()
    @MinLength(6)
    @MaxLength(12)
    password: string;
}

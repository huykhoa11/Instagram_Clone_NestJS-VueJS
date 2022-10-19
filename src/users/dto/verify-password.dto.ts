import { IsString, MaxLength, MinLength } from "class-validator";

export class VerifyPassword {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    password: string;
}
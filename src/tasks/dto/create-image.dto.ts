import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateImageDto {
    @IsString()
    name: string;
}

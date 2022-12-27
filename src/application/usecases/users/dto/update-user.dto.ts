import { IsNotEmpty } from "class-validator";

export class UpdateUserDto  {
    @IsNotEmpty()
    office: string;

    @IsNotEmpty()
    birthday: Date;

    @IsNotEmpty()
    situation: string;
}
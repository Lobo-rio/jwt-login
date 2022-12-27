import { IsDate, IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    office: string;
    
    @IsNotEmpty()
    birthday: Date;
    
    @IsNotEmpty()
    situation: string;
    
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    resetToken: string;
    
    @IsNotEmpty()
    resetTokenExpires: string;
}
import { IsEmail, isEmail, IsInt, IsNotEmpty, isNotEmpty, IsNumber, IsPassportNumber, IsString, isString, IsStrongPassword, isStrongPassword } from "class-validator";

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsStrongPassword()
    @IsNotEmpty()

    password: string;

}

import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { STATUS_CODES } from "http";


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}
    
    async signup(dto: AuthDto) {
        try{
            const hash = await argon.hash(dto.password);
        // save the user to the database
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash,
            },
        });
        return user;
        }
        catch(error) {
            if (error instanceof PrismaClientKnownRequestError) {}
            if (error.code === 'P2002'){
                throw new ForbiddenException('Email already exists');
            }
            throw new Error('pizdec');
            
        }
    } 
    async signin(dto: AuthDto) {

        // find user by email
        const user = 
        await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        // if user not found, throw error
        if (!user) {
            throw new ForbiddenException('User not found');
        }
        // compare password
        const pwMatches = await argon.verify(user.hash, dto.password)
        // if password is incorrect, throw error
        if (!pwMatches) {
            throw new ForbiddenException('Password incorrect');
        }

        // send back user 
        return user;
    }
}

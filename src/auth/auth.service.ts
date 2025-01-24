import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
    
    signup() {
        return {'msg': 'what is love'}
    } 
    signin() {
        return {msg: 'baby dont hurt me'}
    }
}

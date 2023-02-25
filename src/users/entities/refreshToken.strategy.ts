import { ArgumentsHost, createParamDecorator, ExecutionContext, Injectable, Logger, Res, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";

import { Request } from "express";
import { Response } from 'express';
import * as randomToken from 'rand-token';
import { JwtService } from "@nestjs/jwt";
import { stringify } from "querystring";
import { User } from "./user.entity";
import { AuthService } from "../auth.service";
import { JwtPayload } from "./JwtPayload";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refreshTokenStrategy') {
    private logger = new Logger('validate auth request');
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        private authService: AuthService,
        private configService: ConfigService,
        private jwtService: JwtService,
    ){
        super({
            ignoreExpiration: true,
            passReqToCallback:true,
            secretOrKey:'my-secret-key-password!',
            jwtFromRequest:ExtractJwt.fromExtractors([(request:Request) => {
                let data = request?.cookies["auth-cookie-dmm"];
                if(!data){
                    return null;
                }
                // console.log({data});
                console.log('constructor is accessed');
                return data.accessToken;
            }])
        });
    }

    async validate(
        req: Request, payload: JwtPayload, 
        @Res({ passthrough: true })res: Response,
        name: string
    ) {
        console.log('VALIDATE IN refreshTokenStrategy');
        let data = req?.cookies["auth-cookie-dmm"];
        const currentAccessToken = data.accessToken;
        console.log(currentAccessToken);

        const {username, iat, exp} = payload;
        const user: User = await this.usersRepository.findOne({where: {username: username}});

        if(!user) {
            this.logger.warn('Please sign up first');
            throw new UnauthorizedException('Please sign up first !');
        }

        try {
            if(this.isExpired(exp)) {
                if(this.isExpired(user.refreshTokenExp)) {
                    this.logger.warn('MUST LOGIN AGAIN');
                    // return 'Please login again. Both accessToken and refreshToken were expired.'
                    // return false; //co nghia la chuong trinh ko bi dung lai. isExpiredAll = false;
                    // return 'user must login again';
                } else {
                    this.logger.verbose('GEN NEW ACCESSTOKEN');

                    //gen access token again
                    const newAccessToken: string = await this.jwtService.sign({username});
                    const time = `${Date.now()/1000}`
                    user.refreshToken = randomToken.generate(16);
                    user.refreshTokenExp = parseInt(time) + 120;
                    await this.usersRepository.save(user);
                    
                    const secretData = {
                        accessToken: newAccessToken,
                        refreshToken: user.refreshToken
                    };
                    this.logger.verbose(`newAccessToken: ${newAccessToken}`);
                    this.logger.verbose(`user.refreshToken: ${user.refreshToken}`);
                    
                    
                    req.cookies["auth-cookie-dmm"].accessToken = newAccessToken;
                    req.cookies["auth-cookie-dmm"].refreshToken = user.refreshToken;
                    
                    return user;
                }
            }
            else {
                // Lam moi thu binh thuong
                return user;
            }
        } 
        catch (error) { this.logger.error(error.stack); }

        
    }

    isExpired = (expTime: number):boolean => {
        const time = `${Date.now()/1000}`
        const now = parseInt(time);
    
        if(now < expTime) {return false}
        else {return true;}
    }

    
}
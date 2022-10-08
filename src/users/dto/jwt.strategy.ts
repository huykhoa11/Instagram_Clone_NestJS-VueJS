import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from'passport-jwt';
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { ConfigService } from "@nestjs/config";
import { JwtPayload } from "../entities/JwtPayLoad";
import { Request } from "express";
import { Response } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        private configService: ConfigService,
    ) {
        super({
            // secretOrKey: configService.get('my-secret-key-password!'),
            secretOrKey: 'my-secret-key-password!',
            // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            jwtFromRequest:ExtractJwt.fromExtractors([(request:Request) => {
                let data = request?.cookies["auth-cookie-dmm"];
                if(!data){
                    return null;
                }
                // console.log({data});
                console.log('constructor is accessed');
                return data.accessToken;
            }]),
            ignoreExpiration: false,
        });
    }


    async validate(payload: JwtPayload, name: string) {
        const {username, iat, exp} = payload;
        console.log(payload);
        const user = await this.usersRepository.findOne({where: {username: username}});

        if(!user) {
            throw new UnauthorizedException('Please sign up first!!!!');
        }

        return user;
    }
}
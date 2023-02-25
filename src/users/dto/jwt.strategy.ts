import { Injectable, Res, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from'passport-jwt';
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { ConfigService } from "@nestjs/config";
import { JwtPayload } from "../entities/JwtPayload";
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
            // secretOrKey: 'my-secret-key-password!',
            // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

            ignoreExpiration: false,
            passReqToCallback:true,
            // secretOrKey:configService.get('JWT_SECRET'),
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest:ExtractJwt.fromExtractors([(request:Request) => {
                let data = request?.cookies["auth-cookie-dmm"];
                if(!data){
                    console.log('something wrong with cookies, check again in ..strategy.ts')
                    return null;
                }
                // console.log({data});
                console.log('constructor is accessed');
                return data.accessToken;
            }]),
            // ignoreExpiration: false,
        });
    }


    async validate(
        req: Request, payload: JwtPayload, 
        @Res({ passthrough: true })res: Response,
        name: string) {
        const {username, iat, exp} = payload;
        console.log(`${username} - ${iat} - ${exp}`);
        const user = await this.usersRepository.findOne({where: {username: username}});
        // console.log(user);

        if(!user) {
            throw new UnauthorizedException('Please sign up first!!!!');
        }

        return user;
    }
}
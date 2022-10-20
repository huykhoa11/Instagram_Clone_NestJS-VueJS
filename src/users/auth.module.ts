import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './dto/jwt.strategy';
import { Comment } from 'src/comments/entities/comment.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { UsersController } from './users.controller';
import { UsersModule } from './users.module';
import { UsersService } from './users.service';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({defaultStrategy: 'jwt', secondStrategy: 'refreshTokenStrategy'}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async(configService: ConfigService)=> ({
          secret: configService.get('JWT_SECRET'),
          // signOptions: {
          //     expiresIn: 30,
          // },
      }),
    }),
    // JwtModule.register({
    //   secret: 'my-secret-key-password!',
    //   // signOptions: {
    //   //     expiresIn: 3600,
    //   // }
    // }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [TypeOrmModule, JwtStrategy]
})
export class AuthModule {}

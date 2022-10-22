import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as randomToken from 'rand-token';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}


  async signUp(authCredentialsDto: AuthCredentialsDto) {
    const {username, password} = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const time = `${Date.now()/1000}`;
    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      refreshToken: '',
      refreshTokenExp: parseInt(time),
      avatar: 'logo.png',
      name: '',
      bio: '',
      email: '',
    });
    try {
      await this.usersRepository.save(user);
    } catch (error) {
      if(error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Username already exists, duplicate cmnr');
      }
      else {
        console.log('loi rui dcm');
        throw new InternalServerErrorException('something went wrong cmnr, check lai auth service xem nao');
      }
    }

    return user;
  }

  async signIn(authCredentialsDto: AuthCredentialsDto, exp: number): Promise<{accessToken: string, refreshToken: string}> {
    const {username, password} = authCredentialsDto;

    const time = `${Date.now()/1000}`;
    const user:User = await this.usersRepository.findOne({where: {username: username}});
    user.refreshToken = randomToken.generate(16);
    user.refreshTokenExp = parseInt(time) + 300;

    await this.usersRepository.save(user);
    console.log('save user');

    if(user && (await bcrypt.compare(password, user.password))) {
      console.log('compare user')
      const accessToken: string = await this.jwtService.sign({username}, { expiresIn: exp });
      const refreshToken = user.refreshToken;

      return {accessToken, refreshToken};
    } else {
      throw new UnauthorizedException('Please check your login credentials hi hi hi')
    }
  }

  async findOtherUsers(userId: number): Promise<User[]> {
    return this.usersRepository.find({where: {id: userId}});
  }
}

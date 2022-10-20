import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, ParseBoolPipe, ParseIntPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Response } from 'express';
import { GetUser } from './dto/getUserDecorator';
import { JwtModule } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.authService.signUp(authCredentialsDto);
  }


  // @Post('/signin')
  // async signIn(
  //   @Body() authCredentialsDto: AuthCredentialsDto,
  //   @Res({passthrough: true})res: Response,
  // ): Promise<{accessToken, refreshToken}> {
  //   const {accessToken, refreshToken} = await this.authService.signIn(authCredentialsDto);

  //   const secretData = {accessToken, refreshToken};
  //   res.cookie('auth-cookie-dmm', secretData, {httpOnly: true});

  //   return {accessToken, refreshToken};
  // }

  // Sign in with remember me feature
  @Post('/signin?')
  async signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Query('rememberMe', ParseBoolPipe) isRememberMeQuery: boolean,
    @Res({passthrough: true}) res: Response,
  ){
    const {username, password} = authCredentialsDto;
    if(isRememberMeQuery === true) {
      const {accessToken, refreshToken} = await this.authService.signIn(authCredentialsDto, 86400);
      const secretData = {accessToken, refreshToken};
      res.cookie('auth-cookie-dmm', secretData, {httpOnly: true});

      return {accessToken, refreshToken};
    }
    else {
      const {accessToken, refreshToken} = await this.authService.signIn(authCredentialsDto, 3600);
      const secretData = {accessToken, refreshToken};
      res.cookie('auth-cookie-dmm', secretData, {httpOnly: true});

      return {username, accessToken, refreshToken};
    }
  }

  @Delete('/signout')
  async signOut(
    @Res({passthrough: true}) res: Response
  ) {
    res.clearCookie('auth-cookie-dmm');
    return {message: 'Sign out successfully'};
  }

  @Get('/otherusers')
  async getUsers (@GetUser() user: User) {
    return this.authService.findOtherUsers(user.id);
  }
}

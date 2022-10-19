import { Body, Controller, Get, Param, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './dto/getUserDecorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { VerifyPassword } from './dto/verify-password.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getAllUsers() {
        return this.usersService.findAllUsers();
    }

    @Get('/currentuser')
    async getCurrentUser(@GetUser() user: User) {
        // console.log(user);
        return user;
    }

    @Get('/currentuser-and-otherusers')
    async getUsers (@GetUser() user: User) {
        const otherUsers = await this.usersService.findOtherUsers(user.id);
        console.log(otherUsers);
        return {user, otherUsers};
    }

    @Get(':id')
    async getSpecificUser (
        @Param('id', ParseIntPipe) id: number) 
    {
        return this.usersService.findSpecificUser(id);
    }

    @Patch(':id')
    async editCurrentUser(
        @Body() updateUserDto: UpdateUserDto,
        @Param('id', ParseIntPipe) userId: number,
        @GetUser() user: User
    ) {
        return this.usersService.editCurrentUser(updateUserDto, user);
    }

    @Patch('/edit-password/:id')
    async editPassword(
        @Body() verifyPassword: VerifyPassword,
        @Param('id', ParseIntPipe) userId: number,
        @GetUser() user: User
    ) {
        return this.usersService.editPassword(verifyPassword, user);
    }
}

import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './dto/getUserDecorator';
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


}

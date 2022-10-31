import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
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
    async getUsers (
        @GetUser() user: User,
    ) {
        const otherUsers = await this.usersService.findOtherUsers(user.id);
        console.log(user, otherUsers);
        return {user, otherUsers};
    }

    @Get(':id')
    async getSpecificUser (
        @Param('id', ParseIntPipe) id: number) 
    {
        return this.usersService.findSpecificUser(id);
    }

    @Get('/search/:username')
    async getUserByUsername (
        @Param('username') username: string
    ) {
        return this.usersService.findByUsername(username);
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

    @Patch('/change-avatar')
    @UseInterceptors(
        FileInterceptor('image', {
        storage: diskStorage({
            destination: './frontend/src/assets',
            filename: (req, file, callback) => {
            const name = file.originalname.split('.')[0];
            const fileExtName = extname(file.originalname);
            const randomName = Array(4)
                .fill(null)
                .map(() => Math.round(Math.random() * 16).toString(16))
                .join('');
            callback(null, `${name}-${randomName}${fileExtName}`);
            }
        }),
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
            // throw new Error('please uplaod image only hihihihi');
            return callback(new Error('Only image files are allowed! hihihihihi'), false);
            }
            callback(null, true);
        }
    }))
    async changeAvatar(
        @GetUser() user: User,
        @UploadedFile() file: Express.Multer.File,
    ) {

        return this.usersService.changeAvatar(user, file.filename);
    }
}

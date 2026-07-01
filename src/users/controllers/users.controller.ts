import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {} // Inyección de la dependencia del servicio de usuarios
  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  @Get('profile/:id')
  findProfile(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getProfileById(id);
  }

  @Get('posts/:id')
  findPosts(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getPostsByUserId(id);
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}

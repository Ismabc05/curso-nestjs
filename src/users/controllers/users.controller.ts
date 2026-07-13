import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { UsersService } from '../services/users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from '../entitites/user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {} // Inyección de la dependencia del servicio de usuarios

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'The users have been successfully retrieved.', type: User })
  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'The user have been successfully retrieved.', type: User })
  @Get(':id')
  findUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  @ApiOperation({ summary: 'Get a user profile by ID' })
  @ApiResponse({ status: 200, description: 'The user have been successfully retrieved.', type: User })
  @Get('profile/:id')
  findProfile(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getProfileById(id);
  }

  @ApiOperation({ summary: 'Get posts by user ID' })
  @ApiResponse({ status: 200, description: 'The posts have been successfully retrieved.', type: User })
  @Get('posts/:id')
  findPosts(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getPostsByUserId(id);
  }

  @ApiOperation({ summary: 'Create a new user' })
  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @ApiOperation({ summary: 'Update a user by ID' })
  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }

  @ApiOperation({ summary: 'Delete a user by ID' })
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}

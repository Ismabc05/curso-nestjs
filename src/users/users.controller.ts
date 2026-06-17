import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

interface User {
  id: string;
  name: string;
  email: string;
}

@Controller('users')
export class UsersController {
  private users: User[] = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com' },
  ];

  @Get()
  getUsers() {
    return this.users;
  }

  @Get(':id')
  findUser(@Param('id') id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return { error: 'User not found' };
    }
    return user;
  }

  @Post()
  createUser(@Body() body: { name: string; email: string }) {
    const newUser: User = {
      id: (this.users.length + 1).toString(),
      name: body.name,
      email: body.email,
    };

    if (!newUser.name || !newUser.email) {
      return { error: 'Name and email are required' };
    }
    this.users.push(newUser);
    return newUser;
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() body: { name?: string; email?: string }) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return { error: 'User not found' };
    }
    if (body.name) {
      user.name = body.name;
    }
    if (body.email) {
      user.email = body.email;
    }
    return user;
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    const position = this.users.findIndex((user) => user.id === id);
    if (position === -1) {
      return { error: 'User not found' };
    }
    this.users.splice(position, 1); // eliminame esa posición del array y solamente elimina un elemento
    return { message: 'User deleted successfully' };
  }
}

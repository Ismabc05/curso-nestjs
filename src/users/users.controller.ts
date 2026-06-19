import { Body, Controller, Delete, ForbiddenException, Get, NotFoundException, Param, Post, Put, UnprocessableEntityException } from '@nestjs/common';

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
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (user.id === '1') {
      throw new ForbiddenException(`You are not allowed to access this user`);
    }
    return user;
  }

  @Post()
  createUser(@Body() body: { name: string; email: string }) {
    const newUser: User = {
      id: `${new Date().getTime()}`, // Genera un ID único basado en la marca de tiempo actual
      name: body.name,
      email: body.email,
    };

    if (!newUser.name || !newUser.email) {
      throw new UnprocessableEntityException(`Name and email are required`);
    }

    if (newUser.name.length < 3) {
      throw new UnprocessableEntityException(`Name must be at least 3 characters long`);
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)) {
      throw new UnprocessableEntityException(`Invalid email format`);
    }

    this.users.push(newUser);
    return newUser;
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() body: { name?: string; email?: string }) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (body.name && body.name.length < 3) {
      throw new UnprocessableEntityException(`Name must be at least 3 characters long`);
    }

    if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      throw new UnprocessableEntityException(`Invalid email format`);
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
      throw new NotFoundException(`User with id ${id} not found`);
    }
    this.users.splice(position, 1); // eliminame esa posición del array y solamente elimina un elemento
    return { message: 'User deleted successfully' };
  }
}

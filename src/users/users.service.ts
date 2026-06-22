import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com' },
  ];

  findAll() {
    return this.users;
  }

  getUserById(id: string) {
    const userIndex = this.findOne(id);
    const user = this.users[userIndex];
    if (user.id === '1') {
      throw new ForbiddenException(`You are not allowed to access this user`);
    }
    return user;
  }

  create(body: CreateUserDto) {
    const newUser: User = {
      id: `${new Date().getTime()}`,
      name: body.name,
      email: body.email,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: string, body: UpdateUserDto) {
    const userIndex = this.findOne(id);
    const user = this.users[userIndex];
    if (body.name) {
      user.name = body.name;
    }
    if (body.email) {
      user.email = body.email;
    }

    return user;
  }

  delete(id: string) {
    const userIndex = this.findOne(id);
    this.users.splice(userIndex, 1);
    return { message: 'User deleted successfully' };
  }

  private findOne(id: string) {
    // sirve para reusar la lógica de encontrar un usuario por id y lanzar una excepción si no se encuentra
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return userIndex;
  }
}

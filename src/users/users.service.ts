import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entitites/user.entity';

@Injectable() // El decorador @Injectable() marca esta clase como un proveedor que puede ser inyectado en otros componentes de NestJS, como controladores o servicios.
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.usersRepository.find(); // trae todos los usuarios
  }

  async getUserById(id: number) {
    const user = await this.findOne(id);
    if (user.id === 1) {
      throw new ForbiddenException(`You are not allowed to access this user`);
    }
    return user;
  }

  async create(body: CreateUserDto) {
    try {
      const newUser = await this.usersRepository.save(body);
      return newUser;
    } catch {
      throw new BadRequestException('Error creating user');
    }
  }

  async update(id: number, body: UpdateUserDto) {
    const user = await this.findOne(id);
    const updateUser = this.usersRepository.merge(user, body); // actualiza user con body y lo guarda en la base de datos
    return this.usersRepository.save(updateUser);
  }

  async delete(id: number) {
    const user = await this.findOne(id);
    await this.usersRepository.delete(user.id);
    return { message: 'User deleted successfully' };
  }

  private async findOne(id: number) {
    // sirve para reusar la lógica de encontrar un usuario por id y lanzar una excepción si no se encuentra
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
}

import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entitites/user.entity';

@Injectable() // El decorador @Injectable() marca esta clase como un proveedor que puede ser inyectado en otros componentes de NestJS, como controladores o servicios.
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.usersRepository.find({
      relations: {
        profile: true,
        posts: true,
      },
    }); // trae todos los usuarios
  }

  async getUserById(id: number) {
    const user = await this.findOne(id);
    if (user.id === 1) {
      throw new ForbiddenException(`You are not allowed to access this user`);
    }
    return user;
  }

  async getProfileById(id: number) {
    const user = await this.findOne(id);
    return user.profile;
  }

  async getPostsByUserId(id: number) {
    return await this.usersRepository.findOne({
      where: { id },
      relations: { posts: true },
    });
  }

  async create(body: CreateUserDto) {
    try {
      const newUser = this.usersRepository.create(body);
      const savedUser = await this.usersRepository.save(newUser);
      return this.findOne(savedUser.id); // para que me traiga el usuario con su perfil y posts
    } catch {
      throw new BadRequestException('Error creating user');
    }
  }

  async update(id: number, body: UpdateUserDto) {
    try {
      const user = await this.findOne(id);
      const updateUser = this.usersRepository.merge(user, body); // actualiza user con body y lo guarda en la base de datos
      const savedUser = await this.usersRepository.save(updateUser);
      return savedUser;
    } catch {
      throw new BadRequestException('Error updating user');
    }
  }

  async delete(id: number) {
    try {
      await this.usersRepository.delete(id);
      return { message: 'User deleted successfully' };
    } catch {
      throw new BadRequestException('Error deleting user');
    }
  }

  private async findOne(id: number) {
    // sirve para reusar la lógica de encontrar un usuario por id y lanzar una excepción si no se encuentra
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: { profile: true },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    return user;
  }
}

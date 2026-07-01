import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async findAll() {
    return await this.postsRepository.find({
      relations: { user: { profile: true } },
    });
  }

  async findOne(id: number) {
    const post = await this.postsRepository.findOne({ where: { id }, relations: { user: { profile: true } } });
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return post;
  }

  async create(body: CreatePostDto) {
    try {
      const newPost = await this.postsRepository.save({
        ...body,
        user: { id: body.userId },
      });
      return await this.findOne(newPost.id); // devuelve el post creado con el usuario y su perfil
    } catch {
      throw new BadRequestException('Error creating post');
    }
  }

  async update(id: number, body: UpdatePostDto) {
    const post = await this.findOne(id);
    try {
      const updatedPost = this.postsRepository.merge(post, body);
      return await this.postsRepository.save(updatedPost);
    } catch {
      throw new BadRequestException('Error updating post');
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    try {
      await this.postsRepository.delete(id);
      return { message: 'Post deleted successfully' };
    } catch {
      throw new BadRequestException('Error deleting post');
    }
  }
}

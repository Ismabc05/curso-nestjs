import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Post } from '../entities/post.entity';
import { OpenaiService } from '../../ai/services/openai.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private openaiService: OpenaiService,
  ) {}

  async findAll() {
    return await this.postsRepository.find({
      relations: {
        user: { profile: true },
        categories: true,
      },
    });
  }

  async findOne(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: {
        user: { profile: true },
        categories: true,
      },
    });
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return post;
  }

  async create(body: CreatePostDto, userId: number) {
    try {
      const newPost = await this.postsRepository.save({
        ...body,
        user: { id: userId },
        categories: body.categoryIds?.map((id) => ({ id })) || [], // crea un array de objetos con la propiedad id para cada categoría, si no hay categorías, se asigna un array vacío
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

  async findPostsByCategoryId(categoryId: number) {
    const posts = await this.postsRepository.find({
      where: { categories: { id: categoryId } },
      relations: {
        user: { profile: true },
        categories: true,
      },
    });
    return posts;
  }

  async publish(id: number, userId: number) {
    const post = await this.findOne(id);
    if (post.user.id !== userId) {
      throw new BadRequestException('You are not the owner of this post');
    }
    if (!post.content || !post.title || !post.categories.length) {
      throw new BadRequestException('Post content, title, and at least one category are required to publish the post');
    }
    const summary = await this.openaiService.generateSummary(post.content);
    const image = await this.openaiService.generateImage(summary);
    const changes = this.postsRepository.merge(post, {
      isDraft: false,
      summary,
      coverImage: image,
    });
    const updatedPost = await this.postsRepository.save(changes);
    return await this.findOne(updatedPost.id);
  }
}

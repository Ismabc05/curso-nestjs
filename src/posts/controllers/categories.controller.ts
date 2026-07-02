import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { PostsService } from '../services/posts.service';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly postsService: PostsService,
  ) {}

  @Post()
  create(@Body() body: CreateCategoryDto) {
    return this.categoriesService.create(body);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @Get(':id/posts')
  findPostsByCategoryId(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findPostsByCategoryId(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateCategoryDto) {
    return this.categoriesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}

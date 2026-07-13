import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { PostsService } from '../services/posts.service';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Category } from '../entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly postsService: PostsService,
  ) {}

  @ApiOperation({ summary: 'Create a new category' })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() body: CreateCategoryDto) {
    return this.categoriesService.create(body);
  }

  @ApiOperation({ summary: 'Get all categories' })
  @Get()
  @ApiResponse({ status: 200, description: 'The categories have been successfully retrieved.', type: Category })
  findAll() {
    return this.categoriesService.findAll();
  }

  @ApiOperation({ summary: 'Get a category by ID' })
  @ApiResponse({ status: 200, description: 'The category has been successfully retrieved.', type: Category })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @ApiOperation({ summary: 'Get all posts by category ID' })
  @ApiResponse({ status: 200, description: 'The category has been successfully retrieved.', type: Category })
  @Get(':id/posts')
  findPostsByCategoryId(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findPostsByCategoryId(id);
  }

  @ApiOperation({ summary: 'Update a category by ID' })
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateCategoryDto) {
    return this.categoriesService.update(id, body);
  }

  @ApiOperation({ summary: 'Delete a category by ID' })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}

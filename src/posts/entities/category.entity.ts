import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Post } from './post.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'categories' })
export class Category {
  @ApiProperty({ description: 'The id of the post' })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ description: 'The name of the post' })
  @Column({ type: 'varchar', length: 255, unique: true })
  name!: string;

  @ApiProperty({ description: 'The description of the post' })
  @Column({ type: 'varchar', length: 800, nullable: true })
  description?: string;

  @ApiProperty({ description: 'The cover image of the post' })
  @Column({ type: 'varchar', length: 800, nullable: true, name: 'cover_image' })
  coverImage?: string;

  @ApiProperty({ description: 'The create date of the post' })
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' }) // se crea automaticamente la fecha de creación
  createdAt!: Date;

  @ApiProperty({ description: 'The update date of the post' })
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' }) // se actualiza automaticamente la fecha de actualización
  updatedAt!: Date;

  @ManyToMany(() => Post, (post) => post.categories)
  posts!: Post[];
}

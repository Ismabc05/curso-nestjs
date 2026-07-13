import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../../users/entitites/user.entity';
import { Category } from './category.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'posts' })
export class Post {
  @ApiProperty({ description: 'The id of the post' })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ description: 'The title of the post' })
  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @ApiProperty({ description: 'The content of the post' })
  @Column({ type: 'text', nullable: true })
  content?: string;

  @ApiProperty({ description: 'The description of the post' })
  @Column({ type: 'varchar', length: 800, name: 'cover_image', nullable: true })
  coverImage?: string;

  @ApiProperty({ description: 'The summary of the post' })
  @Column({ type: 'varchar', length: 255, nullable: true })
  summary?: string;

  @ApiProperty({ description: 'The draft of the post' })
  @Column({ type: 'boolean', default: true, name: 'is_draft' })
  isDraft!: boolean;

  @ApiProperty({ description: 'The create date of the post' })
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' }) // se crea automaticamente la fecha de creación
  createdAt!: Date;

  @ApiProperty({ description: 'The update date of the post' })
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' }) // se actualiza automaticamente la fecha de actualización
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.posts, { nullable: false }) // muchos posts pueden pertenecer a un usuario, user.posts es la propiedad que hace referencia a los posts del usuario
  @JoinColumn({ name: 'user_id' }) /// esta es la colummna que se crea como foreign key en la tabla posts.
  user!: User;

  @ManyToMany(() => Category, (category) => category.posts) // muchos posts pueden tener muchas categorias, category.posts es la propiedad que hace referencia a los posts de la categoria
  @JoinTable({
    name: 'posts_categories', // nombre de la tabla intermedia
    joinColumn: { name: 'post_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  categories!: Category[];
}

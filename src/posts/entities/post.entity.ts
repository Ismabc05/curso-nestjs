import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entitites/user.entity';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'text', nullable: true })
  content?: string;

  @Column({ type: 'varchar', length: 255, name: 'cover_image', nullable: true })
  coverImage?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  summary!: string;

  @Column({ type: 'boolean', default: true, name: 'is_draft' })
  isDraft!: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' }) // se crea automaticamente la fecha de creación
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' }) // se actualiza automaticamente la fecha de actualización
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.posts, { nullable: false }) // muchos posts pueden pertenecer a un usuario, user.posts es la propiedad que hace referencia a los posts del usuario
  @JoinColumn({ name: 'user_id' }) /// esta es la colummna que se crea como foreign key en la tabla posts.
  user!: User;
}

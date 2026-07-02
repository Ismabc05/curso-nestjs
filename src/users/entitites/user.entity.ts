import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Profile } from './profile.entity';
import { Post } from '../../posts/entities/post.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn() // se auto incrementa el id
  id!: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 100 })
  password!: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' }) // se crea automaticamente la fecha de creación
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' }) // se actualiza automaticamente la fecha de actualización
  updatedAt!: Date;

  @OneToOne(() => Profile, { nullable: false, cascade: true }) // con cascade todas las operaciones que hagamos user tambien se hace con profile, como por ejemplo si creamos un usuario automaticamente se crea su perfil.
  @JoinColumn({ name: 'profile_id' })
  profile!: Profile;

  @OneToMany(() => Post, (post) => post.user, { nullable: true }) // un usuario puede tener muchos posts, post.user es la propiedad que hace referencia al usuario del post
  posts!: Post[];
}

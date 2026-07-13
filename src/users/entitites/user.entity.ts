import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany, BeforeInsert } from 'typeorm';
import { Profile } from './profile.entity';
import { Post } from '../../posts/entities/post.entity';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class User {
  @ApiProperty({ description: 'The id of the user' })
  @PrimaryGeneratedColumn() // se auto incrementa el id
  id!: number;

  @ApiProperty({ description: 'The email of the user' })
  @Column({ type: 'varchar', length: 100, unique: true })
  email!: string;

  @ApiProperty({ description: 'The password of the user' })
  @Exclude()
  @Column({ type: 'varchar', length: 100 })
  password!: string;

  @ApiProperty({ description: 'The create date of the user' })
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt!: Date;

  @ApiProperty({ description: 'The update date of the user' })
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
  updatedAt!: Date;

  @OneToOne(() => Profile, { nullable: false, cascade: true }) // con cascade todas las operaciones que hagamos user tambien se hace con profile, como por ejemplo si creamos un usuario automaticamente se crea su perfil.
  @JoinColumn({ name: 'profile_id' })
  profile!: Profile;

  @OneToMany(() => Post, (post) => post.user, { nullable: true }) // un usuario puede tener muchos posts, post.user es la propiedad que hace referencia al usuario del post
  posts!: Post[];

  @BeforeInsert() // antes de insertar el usuario en la base de datos, hasheamos la contraseña
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10); // hasheamos la contraseña antes de guardarla en la base de datos
  }
}

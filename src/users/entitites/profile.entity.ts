import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'profiles' })
export class Profile {
  @ApiProperty({ description: 'The id of the user' })
  @PrimaryGeneratedColumn() // se auto incrementa el id
  id!: number;

  @ApiProperty({ description: 'The name of the user' })
  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @ApiProperty({ description: 'The lastname of the user' })
  @Column({ type: 'varchar', length: 200, name: 'last_name' })
  lastName!: string;

  @ApiProperty({ description: 'The avatar of the user' })
  @Column({ type: 'varchar', length: 100, nullable: true })
  avatar?: string;

  @ApiProperty({ description: 'The create date of the user' })
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAT!: Date;

  @ApiProperty({ description: 'The update date of the user' })
  @UpdateDateColumn({ name: 'update_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updateAT!: Date;
}

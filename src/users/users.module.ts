import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entitites/profile.entity';
import { User } from './entitites/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])], // le decimos las entidades que este modulo puede usar
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Exportamos UsersService para que pueda ser utilizado en otros módulos
})
export class UsersModule {}

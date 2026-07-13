import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { AuthService } from '../services/auth.service';
import { User } from '../../users/entitites/user.entity';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: 'Login a user' })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request) {
    // la request es lo que el guardian devuelve, en este caso el usuario
    const user = req.user as User;
    return {
      user,
      access_token: this.authService.generateJwtToken(user),
    };
  }
}

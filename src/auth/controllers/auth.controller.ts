import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('local')) // Usa la strategia de autenticación 'local' para proteger la ruta de inicio de sesión
  @Post('login')
  login(@Req() req: Request) {
    return req.user;
  }
}

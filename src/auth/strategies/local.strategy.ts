import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email', // Configura el campo de nombre de usuario para que sea 'email' en lugar del valor predeterminado 'username'
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    return user;
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('email')
  async emailUser(@Query('uid') uid: string): Promise<object> {
    const email = await this.authService.getEmailUser(uid);
    return {
      email,
      hello: 'world!',
    };
  }
}

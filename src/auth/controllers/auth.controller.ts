import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('healthcheck')
  healthCheck(): string {
    return 'Ok';
  }

  @Get('email')
  async emailUser(@Query('uid') uid: string): Promise<object> {
    const email = await this.authService.getEmailUser(uid);
    return {
      email,
    };
  }
}

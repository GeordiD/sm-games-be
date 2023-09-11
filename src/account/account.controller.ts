import { Controller, Get } from '@nestjs/common';

@Controller('account')
export class AccountController {
  @Get('auth')
  async checkIsAuthenticated() {
    return { test: 'hello world' };
  }
}

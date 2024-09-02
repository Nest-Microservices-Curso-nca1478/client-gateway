import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from '../config';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  registerUser(@Body() registerUserDto: any) {
    return this.client.send('auth.register.user', registerUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: any) {
    return this.client.send('auth.login.user', loginUserDto);
  }

  @Get('verify/:token')
  verifyToken(@Param() token: string) {
    return this.client.send('auth.verify.token', { token });
  }
}

import { Controller, Request, Post, UseGuards, Body, HttpException, HttpStatus } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ChangePasswordDto } from '../user/dto/change-password.dto';
import { ResponseStatus } from './interfaces/response-status.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('sign-in')
  async signIn(@Body() createUserDto: CreateUserDto) {
    const result: ResponseStatus = await this.authService.register(createUserDto);
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.NOT_ACCEPTABLE);
    }
    return result;
  }

  @Post('change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    const result: ResponseStatus = await this.authService.changePassword(changePasswordDto);
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.NOT_ACCEPTABLE);
    }
    return result;
  }
}

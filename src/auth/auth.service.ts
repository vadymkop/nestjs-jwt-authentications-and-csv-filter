import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ResponseStatus } from './interfaces/response-status.interface';
import { UserEntity } from '../user/entity/user.entity';
import { UserDto } from '../user/dto/user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ChangePasswordDto } from '../user/dto/change-password.dto';
import * as bcrypt from 'bcrypt';
import { bcryptSettings } from './auth.settings';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<UserDto> {
    const user = await this.usersService.findOneByUsername(username);
    const isMatch = user && await bcrypt.compare(password, user.password);
    if (isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserEntity) {
    const payload = {
      username: user.username,
      sub: user.userId,
    };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(createUserDto: CreateUserDto): Promise<ResponseStatus> {
    const user = await this.usersService.findOneByUsername(createUserDto.username);
    if (user) {
      return Promise.resolve({
        success: false,
        message: 'user already registered',
      });
    }

    const hash = await bcrypt.hash(createUserDto.password, bcryptSettings.rounds);
    createUserDto.password = hash;
    return this.usersService.create(createUserDto)
      .then(() => ({
        success: true,
        message: 'user registered',
      }))
      .catch(() => ({
        success: false,
        message: 'not valid user',
      }));
  }

  async changePassword(changePasswordDto: ChangePasswordDto): Promise<ResponseStatus> {
    const user = await this.validateUser(changePasswordDto.username, changePasswordDto.password);
    if (!user) {
      return Promise.resolve({
        success: false,
        message: 'wrong password',
      });
    }
    const hash = await bcrypt.hash(changePasswordDto.newPassword, bcryptSettings.rounds);
    changePasswordDto.newPassword = hash;

    return this.usersService.changePassword(changePasswordDto)
      .then(() => ({
        success: true,
        message: 'password changed',
      }))
      .catch(() => ({
        success: false,
        message: 'wrong password',
      }));
  }
}

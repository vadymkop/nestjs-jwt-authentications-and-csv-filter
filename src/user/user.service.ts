import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  findOneByUsername(username: string): Promise<UserEntity> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = new UserEntity();
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    return await user.save();
  }

  async changePassword(changePasswordDto: ChangePasswordDto): Promise<UserEntity> {
    const user = await this.findOneByUsername(changePasswordDto.username);
    user.password = changePasswordDto.newPassword;
    return await user.save();
  }
}

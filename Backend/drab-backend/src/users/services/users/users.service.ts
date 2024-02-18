import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/users.dtos';
import { User } from 'src/typeorm/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  createUser(CreateUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(CreateUserDto);
    return this.userRepository.save(newUser);
  }

  findUserByID(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  getUsers() {
    return this.userRepository.find();
  }
}

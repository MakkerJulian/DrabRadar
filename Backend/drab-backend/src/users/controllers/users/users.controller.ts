import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/users.dtos';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('id/:id')
  findUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findUserByID(id);
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createUser(createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}

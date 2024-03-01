import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AccountService } from '../../services/account/account.service';
import { CreateAccountDto } from 'src/dto/account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  getAccount() {
    return this.accountService.getAccounts();
  }

  @Get('id/:id')
  findAccountById(@Param('id', ParseIntPipe) id: number) {
    return this.accountService.findAccountByID(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createAccount(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.createAccount(createAccountDto);
  }
}

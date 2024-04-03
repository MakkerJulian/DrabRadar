import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AccountService } from '../../services/account/account.service';
import { CreateAccountDto, LoginDto } from 'src/dto/account.dto';
import { AuthGuard } from 'src/api/auth/Authguard';
import { Public } from 'src/api/auth/metaData';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(AuthGuard)
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

  @Public()
  @Post('login')
  @UsePipes(ValidationPipe)
  loginAccount(@Body() loginAccountDto: LoginDto) {
    return this.accountService.loginAccount(loginAccountDto);
  }

  @Delete()
  deleteAccount() {
    return this.accountService.deleteAll();
  }
}

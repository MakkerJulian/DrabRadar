import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAccountDto, LoginDto } from 'src/dto/account.dto';
import { Account } from 'src/typeorm/account.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { account } from 'src/seed';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  createAccount(CreateAccountDto: CreateAccountDto) {
    const password = CreateAccountDto.password;
    const hash = crypto.createHash('md5').update(password).digest('hex');
    const newAccount = { ...CreateAccountDto, password: hash };
    return this.accountRepository.save(newAccount);
  }

  findAccountByID(id: number) {
    return this.accountRepository.findOne({ where: { id: id } });
  }

  findbyEmail(email: string) {
    return this.accountRepository.findOne({ where: { email: email } });
  }

  async loginAccount(loginAccountDto: LoginDto) {
    const password = crypto
      .createHash('md5')
      .update(loginAccountDto.password)
      .digest('hex');
    const account = await this.findbyEmail(loginAccountDto.email);
    if (account.password === password) {
      return { login: true }; //todo aanpassen naar token met experation
    } else {
      return { login: false };
    }
  }

  getAccounts() {
    return this.accountRepository.find();
  }

  deleteAll() {
    return this.accountRepository.clear();
  }
  
  async seedAccounts() {
    account.map((account)=> {
      this.createAccount(account)
    })
  }
}


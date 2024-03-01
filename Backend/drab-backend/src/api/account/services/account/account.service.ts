import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAccountDto } from 'src/dto/account.dto';
import { Account } from 'src/typeorm/account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  createAccount(CreateAccountDto: CreateAccountDto) {
    const newAccount = this.accountRepository.create(CreateAccountDto);
    return this.accountRepository.save(newAccount);
  }

  findAccountByID(id: number) {
    return this.accountRepository.findOne({ where: { id } });
  }

  getAccounts() {
    return this.accountRepository.find();
  }
}

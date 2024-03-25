import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account/account.controller';
import { AccountService } from './services/account/account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/typeorm/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService]
})
export class AccountModule {}

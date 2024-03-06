import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ContractService } from '../../services/contract/contract.service';
import { CreateContractDto } from 'src/dto/contract.dto';

@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Get()
  getContract() {
    return this.contractService.getContracts();
  }

  @Get('id/:id')
  findContractById(@Param('id', ParseIntPipe) id: number) {
    return this.contractService.findContractByID(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createContract(@Body() createContractDto: CreateContractDto) {
    return this.contractService.createContract(createContractDto);
  }

  @Delete()
  deleteContract() {
    return this.contractService.deleteAll();
  }
}

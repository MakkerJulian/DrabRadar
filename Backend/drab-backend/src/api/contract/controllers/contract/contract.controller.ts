import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ContractService } from '../../services/contract/contract.service';
import {
  CreateContractDto,
  CreateContractDtoByCountry,
} from 'src/dto/contract.dto';
import { AuthGuard } from 'src/api/auth/Authguard';

@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @UseGuards(AuthGuard)
  @Get()
  getContract() {
    return this.contractService.getContracts();
  }

  @Get('id/:id')
  findContractById(@Param('id', ParseIntPipe) id: number) {
    return this.contractService.findContractByID(id);
  }

  @Patch(':id/weatherstation/:name')
  deleteContractByWeatherstationId(
    @Param('id') id: number,
    @Param('name') name: string,
  ) {
    return this.contractService.updateContractByWeatherstationId(id, name);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createContract(@Body() createContractDto: CreateContractDto) {
    return this.contractService.createContract(createContractDto);
  }

  @Post('country')
  @UsePipes(ValidationPipe)
  createContractByCountry(
    @Body() createContractByCountry: CreateContractDtoByCountry,
  ) {
    return this.contractService.createContractByCountry(
      createContractByCountry,
    );
  }

  @Delete()
  deleteContract() {
    return this.contractService.deleteAll();
  }

  @Delete(':id')
  deleteContractById(@Param('id', ParseIntPipe) id: number) {
    return this.contractService.deleteContractById(id);
  }
}

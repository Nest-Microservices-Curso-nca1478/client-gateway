import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from '../config';
import { PaginationDto } from '../common';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() body: any) {
    return 'Crea un producto';
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send(
      { cmd: 'find_all_products' },
      paginationDto,
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return 'Obtiene un producto por su id';
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() body: any) {
    return 'Actualiza un producto por su id';
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return 'Elimina un producto por su id';
  }
}

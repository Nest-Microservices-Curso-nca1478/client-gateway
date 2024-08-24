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
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from '../config';

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
  findAll() {
    return this.productsClient.send({ cmd: 'find_all_products' }, {});
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

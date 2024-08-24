import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  create(@Body() body: any) {
    return 'Crea un producto';
  }

  @Get()
  findAll() {
    return 'Obtiene todos los productos';
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

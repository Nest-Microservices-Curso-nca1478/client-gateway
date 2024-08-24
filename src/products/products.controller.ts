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
import { catchError } from 'rxjs';
import { ClientProxy, RpcException } from '@nestjs/microservices';
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
  async findOne(@Param('id', ParseIntPipe) id: string) {
    // opcion #1 - con observable
    return this.productsClient.send({ cmd: 'find_one_product' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );

    // opcion #2 - funciona igual que lo anterior
    // try {
    //   const product = await firstValueFrom(
    //     this.productsClient.send({ cmd: 'find_one_product' }, { id }),
    //   );

    //   return product;
    // } catch (error) {
    //   throw new RpcException(error);
    // }
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

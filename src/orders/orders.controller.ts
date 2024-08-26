import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  Put,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ORDER_SERVICE } from '../config';
import { CreateOrderDto, PaginationOrderDto, StatusOrderDto } from './dto';
import { PaginationDto } from '../common';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      return await firstValueFrom(
        this.ordersClient.send('createOrder', createOrderDto),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  findAll(@Query() paginationOrderDto: PaginationOrderDto) {
    return this.ordersClient.send('findAllOrders', paginationOrderDto);
  }

  @Get('status/:status')
  async findAllByStatus(
    @Param() statusOrderDto: StatusOrderDto,
    @Query() paginationDto: PaginationDto,
  ) {
    try {
      return await firstValueFrom(
        this.ordersClient.send('findAllOrders', {
          ...paginationDto,
          status: statusOrderDto.status,
        }),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await firstValueFrom(
        this.ordersClient.send('findOneOrder', { id }),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Put(':id')
  async changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusOrderDto: StatusOrderDto,
  ) {
    try {
      return await firstValueFrom(
        this.ordersClient.send('changeOrderStatus', { id, ...statusOrderDto }),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}

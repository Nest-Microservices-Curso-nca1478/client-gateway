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
  UseGuards,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from '../config';
import { CreateOrderDto, PaginationOrderDto, StatusOrderDto } from './dto';
import { PaginationDto } from '../common';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      return await firstValueFrom(
        this.client.send('createOrder', createOrderDto),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Query() paginationOrderDto: PaginationOrderDto) {
    try {
      const orders = await firstValueFrom(
        this.client.send('findAllOrders', paginationOrderDto),
      );

      return orders;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('status/:status')
  @UseGuards(AuthGuard)
  async findAllByStatus(
    @Param() statusOrderDto: StatusOrderDto,
    @Query() paginationDto: PaginationDto,
  ) {
    try {
      return await firstValueFrom(
        this.client.send('findAllOrders', {
          ...paginationDto,
          status: statusOrderDto.status,
        }),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await firstValueFrom(this.client.send('findOneOrder', { id }));
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusOrderDto: StatusOrderDto,
  ) {
    try {
      return await firstValueFrom(
        this.client.send('changeOrderStatus', { id, ...statusOrderDto }),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}

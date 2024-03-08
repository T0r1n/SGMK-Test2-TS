import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LogService } from './log.service';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { ProductService } from 'src/product/product.service';
import { Log } from './entities/log.entity';
import { get } from 'http';


@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService,
    private readonly productService: ProductService,) {}

  @Post()
  async processOrder(@Body() orderData: { totalPrice: number, orderItems: { id: number; count: number }[] }) {
    const { totalPrice, orderItems } = orderData;
    await this.productService.processOrderAndSave(totalPrice, orderItems);
    return { message: 'Order processed and saved successfully' };
  }

  @Post('datesort')
  async findLogsByDateRange(@Body() dates: { startDate: string, endDate: string }): Promise<Log[]> {
    const { startDate, endDate } = dates;
    return await this.logService.findLogsByDateRange(startDate, endDate);
}

  @Get('all')
  findAll() {
    return this.logService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLogDto: UpdateLogDto) {
    return this.logService.update(+id, updateLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logService.remove(+id);
  }
}

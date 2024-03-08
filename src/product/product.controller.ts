import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Post('total')
  async getTotalPrice(@Body() products: { id: number; count: number }[]) {
    return this.productService.calculateTotalPrice(products);
  }

  @Get('all')
  findAll() {
    return this.productService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch('update-multiple')
  @UsePipes(new ValidationPipe())
  updateMultiple(@Body() updateProductDtos: UpdateProductDto[]) {
  return this.productService.update(updateProductDtos);
}

@Patch('clientord')
  @UsePipes(new ValidationPipe())
  clientOrder(@Body() updateProductDtos: UpdateProductDto[]) {
  return this.productService.clientord(updateProductDtos);
}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}

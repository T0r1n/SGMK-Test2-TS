import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException, ParseIntPipe } from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post()
  async create(@Body() body: { productId: number, characteristics: { id: number, value: string }[] }) {
    const { productId, characteristics } = body;
    return this.linksService.create(productId, characteristics);
  }

  @Post('getproduct')
async findProductsByCharacteristics(
  @Body() requestBody: any,
  @Query('page', ParseIntPipe) page: number = 1, 
  @Query('limit', ParseIntPipe) limit: number = 10, 
): Promise<any> {
  let characteristicIds: number[] = requestBody.characteristicIds;
  if (!Array.isArray(characteristicIds) || characteristicIds.length === 0) {
    return this.linksService.getAllProducts(page, limit);
  }

  return this.linksService.findProductsByCharacteristics(characteristicIds, page, limit);
}

  @Get()
  findAll() {
    return this.linksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.linksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLinkDto: UpdateLinkDto) {
    return this.linksService.update(+id, updateLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linksService.remove(+id);
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository,In } from 'typeorm';
import { Log } from 'src/log/entities/log.entity';
import { Link } from 'src/links/entities/link.entity';

@Injectable()
export class ProductService {
  constructor(
  @InjectRepository(Product) private readonly pRepository: Repository<Product>,
  @InjectRepository(Log) private readonly logRepository: Repository<Log>
){}

  async create(createProductDto: CreateProductDto) {
    const existProduct = await this.pRepository.findOne({
      where: {
        name: createProductDto.name,
      }
    })
    if(existProduct) throw new BadRequestException('Такой товар уже существует!')

    const product = await this.pRepository.save({
      name: createProductDto.name,
      disc: createProductDto.disc,
      price: createProductDto.price,
      count: createProductDto.count
    })
    return { product };
  }

  async findAll() {
    return await this.pRepository.find({
        order: {
            name: 'ASC' 
        }
    });
}

  async findOne(id: number) {
    return this.pRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(productsToUpdate: UpdateProductDto[]) {
    const promises = productsToUpdate.map(async (updateProductDto) => {
      const { id, count } = updateProductDto;
      const product = await this.pRepository.findOne({ where: { id: id } });
      if (!product) throw new BadRequestException(`Товар с ID ${id} не найден`);
      product.count = count;
      return this.pRepository.save(product);
    });

    return Promise.all(promises);
  }

  async clientord(productsToUpdate: UpdateProductDto[]) {
    const promises = productsToUpdate.map(async (updateProductDto) => {
        const { id, count } = updateProductDto;
        const product = await this.pRepository.findOne({ where: { id: id } });
        if (!product) throw new BadRequestException(`Товар с ID ${id} не найден`);

        if (product.count < count) {
            return { success: false, message: `Недостаточное количество товара "${product.name}"` };
        }
        return { success: true, product, count };
    });

    const results = await Promise.all(promises);
    const errors = results.filter(result => !result.success);

    if (errors.length > 0) {
        throw new BadRequestException(errors.map(error => error.message).join('\n'));
    }

    const updates = results.map(result => {
        result.product.count -= result.count;
        return this.pRepository.save(result.product);
    });

    return Promise.all(updates);
}

async calculateTotalPrice(products: { id: number; count: number }[]) {
  let totalPrice = 0;

  for (const item of products) {
    const product = await this.pRepository.findOne({ where: { id: item.id } });

    if (!product) {
      throw new BadRequestException(`Товар с ID ${item.id} не найден`);
    }

    totalPrice += product.price * item.count;
  }

  return { totalPrice };
}

async processOrderAndSave(totalPrice: number, orderItems: { id: number; count: number }[]): Promise<void> {
  let itemsSummary = '';

  for (const item of orderItems) {
    const product = await this.pRepository.findOne({ where: { id: item.id } });
    if (!product) {
      
      continue;
    }

    itemsSummary += `${product.name} x ${item.count}\n`;
  }

  const order = new Log();
  order.productList = itemsSummary;
  order.totalPrice = totalPrice;

  await this.logRepository.save(order);
}






  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}

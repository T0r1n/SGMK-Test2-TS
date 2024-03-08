import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from './entities/link.entity';
import { In, MoreThan, Repository } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Link)
    private readonly lRepository: Repository<Link>,
    @InjectRepository(Product)
    private readonly pRepository: Repository<Product>,
  ) {}

  async create(productId: number, characteristics: { id: number, value: string }[]) {
    try {
        const links = characteristics.map(characteristic => {
            const link = new Link();
            link.idProduct = productId;
            link.idChar = characteristic.id;
            link.value = characteristic.value;
            return link;
        });

        await this.lRepository.save(links);
        return 'Связи успешно созданы';
    } catch (error) {
        throw new BadRequestException('Не удалось создать связи');
    }
}

async getAllProducts(page: number, limit: number): Promise<Product[]> {
  const skip = (page - 1) * limit;
  return await this.pRepository.find({
    where: {
      count: MoreThan(0)
    },
    skip,
    take: limit,
    order: {
      id: 'ASC' 
    }
  });
}

async findProductsByCharacteristics(characteristicIds: number[], page = 1, limit = 10): Promise<Product[]> {
  try {
    const skip = (page - 1) * limit;
    let query = this.pRepository
      .createQueryBuilder('product')
      .innerJoin('product.link', 'link') 
      .where('link.idChar IN (:...characteristicIds)', { characteristicIds })
      .andWhere('product.count > 0')
      .groupBy('product.id') 
      .skip(skip)
      .take(limit);

    if (page === 0 && limit === 0) {
      query = query.skip(0).take(0); 
    }

    const products = await query.getMany();
    return products;
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
    throw new BadRequestException('Не удалось выполнить поиск товаров по характеристикам');
  }
}


  findAll() {
    return `This action returns all links`;
  }

  findOne(id: number) {
    return `This action returns a #${id} link`;
  }

  update(id: number, updateLinkDto: UpdateLinkDto) {
    return `This action updates a #${id} link`;
  }

  remove(id: number) {
    return `This action removes a #${id} link`;
  }
}




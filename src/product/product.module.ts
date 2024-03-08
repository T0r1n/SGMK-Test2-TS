import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Log } from 'src/log/entities/log.entity';
import { Link } from 'src/links/entities/link.entity';
import { LinksModule } from 'src/links/links.module';
import { Repository } from 'typeorm';


@Module({
  imports:[TypeOrmModule.forFeature([Product,Log])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}

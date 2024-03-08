import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { CharacteristicModule } from './characteristic/characteristic.module';
import { LinksModule } from './links/links.module';
import { LogModule } from './log/log.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),
  TypeOrmModule.forRootAsync({
    imports:[ConfigModule],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}']
    }),
    inject:[ConfigService],
  }),
  ProductModule,
  CharacteristicModule,
  LinksModule,
  LogModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

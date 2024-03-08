import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from './entities/log.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log) private readonly logRepository: Repository<Log>,
  ){}

  async findLogsByDateRange(startDate: string, endDate: string): Promise<Log[]> {
    return await this.logRepository
      .createQueryBuilder('log')
      .where('log.date BETWEEN :startDate AND :endDate', { startDate, endDate })
      .getMany();
  }

  create(createLogDto: CreateLogDto) {
    return 'This action adds a new log';
  }

  async findAll() {
    return await this.logRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} log`;
  }

  update(id: number, updateLogDto: UpdateLogDto) {
    return `This action updates a #${id} log`;
  }

  remove(id: number) {
    return `This action removes a #${id} log`;
  }
}

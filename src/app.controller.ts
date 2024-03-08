import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import * as path from 'path';
import { Response } from 'express';
import * as fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHomePage(@Res() res: Response) {
    const htmlPath = path.join(__dirname, '..', 'Front', 'index.html');
    fs.readFile(htmlPath, 'utf8', (err, htmlContent) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
      res.send(htmlContent);
    });
  }
}

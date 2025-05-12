import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [BooksModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

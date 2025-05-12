import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Response } from 'express';
import { LoggerService } from 'src/logger/logger.service';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { BookFilters } from './interfaces/book.interface';

@Controller('books')
export class BooksController {
  constructor(
    private booksService: BooksService,
    private loggerService: LoggerService,
  ) {}

  @Get()
  getAllBooks(
    @Query('title') title: string,
    @Query('author') author: string,
    @Query('available') available: string,
    @Query('minPrice') minPrice: string,
    @Query('maxPrice') maxPrice: string,
  ) {
    console.log('Request received for all books:', {
      title,
      author,
      available,
      minPrice,
      maxPrice,
    });

    const bookFilters: BookFilters = {
      title,
      author,
      available: available === 'true',
      minPrice: !isNaN(Number(minPrice)) ? Number(minPrice) : null,
      maxPrice: !isNaN(Number(maxPrice)) ? Number(maxPrice) : null,
    };

    this.loggerService.addLog('Books fetched');
    return this.booksService.getAllBooks(bookFilters);
  }

  @Get(':id')
  getBookById(@Param('id') bookId: string) {
    console.log('Fetching book by ID:', bookId);
    return this.booksService.getBookById(bookId);
  }

  @HttpCode(201)
  @Post()
  createBook(@Body() body: CreateBookDto) {
    console.log('Creating a new book:', body);
    return this.booksService.createBook(body);
  }

  @Patch(':id')
  async updateBook(@Param('id') id: string, @Body() updateData: UpdateBookDto) {
    console.log('PATCH Request Received:', id, updateData);
    const updatedBook = await this.booksService.updateBook(id, updateData);
    return { message: 'Book updated successfully', updatedBook };
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string, @Res() res: Response) {
    console.log('Deleting book with ID:', id);
    await this.booksService.deleteBook(id);
    res.status(200).json({ message: 'Book deleted successfully' });
  }
}

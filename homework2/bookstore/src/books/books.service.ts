import { Injectable, NotFoundException } from '@nestjs/common';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Book, BookFilters } from './interfaces/book.interface';
import { v4 as uuid } from 'uuid';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';

@Injectable()
export class BooksService {
  private BOOKS_PATH = join(
    process.cwd(),
    'src',
    'books',
    'data',
    'books.json',
  );

  async getAllBooks(filters?: BookFilters) {
    console.log('Incoming Filters:', filters);

    const booksJSON = await readFile(this.BOOKS_PATH, 'utf-8');
    let books = JSON.parse(booksJSON) as Book[];

    console.log('Initial Books:', books);

    if (filters?.title) {
      books = books.filter((book) =>
        book.title
          .toLowerCase()
          .includes(filters.title?.toLowerCase() as string),
      );
    }
    if (filters?.author) {
      books = books.filter((book) =>
        book.author
          .toLowerCase()
          .includes(filters.author?.toLowerCase() as string),
      );
    }
    if (filters?.available) {
      books = books.filter((book) => book.stock > 0);
    }
    if (!isNaN(Number(filters?.minPrice))) {
      books = books.filter((book) => book.price >= Number(filters?.minPrice));
    }
    if (!isNaN(Number(filters?.maxPrice))) {
      books = books.filter((book) => book.price <= Number(filters?.maxPrice));
    }

    console.log('Filtered Books:', books);
    return books;
  }

  async saveBooks(books: Book[]) {
    await writeFile(this.BOOKS_PATH, JSON.stringify(books, null, 2), 'utf-8');
  }

  async getBookById(id: string) {
    console.log(`Fetching book with ID: ${id}`);
    const books = await this.getAllBooks();
    const foundBook = books.find((book) => book.id === id);

    if (!foundBook) throw new NotFoundException('Book not found');
    return foundBook;
  }

  async createBook(bookData: CreateBookDto) {
    console.log('Creating book:', bookData);

    const books = await this.getAllBooks();
    const newBook: Book = { id: uuid(), ...bookData };

    books.push(newBook);
    await this.saveBooks(books);

    console.log('New book created:', newBook);
    return newBook;
  }

  async updateBook(bookId: string, updateData: UpdateBookDto) {
    console.log(`Updating book with ID: ${bookId}`, updateData);

    const books = await this.getAllBooks();
    const bookExists = books.some((book) => book.id === bookId);

    if (!bookExists) throw new NotFoundException('Book not found');

    const updatedBooks = books.map((book) =>
      book.id === bookId ? { ...book, ...updateData } : book,
    );

    await this.saveBooks(updatedBooks);
    console.log('Book updated:', updateData);
  }

  async deleteBook(id: string) {
    console.log(`Deleting book with ID: ${id}`);
    const books = await this.getAllBooks();
    const updatedBooks = books.filter((book) => book.id !== id);

    if (books.length === updatedBooks.length)
      throw new NotFoundException('Book not found');

    await this.saveBooks(updatedBooks);
    console.log('Book deleted:', id);
  }
}

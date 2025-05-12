import { IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @Length(3, 100)
  title: string;

  @IsString()
  @Length(3, 50)
  author: string;

  @IsNumber()
  @Min(1)
  stock: number;

  @IsNumber()
  @Min(1)
  price: number;
}

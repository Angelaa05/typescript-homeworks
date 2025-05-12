import { IsString, Length, IsNumber, Min, IsOptional } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @Length(3, 100)
  @IsOptional()
  title: string;

  @IsString()
  @Length(3, 50)
  @IsOptional()
  author: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  stock: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  price: number;
}

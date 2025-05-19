import { IsInt, Min, Max, IsEnum, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum RoomType {
  SINGLE = 'SINGLE',
  DOUBLE = 'DOUBLE',
  SUITE = 'SUITE',
  DELUXE = 'DELUXE',
}

export class RoomDto {
  @ApiProperty({ example: 101, description: 'Room number (1-999)' })
  @IsInt()
  @Min(1)
  @Max(999)
  roomNumber: number;

  @ApiProperty({ example: 'DELUXE', enum: RoomType, description: 'Room type' })
  @IsEnum(RoomType)
  type: RoomType;

  @ApiProperty({ example: 200, description: 'Price (50-1000)' })
  @IsInt()
  @Min(50)
  @Max(1000)
  price: number;

  @ApiProperty({ example: true, description: 'Availability status' })
  @IsBoolean()
  isAvailable: boolean;
}

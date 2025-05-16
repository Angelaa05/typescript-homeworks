import { ApiProperty } from '@nestjs/swagger';

export enum RoomType {
  SINGLE = 'SINGLE',
  DOUBLE = 'DOUBLE',
  SUITE = 'SUITE',
  DELUXE = 'DELUXE',
}
export class Room {
  @ApiProperty()
  roomNumber: number;

  @ApiProperty()
  type: RoomType;

  @ApiProperty()
  price: number;

  @ApiProperty()
  isAvailable: boolean;
}

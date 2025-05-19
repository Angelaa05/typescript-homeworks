import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum RoomType {
  SINGLE = 'SINGLE',
  DOUBLE = 'DOUBLE',
  SUITE = 'SUITE',
  DELUXE = 'DELUXE',
}

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  roomNumber: number;

  @Column({ type: 'enum', enum: RoomType })
  @ApiProperty()
  type: RoomType;

  @Column()
  @ApiProperty()
  price: number;

  @Column()
  @ApiProperty()
  isAvailable: boolean;
}

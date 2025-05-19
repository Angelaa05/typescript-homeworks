import { IsBoolean, IsEnum, IsInt, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoomType } from './room.dto';

export class CreateRoomDto {
  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(999)
  roomNumber: number;

  @ApiProperty()
  @IsEnum(RoomType)
  type: RoomType;

  @ApiProperty()
  @IsInt()
  @Min(50)
  @Max(1000)
  price: number;

  @ApiProperty()
  @IsBoolean()
  isAvailable: boolean;
}

import { IsBoolean, IsEnum, IsInt, Max, Min } from 'class-validator';

import { RoomType } from '../entitites/room.entity';

export class CreateRoomDto {
  @IsInt()
  @Min(1)
  @Max(999)
  roomNumber: number;

  @IsEnum(RoomType)
  type: RoomType;

  @IsInt()
  @Min(50)
  @Max(1000)
  price: number;

  @IsBoolean()
  isAvailable: boolean;
}

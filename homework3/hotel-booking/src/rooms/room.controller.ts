import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoomsService } from './room.service';
import { CreateRoomDto } from './dtos/create-room.dto';
import { UpdateRoomDto } from './dtos/update-room.dto';

@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomService: RoomsService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.createRoom(createRoomDto);
  }

  @Get()
  findAll() {
    return this.roomService.findAll();
  }

  @Get(':roomNumber')
  findOne(@Param('roomNumber') roomNumber: number) {
    return this.roomService.findById(roomNumber);
  }

  @Put(':roomNumber')
  update(
    @Param('roomNumber') roomNumber: number,
    @Body() updatedRoom: UpdateRoomDto,
  ) {
    return this.roomService.updateRoom(roomNumber, updatedRoom);
  }

  @Delete(':roomNumber')
  delete(@Param('roomNumber') roomNumber: number) {
    return this.roomService.delete(roomNumber);
  }
}

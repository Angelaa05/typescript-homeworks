import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room, RoomType } from './entitites/room.entity';
import { CreateRoomDto } from './dtos/create-room.dto';
import { UpdateRoomDto } from './dtos/update-room.dto';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private roomsRepository: Repository<Room>,
  ) {}

  async findAll() {
    return this.roomsRepository.find();
  }

  async findById(roomNumber: number) {
    const foundRoom = await this.roomsRepository.findOneBy({ roomNumber });

    if (!foundRoom) throw new NotFoundException('room not found');

    return foundRoom;
  }

  async createRoom(createData: CreateRoomDto) {
    return this.roomsRepository.save(createData);
  }

  async updateRoom(roomNumber: number, updateData: UpdateRoomDto) {
    const foundRoom = await this.findById(roomNumber);

    Object.assign(foundRoom, updateData);

    console.log(foundRoom);

    await this.roomsRepository.save(foundRoom);
  }

  async delete(roomNumber: number) {
    const foundRoom = await this.findById(roomNumber);

    await this.roomsRepository.remove(foundRoom);
  }
}

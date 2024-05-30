import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { In, Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishesRepository: Repository<Wish>,
    private usersService: UsersService,
  ) {}
  async create(createWishDto: CreateWishDto, userId) {
    const user = await this.usersService.findOne(userId);
    const wish = await this.wishesRepository.create({
      ...createWishDto,
      owner: user,
    });
    return await this.wishesRepository.save(wish);
  }

  async findByIds(ids: number[]) {
    return await this.wishesRepository.find({ where: { id: In(ids) } });
  }

  async findOne(id: number) {
    return await this.wishesRepository.findOne({
      where: { id },
      relations: ['owner', 'offers'],
    });
  }

  async update(id: number, updateWishDto: UpdateWishDto) {
    await this.wishesRepository.update(id, updateWishDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const wish = await this.findOne(id);
    return await this.wishesRepository.remove(wish);
  }
}

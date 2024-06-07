import { ForbiddenException, Injectable } from '@nestjs/common';
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
    return await this.wishesRepository.create({
      ...createWishDto,
      owner: user,
    });
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
    const wish = await this.findOne(id);
    if (updateWishDto.price && wish.offers.length > 0) {
      throw new ForbiddenException('Стоимость подарка нельзя изменить');
    }
    await this.wishesRepository.update(id, updateWishDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const wish = await this.findOne(id);
    return await this.wishesRepository.remove(wish);
  }

  async getLastWishes() {
    return await this.wishesRepository.find({
      order: { createdAt: 'DESC' },
      take: 40,
      relations: ['owner', 'offers'],
    });
  }
  async getTopWishes() {
    return await this.wishesRepository.find({
      order: { copied: 'DESC' },
      take: 20,
      relations: ['owner', 'offers'],
    });
  }
  async copyWish(wishId: number, userId: number) {
    const wish = await this.findOne(wishId);
    await this.wishesRepository.save({ ...wish, copied: wish.copied++ });
    const newWish: CreateWishDto = {
      name: wish.name,
      link: wish.link,
      image: wish.image,
      price: wish.price,
      description: wish.description,
    };
    return await this.create(newWish, userId);
  }
}

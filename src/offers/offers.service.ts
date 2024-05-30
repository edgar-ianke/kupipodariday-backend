import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './entities/offer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { WishesService } from '../wishes/wishes.service';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offersRepository: Repository<Offer>,
    private usersService: UsersService,
    private wishesService: WishesService,
  ) {}
  async create(createOfferDto: CreateOfferDto, userId) {
    const user = await this.usersService.findOne(userId);
    const item = await this.wishesService.findOne(createOfferDto.itemId);
    const offer = await this.offersRepository.create({
      ...createOfferDto,
      user,
      item,
    });
    return await this.offersRepository.save(offer);
  }

  async findOne(id: number) {
    return await this.offersRepository.findOne({
      where: { id },
      relations: ['user', 'item'],
    });
  }
  async update(id: number, updateOfferDto: UpdateOfferDto) {
    await this.offersRepository.update(id, updateOfferDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const offer = await this.findOne(id);
    return await this.offersRepository.remove(offer);
  }
}

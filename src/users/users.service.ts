import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);

    return this.userRepository.save(user);
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    return user;
  }

  async findByName(name: string) {
    return await this.userRepository.findOneBy({ username: name });
  }

  async updateOne(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async removeOne(id: number) {
    const user = await this.findOne(id);
    return await this.userRepository.remove(user);
  }
}

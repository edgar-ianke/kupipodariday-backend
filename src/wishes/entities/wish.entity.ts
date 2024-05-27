import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { IsInt, IsUrl, MaxLength, MinLength } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { BaseEntity } from '../../base-entity/base.entity';

@Entity()
export class Wish extends BaseEntity {
  @Column()
  @MinLength(1)
  @MaxLength(250)
  name: string;

  @Column()
  @IsUrl()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column({ type: 'float' })
  @IsInt()
  price: number;

  @Column({ type: 'float' })
  @IsInt()
  raised: number;

  @Column()
  @MinLength(1)
  @MaxLength(1024)
  description: string;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @Column({ default: 0 })
  copied: number;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];
}

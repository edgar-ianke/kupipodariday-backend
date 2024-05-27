import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Wish } from '../../wishes/entities/wish.entity';
import { BaseEntity } from '../../base-entity/base.entity';

@Entity()
export class Offer extends BaseEntity {
  @Column()
  @ManyToOne(() => User, (user) => user.offers)
  user: User;

  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;

  @Column({ type: 'float' })
  amount: number;

  @Column({ default: false })
  hidden: boolean;
}

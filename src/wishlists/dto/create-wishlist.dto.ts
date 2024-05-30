import { IsNotEmpty, IsNumber, IsUrl } from 'class-validator';

export class CreateWishlistDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  itemsId: number[];
}

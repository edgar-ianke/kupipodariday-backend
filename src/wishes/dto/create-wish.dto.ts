import {
  IsNotEmpty,
  IsNumber,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateWishDto {
  @MinLength(1)
  @MaxLength(250)
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsUrl()
  link: string;

  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(1024)
  description: string;
}

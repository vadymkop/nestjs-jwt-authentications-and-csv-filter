import { IsNumberString } from 'class-validator';

export class FindProductDto {
  @IsNumberString()
  productId: number;
}

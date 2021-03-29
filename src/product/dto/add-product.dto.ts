import { IsNumber, IsNumberString, IsString } from 'class-validator';

export class AddProductDto {
  @IsString()
  name: string;

  @IsNumberString({}, {
    message: 'price must be a string number conforming to the two decimal places constraints',
  })
  price: string;
}

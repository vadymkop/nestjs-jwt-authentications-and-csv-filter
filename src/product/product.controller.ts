import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { AddProductDto } from './dto/add-product.dto';
import { ProductEntity } from './entity/product.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductDto } from './dto/find-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':productId')
  findOne(@Param() params: FindProductDto) {
    return this.productService.findOne(params.productId).then(product => {
      if (!product) {
        throw new HttpException('product not found', HttpStatus.NOT_FOUND);
      }
      return product;
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() addProductDto: AddProductDto): Promise<ProductEntity> {
    return this.productService.create(addProductDto).catch(() => {
      throw new HttpException('not valid product', HttpStatus.NOT_ACCEPTABLE);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Body() updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    return this.productService.update(updateProductDto).catch(() => {
      throw new HttpException('not valid product', HttpStatus.NOT_ACCEPTABLE);
    });
  }
}

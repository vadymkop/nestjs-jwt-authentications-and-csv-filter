import { Injectable } from '@nestjs/common';
import { ProductEntity } from './entity/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddProductDto } from './dto/add-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productsRepository: Repository<ProductEntity>,
  ) {}

  findAll(): Promise<ProductEntity[]> {
    return this.productsRepository.find();
  }

  findOne(productId: number): Promise<ProductEntity> {
    return this.productsRepository.findOne({ where: { productId } });
  }

  async create(addProductDto: AddProductDto): Promise<ProductEntity> {
    const product = new ProductEntity();
    product.name = addProductDto.name;
    product.price = addProductDto.price;
    await product.save();
    return await this.findOne(product.productId);
  }

  async update(updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    const product: ProductEntity = await this.findOne(updateProductDto.productId);
    product.name = updateProductDto.name;
    product.price = updateProductDto.price;
    await product.save();
    return await this.findOne(product.productId);
  }
}

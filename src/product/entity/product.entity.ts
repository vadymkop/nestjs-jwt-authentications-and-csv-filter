import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('product')
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  productId: number;

  @Column()
  name: string;

  @Column('money')
  price: string;
}

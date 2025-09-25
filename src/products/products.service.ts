import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  private counter = 1;

  create(input: CreateProductInput): Product {
    const newProduct = { id: this.counter++, ...input };
    this.products.push(newProduct);
    return newProduct;
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product) throw new NotFoundException(`Product ${id} not found`);
    return product;
  }

  update(input: UpdateProductInput): Product {
    const product = this.findOne(input.id);
    Object.assign(product, input);
    return product;
  }

  remove(id: number): Product {
    const product = this.findOne(id);
    this.products = this.products.filter((p) => p.id !== id);
    return product;
  }
}

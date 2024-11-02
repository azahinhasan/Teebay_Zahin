import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/service/prisma.service';
import {
  CreateProductDto,
  UpdateProductDto,
} from '../dto/product.mutation.dto';
import { Product } from '@prisma/client';
import { GetProductInfo } from '../dto/product.query.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: CreateProductDto,
    userId: number,
  ): Promise<GetProductInfo> {
    const { categoryIds, ...otherData } = data;
    return this.prisma.product.create({
      data: {
        ...otherData,
        userId,
        categories: {
          connect: categoryIds.map((id) => ({ id })),
        },
      },
      include: {
        user: true,
        categories: true,
      },
    });
  }

  async findAll(): Promise<GetProductInfo[]> {
    return this.prisma.product.findMany({
      include: {
        user: true,
        categories: true, 
      },
    });
  }

  async findAllOwnProducts(userId: number): Promise<GetProductInfo[]> {
    return this.prisma.product.findMany({
      where: { userId },
      include: {
        user: true,
        categories: true, 
      },
    });
  }

  async findOne(id: number): Promise<GetProductInfo> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        user: true,
        categories: true, 
      },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(id: number, data: UpdateProductDto): Promise<GetProductInfo> {
    const { categoryIds, ...otherData } = data;

    const findProduct = await this.findOne(id);
    if (!findProduct) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.product.update({
      where: { id },
      data: {
        ...otherData,
        categories: {
          set: categoryIds.map((id) => ({ id })),
        },
      },
      include: {
        user: true,
        categories: true,
      },
    });
  }

  async remove(id: number): Promise<boolean> {
    await this.findOne(id);
    await this.prisma.product.delete({ where: { id } });
    return true;
  }
}

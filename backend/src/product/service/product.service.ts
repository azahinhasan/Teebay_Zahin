import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/service/prisma.service';
import {
  CreateProductDto,
  UpdateProductDto,
} from '../dto/product.mutation.dto';
import { Product } from '@prisma/client';
import { GetProductInfo, GetProductsInfo } from '../dto/product.query.dto';

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

  async findAll(): Promise<GetProductsInfo> {
    const data = await this.prisma.product.findMany({
      where: { status: 'available' },
      include: {
        user: true,
        categories: true,
      },
    });
    return { list: data };
  }

  async findAllOwnProducts(userId: number): Promise<GetProductsInfo> {
    const data = await this.prisma.product.findMany({
      where: { userId },
      include: {
        user: true,
        categories: true,
      },
    });
    return { list: data };
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

  async incrementViewCount(id: number): Promise<GetProductInfo> {
    const product = await this.prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data: { totalViews: { increment: 1 } },
    });

    return updatedProduct ;
  }
}

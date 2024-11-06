import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/service/prisma.service';
import {
  CreateProductDto,
  UpdateProductDto,
} from '../dto/product.mutation.dto';
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

  async findAll(userId: number): Promise<GetProductsInfo> {
    const data = await this.prisma.product.findMany({
      where: { status: 'available', userId: { not: userId } },
      include: {
        user: true,
        categories: true,
      },
    });
    return { list: data };
  }

  async findAllOwnProducts(userId: number): Promise<GetProductsInfo> {
    const data = await this.prisma.product.findMany({
      where: { userId,transactions: { none: {} } },
      include: {
        user: true,
        categories: true,
      },
      orderBy: {
        createdAt: 'desc',
    }});
    return { list: data };
  }

  async findOne(
    userId: number,
    id: number,
    isOwnProductCheck: boolean = false,
  ): Promise<GetProductInfo> {
    const temp = isOwnProductCheck
      ? { userId: userId }
      : { userId: { not: userId } };
    const product = await this.prisma.product.findUnique({
      where: { id, ...temp },
      include: {
        user: true,
        categories: true,
      },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.incrementViewCount(id);
    return product;
  }

  async update(
    userId: number,
    id: number,
    data: UpdateProductDto,
  ): Promise<GetProductInfo> {
    const { categoryIds, ...otherData } = data;

    const product = await this.findOne(userId, id, true);
    if (product.status !== 'available' || product.userId !== userId) {
      throw new NotFoundException('Product not available for updating');
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

  async remove(userId: number, id: number): Promise<GetProductInfo> {
    const product = await this.findOne(userId, id, true);
    const transaction = await this.prisma.transaction.findFirst({
      where: { id },
    });
    if (transaction) {
      //only owner can remove products and can't remove products in if it has any transaction history
      throw new NotFoundException('Product not available for deleting');
    }
    return this.prisma.product.delete({ where: { id } });
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

    return updatedProduct;
  }
}

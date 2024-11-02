import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/service/prisma.service';
import { GetCategoryInfo } from '../dto/category.query.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<GetCategoryInfo[]> {
    return this.prisma.category.findMany({
      include: {
        products: true
      },
    });
  }
}

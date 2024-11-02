import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/service/prisma.service';
import { GetCategoryInfo, GetAllCategoryInfo } from '../dto/category.query.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<GetAllCategoryInfo> {
    const data = await this.prisma.category.findMany({
      include: {
        products: true,
      },
    });

    const categoryList: GetCategoryInfo[] = data.map((category) => ({
      id: category.id,
      name: category.name,
      products: category.products,
    }));

    return { list: categoryList };
  }
}

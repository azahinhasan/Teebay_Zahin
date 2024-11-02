import { Resolver, Query } from '@nestjs/graphql';
import { CategoryService } from '../service/category.service';
import { GetCategoryInfo } from '../dto/category.query.dto';
import { AuthGuard } from '../../common/guards/jwt.middleware';
import { UseGuards } from '@nestjs/common';

@Resolver(() => GetCategoryInfo)
@UseGuards(AuthGuard)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [GetCategoryInfo])
  async getAllCategories(): Promise<GetCategoryInfo[]> {
    return this.categoryService.findAll();
  }
}

import { Resolver, Query } from '@nestjs/graphql';
import { CategoryService } from '../service/category.service';
import { GetCategoryInfo,GetAllCategoryInfo } from '../dto/category.query.dto';
import { AuthGuard } from '../../common/guards/jwt.middleware';
import { UseGuards } from '@nestjs/common';

@Resolver(() => GetCategoryInfo)
@UseGuards(AuthGuard)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => GetAllCategoryInfo)
  async getAllCategories(): Promise<GetAllCategoryInfo> {
    return this.categoryService.findAll();
  }
}

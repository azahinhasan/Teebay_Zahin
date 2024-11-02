import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { ProductService } from '../service/product.service';
import { Product } from '../model/product.model';
import {
  CreateProductDto,
  UpdateProductDto,
} from '../dto/product.mutation.dto';
import { GetProductInfo } from '../dto/product.query.dto';
import { UseGuards,UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/jwt.middleware';

@Resolver(() => Product)
@UseGuards(AuthGuard)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product])
  async getAllProducts(): Promise<GetProductInfo[]> {
    return this.productService.findAll();
  }

  @Query(() => Product)
  async getProduct(@Args('id') id: number): Promise<GetProductInfo> {
    return this.productService.findOne(id);
  }

  /* ------------------------------------------mutation--------------------------------------------------------- */

  @Mutation(() => Product)
  async createProduct(
    @Context() context: any,
    @Args('data') data: CreateProductDto,
  ): Promise<GetProductInfo> {
    return this.productService.create(data, context.req.user_id);
  }
  @Mutation(() => Product)
  async updateProduct(
    @Args('id') id: number,
    @Args('data') data: UpdateProductDto,
  ): Promise<GetProductInfo> {
    return this.productService.update(id, data);
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Args('id') id: number): Promise<boolean> {
    return this.productService.remove(id);
  }
}

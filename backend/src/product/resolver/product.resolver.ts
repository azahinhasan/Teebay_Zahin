import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { ProductService } from '../service/product.service';
import { Product } from '../model/product.model';
import {
  CreateProductDto,
  UpdateProductDto,
} from '../dto/product.mutation.dto';
import { GetProductInfo, GetProductsInfo } from '../dto/product.query.dto';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/jwt.middleware';
import { FormatInterceptor } from '../../common/interceptor/formate-response.interceptor';

@Resolver(() => Product)
@UseGuards(AuthGuard)
@UseInterceptors(FormatInterceptor)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => GetProductsInfo)
  async getAllProducts(@Context() context: any): Promise<GetProductsInfo> {
    return this.productService.findAll(context.req.user_id);
  }

  @Query(() => GetProductInfo)
  async getProduct(@Context() context: any,@Args('id') id: number,@Args('isOwnProductCheck') isOwnProductCheck: boolean): Promise<GetProductInfo> {
    return this.productService.findOne(context.req.user_id,id,isOwnProductCheck);
  }

  @Query(() => GetProductsInfo)
  async getAllOwnProducts(@Context() context: any): Promise<GetProductsInfo> {
    return this.productService.findAllOwnProducts(context.req.user_id);
  }

  /* ------------------------------------------mutation--------------------------------------------------------- */

  @Mutation(() => GetProductInfo)
  async createProduct(
    @Context() context: any,
    @Args('input') input: CreateProductDto,
  ): Promise<GetProductInfo> {
    return this.productService.create(input, context.req.user_id);
  }
  @Mutation(() => GetProductInfo)
  async updateProduct(
    @Context() context: any,
    @Args('id') id: number,
    @Args('input') input: UpdateProductDto,
  ): Promise<GetProductInfo> {
    return this.productService.update(context.req.user_id,id, input);
  }

  @Mutation(() => GetProductInfo)
  async deleteProduct(
    @Context() context: any,
    @Args('id') id: number,
  ): Promise<GetProductInfo> {
    return this.productService.remove(context.req.user_id,id);
  }

  @Mutation(() => GetProductInfo)
  async viewProduct(@Args('id') id: number): Promise<GetProductInfo> {
    return this.productService.incrementViewCount(id);
  }
}

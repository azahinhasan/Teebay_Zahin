import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BaseResponse } from '../../common/dto/base-response.dto';
import { GetProductInfo } from 'src/product/dto/product.query.dto';

@ObjectType() 
export class GetCategoryInfo extends BaseResponse {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => [GetProductInfo], { nullable: true })
  products?: GetProductInfo[];
}


@ObjectType() 
export class GetAllCategoryInfo extends BaseResponse {
  @Field(() => [GetCategoryInfo], { nullable: true }) 
  list: GetCategoryInfo[];
}

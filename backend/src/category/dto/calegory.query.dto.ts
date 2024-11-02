import { InputType, Field, Int } from '@nestjs/graphql';
import { BaseResponse } from '../../common/dto/base-response.dto';
import { GetProductInfo } from 'src/product/dto/product.query.dto';
@InputType()
export class GetCategoryInfo extends BaseResponse {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => [GetProductInfo])
  products?: GetProductInfo[];
}

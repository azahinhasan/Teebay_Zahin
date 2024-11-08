import { InputType,ObjectType, Field, Int } from '@nestjs/graphql';
import { BaseResponse } from '../../common/dto/base-response.dto';
import {GetUserInfo} from '../../user/dto/user.query.dto'
import {GetCategoryInfo} from '../../category/dto/category.query.dto'
import { GetTransactionInfo } from 'src/transaction/dto/transaction.query.dto';

@ObjectType()
export class GetProductInfo extends BaseResponse {
  @Field({ nullable: true })
  id?: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  rentPrice?: number;

  @Field({ nullable: true })
  totalViews?: number;

  @Field({ nullable: true })
  rentDuration?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  userId?: number;

  @Field({ nullable: true })
  user?: GetUserInfo;

  @Field(() => [GetCategoryInfo], { nullable: true }) 
  categories?: GetCategoryInfo[];

  @Field(() => [GetTransactionInfo], { nullable: true }) 
  transactions?: GetTransactionInfo[];

}

@ObjectType()
export class GetProductsInfo extends BaseResponse {
  @Field(() => [GetProductInfo], { nullable: true }) 
  list: GetProductInfo[]; 
}
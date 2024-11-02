import { InputType, Field, Int } from '@nestjs/graphql';
import { BaseResponse } from '../../common/dto/base-response.dto';
import {GetUserInfo} from '../../user/dto/user.query.dto'
import {GetCategoryInfo} from '../../category/dto/calegory.query.dto'
export class GetProductInfo extends BaseResponse {
  @Field()
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  rentPrice?: number;

  @Field({ nullable: true })
  rentDuration?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  user?: GetUserInfo;

  @Field(() => [GetCategoryInfo], { nullable: true }) 
  categories?: GetCategoryInfo[]; 
}

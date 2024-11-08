import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResponse } from '../../common/dto/base-response.dto';
import { GetUserInfo } from '../../user/dto/user.query.dto';
import { GetProductInfo } from '../../product/dto/product.query.dto';

@ObjectType()
export class GetTransactionInfo extends BaseResponse {
  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  transactionDate?: Date;

  @Field({ nullable: true })
  rentalDateStart?: Date;

  @Field({ nullable: true })
  rentalDateEnd?: Date;

  @Field({ nullable: true })
  transactionType?: string;

  @Field({ nullable: true })
  user?: GetUserInfo;

  @Field(()=>GetProductInfo,{ nullable: true })
  product?: GetProductInfo;
}


@ObjectType()
export class GetTransactionOfSelf extends BaseResponse {
  @Field(() => [GetTransactionInfo], { nullable: true }) 
  borrowed?: GetTransactionInfo[];

  @Field(() => [GetTransactionInfo], { nullable: true }) 
  lent?: GetTransactionInfo[];

  @Field(() => [GetTransactionInfo], { nullable: true }) 
  sold?: GetTransactionInfo[];

  @Field(() => [GetTransactionInfo], { nullable: true })
  bought?: GetTransactionInfo[];
}
import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseResponse } from '../../common/dto/base-response.dto';

export enum TransactionActionTypes {
  bought = 'bought',
  borrowed = 'borrowed',
  returned = 'returned'
}

@InputType()
export class BuyProductDto extends BaseResponse {
  @Field(() => Int)
  productId: number;
}

@InputType()
export class RentProductDto extends BaseResponse {
  @Field(() => Int)
  productId: number;

  @Field(() => TransactionActionTypes, { nullable: true })
  transactionType?: TransactionActionTypes;

  @Field()
  rentalDateStart: Date;

  @Field()
  rentalDateEnd: Date;
}

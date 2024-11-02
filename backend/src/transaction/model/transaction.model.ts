import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { TransactionActionTypes } from '../dto/transaction.mutation.dto';
import { User } from '../../user/model/user.model';
import { Product } from '../../product/model/product.model';

// Register the enum with GraphQL
registerEnumType(TransactionActionTypes, {
  name: 'TransactionActionTypes',
});

@ObjectType()
export class Transaction {
  @Field(() => Int)
  id: number;

  @Field(() => TransactionActionTypes, { nullable: true })
  transactionType?: TransactionActionTypes;

  @Field(() => String)
  status: string;

  @Field(() => Date)
  transactionDate: Date;

  @Field(() => User)
  user: User;

  @Field(() => Product)
  product: Product;

  @Field({ nullable: true })
  rentalDateStart?: string;

  @Field({ nullable: true })
  rentalDateEnd?: string;
}



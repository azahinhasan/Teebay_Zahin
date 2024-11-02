import { ObjectType, Field, Int, Float, registerEnumType } from '@nestjs/graphql';
import { User } from '../../user/model/user.model';
import { Transaction } from '../../transaction/model/transaction.model';
import { Category } from '../../category/model/category.model';
import { CurrentStatusTypes, RentDurationTypes } from '../dto/product.mutation.dto';

// Register enums with GraphQL
registerEnumType(CurrentStatusTypes, {
  name: 'CurrentStatusTypes',
});

registerEnumType(RentDurationTypes, {
  name: 'RentDurationTypes',
});

@ObjectType()
export class Product {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  rentPrice: number;

  @Field(() => RentDurationTypes, { defaultValue: RentDurationTypes.perHour })
  rentDuration: RentDurationTypes;

  @Field(() => CurrentStatusTypes, { defaultValue: CurrentStatusTypes.available })
  status: CurrentStatusTypes;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => User)
  user: User;

  @Field(() => [Transaction])
  transactions: Transaction[];

  @Field(() => [Category])
  categories: Category[];
}

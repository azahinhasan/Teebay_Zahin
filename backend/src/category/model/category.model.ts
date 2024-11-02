import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from '../../product/model/product.model';

@ObjectType()
export class Category {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => [Product])
  products: Product[];
}

import { InputType, Field, Float, Int } from '@nestjs/graphql';

export enum CurrentStatusTypes {
  available = 'available',
  sold = 'sold',
  lent = 'lent',
  unavailable = 'unavailable',
}

export enum RentDurationTypes {
  perHour = 'perHour',
  perDay = 'perDay',
  perWeek = 'perWeek',
  perMonth = 'perMonth',
  perYear = 'perYear',
}

@InputType() 
export class CreateProductDto {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  rentPrice: number;

  @Field(() => RentDurationTypes)
  rentDuration: RentDurationTypes;

  @Field(() => CurrentStatusTypes, { nullable: true })
  status?: CurrentStatusTypes;

  @Field(() => [Int])
  categoryIds: number[];
}

@InputType() 
export class UpdateProductDto {
  @Field(() => String)
  name?: string;

  @Field(() => String)
  description?: string;

  @Field(() => Float) 
  price?: number;

  @Field(() => Float)
  rentPrice?: number;

  @Field(() => RentDurationTypes)
  rentDuration?: RentDurationTypes;

  @Field(() => CurrentStatusTypes,{ nullable: true })
  status?: CurrentStatusTypes;

  @Field(() => [Int])
  categoryIds?: number[];
}

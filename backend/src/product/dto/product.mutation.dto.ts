import { IsNotEmpty, IsNumber, IsString, IsEnum, IsOptional,IsArray,ArrayNotEmpty } from 'class-validator';
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
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Float) // Specify Float for price
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Float) // Specify Float for rentPrice
  rentPrice: number;

  @IsOptional()
  @IsEnum(RentDurationTypes)
  @Field(() => RentDurationTypes, { nullable: true })
  rentDuration?: RentDurationTypes;

  @IsOptional()
  @IsEnum(CurrentStatusTypes)
  @Field(() => CurrentStatusTypes, { nullable: true })
  status?: CurrentStatusTypes;

  @IsArray()
  @ArrayNotEmpty() 
  @Field(() => [Int]) 
  categoryIds: number[]; 

  // @IsNotEmpty()
  // @IsNumber()
  // @Field(() => Int) 
  // userId?: number;
}

@InputType() // Add '@' before InputType
export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  name?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  description?: string;

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true }) 
  price?: number;

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  rentPrice?: number;

  @IsOptional()
  @IsEnum(RentDurationTypes)
  @Field(() => RentDurationTypes, { nullable: true })
  rentDuration?: RentDurationTypes;

  @IsOptional()
  @IsEnum(CurrentStatusTypes)
  @Field(() => CurrentStatusTypes, { nullable: true })
  status?: CurrentStatusTypes;

  @IsArray()
  @ArrayNotEmpty() 
  @Field(() => [Int]) 
  categoryIds: number[]; 
}

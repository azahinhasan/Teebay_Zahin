import { InputType,ObjectType, Field, Int } from '@nestjs/graphql';
import { BaseResponse  } from '../../common/dto/base-response.dto';

@InputType()
export class FindUserByIdInput extends BaseResponse {
  @Field(() => Int)
  id: number;
}

@InputType()
export class FindUserByEmailInput extends BaseResponse {
  @Field()
  email: string;
}

@ObjectType()
export class GetUserInfo extends BaseResponse {
  @Field()
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;
  
}
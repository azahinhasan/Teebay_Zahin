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
  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  email: string;

}


@ObjectType()
export class GetAllUserInfo extends BaseResponse {
  @Field(() => [GetUserInfo], { nullable: true }) 
  list: GetUserInfo[]; 
}
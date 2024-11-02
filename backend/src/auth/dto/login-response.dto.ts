import { ObjectType, Field } from '@nestjs/graphql';
import { BaseResponse  } from '../../common/dto/base-response.dto';

@ObjectType()
export class LoginResponse extends BaseResponse  {
  @Field({ nullable: true })
  token: string;
}

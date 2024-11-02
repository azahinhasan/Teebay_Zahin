import { InputType, Field } from '@nestjs/graphql';
import { BaseResponse  } from '../../common/dto/base-response.dto';

@InputType()
export class CreateUserInput extends BaseResponse {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class UpdateUserInput extends BaseResponse {
  @Field()
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;
}

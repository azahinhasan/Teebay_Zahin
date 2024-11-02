import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class BaseResponse {
  @Field({ nullable: true })
  success?: boolean;

  @Field({ nullable: true })
  message?: string;

  @Field({ nullable: true })
  statusCode?: string;
}

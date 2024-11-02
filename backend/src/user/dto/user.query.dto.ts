import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class FindUserByIdInput {
  @Field(() => Int)
  id: number;
}

@InputType()
export class FindUserByEmailInput {
  @Field()
  email: string;
}


export class GetUserInfo {
  @Field()
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;
}
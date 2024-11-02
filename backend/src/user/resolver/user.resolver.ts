// user.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from '../service/user.service';
import { User } from '../model/user.model';
import { CreateUserInput, UpdateUserInput } from '../dto/user.mutation.dto';
import { FindUserByIdInput } from '../dto/user.query.dto';
import {GetUserInfo} from '../dto/user.query.dto';
@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async findAllUsers() {
    return this.userService.findAllUsers();
  }

  @Query(() => User)
  async findUserById(@Args('input') input: FindUserByIdInput) {
    return this.userService.findUserById(input.id);
  }

  /* ------------------------------------------mutation--------------------------------------------------------- */
  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<GetUserInfo> {
    return this.userService.createUser(input);
  }

  @Mutation(() => User)
  async updateUser(@Args('input') input: UpdateUserInput) {
    return this.userService.updateUser(input);
  }

  @Mutation(() => User)
  async deleteUser(@Args('id') id: number) {
    return this.userService.deleteUser(id);
  }
}

// user.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from '../service/user.service';
import { UseGuards,UseInterceptors } from '@nestjs/common';
import { User } from '../model/user.model';
import { CreateUserInput, UpdateUserInput } from '../dto/user.mutation.dto';
import { FindUserByIdInput,GetUserInfo,GetAllUserInfo } from '../dto/user.query.dto';
import { AuthGuard } from '../../common/guards/jwt.middleware';
import {FormatInterceptor} from '../../common/interceptor/formate-response.interceptor';

@Resolver('user')
@UseInterceptors(FormatInterceptor)
@UseGuards(AuthGuard)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => GetAllUserInfo)
  async findAllUsers() : Promise<GetAllUserInfo> {
    return this.userService.findAllUsers();
  }

  @Query(() => GetUserInfo)
  async findUserById(@Args('input') input: FindUserByIdInput) {
    return this.userService.findUserById(input.id);
  }

  /* ------------------------------------------mutation--------------------------------------------------------- */
  @Mutation(() => GetUserInfo)
  async createUser(
    @Args('input') input: CreateUserInput,
  ): Promise<GetUserInfo> {
    return this.userService.createUser(input);
  }

  @Mutation(() => GetUserInfo)
  async updateUser(@Args('input') input: UpdateUserInput): Promise<GetUserInfo> {
    return this.userService.updateUser(input);
  }

  @Mutation(() => GetUserInfo)
  async deleteUser(@Args('id') id: number): Promise<GetUserInfo> {
    return this.userService.deleteUser(id);
  }
}

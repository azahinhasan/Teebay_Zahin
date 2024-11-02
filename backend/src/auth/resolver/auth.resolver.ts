import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from '../service/auth.service';
import { LoginResponse } from '../dto/login-response.dto'; 
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/jwt.middleware';
@Resolver("auth")
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse) // Update to return LoginResponse type

  // @UseGuards(AuthGuard)
  async login(@Args('username') username: string, @Args('password') password: string): Promise<LoginResponse> {
    return this.authService.login(username, password);
  }
}

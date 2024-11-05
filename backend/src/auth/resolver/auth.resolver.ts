import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from '../service/auth.service';
import { LoginResponse } from '../dto/auth.mutation.dto'; 
import { UseGuards,UseInterceptors } from '@nestjs/common';
import {FormatInterceptor} from '../../common/interceptor/formate-response.interceptor';
@Resolver("auth")
@UseInterceptors(FormatInterceptor)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse) // Update to return LoginResponse type
  async login(@Args('email') email: string, @Args('password') password: string): Promise<LoginResponse> {
    return this.authService.login(email, password);
  }
}

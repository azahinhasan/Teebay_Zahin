import { Module } from '@nestjs/common';
import { AuthController } from './resolver/auth.resolver';
import { AuthService } from './service/auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

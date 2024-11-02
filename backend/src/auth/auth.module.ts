import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthResolver } from './resolver/auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET||'1234',
      signOptions: { expiresIn:  process.env.JWT_EXPIRES_IN || '6h' },
    }),
  ],
  providers: [AuthService, AuthResolver,JwtModule],
  exports: [AuthService,JwtModule],
})
export class AuthModule {}

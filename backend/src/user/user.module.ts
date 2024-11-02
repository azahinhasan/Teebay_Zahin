import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserResolver } from './resolver/user.resolver';
import { PrismaService } from '../prisma/service/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [UserService, UserResolver, PrismaService,JwtService],
})
export class UserModule {}

// user.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserResolver } from './resolver/user.resolver';
import { PrismaService } from '../prisma/service/prisma.service';

@Module({
  providers: [UserService, UserResolver, PrismaService],
})
export class UserModule {}

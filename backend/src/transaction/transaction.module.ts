import { Module } from '@nestjs/common';
import { TransactionService } from './service/transaction.service';
import { TransactionResolver } from './resolver/transaction.resolver';
import { PrismaService } from '../prisma/service/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [TransactionService, TransactionResolver,JwtService,PrismaService]
})
export class TransactionModule {}

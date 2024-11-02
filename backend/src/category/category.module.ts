import { Module } from '@nestjs/common';
import { CategoryResolver } from './resolver/category.resolver';
import { CategoryService } from './service/category.service';
import { PrismaService } from '../prisma/service/prisma.service';
import { JwtService } from '@nestjs/jwt';
@Module({
  providers: [CategoryResolver, CategoryService,JwtService,PrismaService]
})
export class CategoryModule {}

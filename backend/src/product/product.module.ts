import { Module } from '@nestjs/common';
import { ProductResolver } from './resolver/product.resolver';
import { ProductService } from './service/product.service';
import { PrismaService } from '../prisma/service/prisma.service';
import { JwtService } from '@nestjs/jwt';
@Module({
  providers: [ProductResolver, ProductService,JwtService,PrismaService]
})
export class ProductModule {}

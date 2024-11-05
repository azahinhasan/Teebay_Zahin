import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/service/prisma.service';
import { BuyProductDto, RentProductDto } from '../dto/transaction.mutation.dto';
import {GetTransactionInfo,GetTransactionOfSelf} from '../dto/transaction.query.dto' 

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async buyProduct(userId: number, data: BuyProductDto): Promise<GetTransactionInfo> {
    const product = await this.prisma.product.findUnique({
      where: { id: data.productId },
    });
    if (!product || product.status !== 'available') {
      throw new NotFoundException('Product not available for buying');
    }

    await this.prisma.product.update({
      where: { id: data.productId },
      data: { status: 'sold' },
    });

    return this.prisma.transaction.create({
      data: {
        userId,
        productId: data.productId,
        transactionType: 'bought',
      },
      include: {
        product: true,
      },
    });
  }

  async rentProduct(userId: number, data: RentProductDto): Promise<GetTransactionInfo> {
    const product = await this.prisma.product.findUnique({
      where: { id: data.productId },
    });
    if (!product || product.status !== 'available') {
      throw new NotFoundException('Product not available for renting');
    }

    await this.prisma.product.update({
      where: { id: data.productId },
      data: { status: 'lent' },
    });

    return this.prisma.transaction.create({
      data: {
        userId,
        productId: data.productId,
        transactionType: 'borrowed',
        rentalDateStart: data.rentalDateStart,
        rentalDateEnd: data.rentalDateEnd
      },
      include: {
        product: true,
      },
    });
  }

  async getUserTransactions(userId: number): Promise<GetTransactionOfSelf> {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        OR: [
          { userId:userId },
          {
            product: {
              userId:userId,
            },
          },
        ],
      },
      include: {
        product: {
          include: {
            categories: true,
          },
        },
      },
    });
    let temp = {
      borrowed: transactions
        ?.filter(
          (data) =>
            data.transactionType === "borrowed" &&
            userId === data.userId
        ),
      sold: transactions
        ?.filter(
          (data) =>
            data.product.status === "sold" &&
            userId === data.product.userId
        ),
      lent: transactions
        ?.filter(
          (data) =>
            data.product.status === "lent" &&
            userId === data.product.userId
        ),
      bought: transactions
        ?.filter(
          (data) =>
            data.transactionType === "bought" &&
            userId === data.userId
        ),
    };
    return temp;
  }


}

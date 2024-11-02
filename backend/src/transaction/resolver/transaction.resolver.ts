import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { TransactionService } from '../service/transaction.service';
import { Transaction } from '../model/transaction.model';
import { BuyProductDto, RentProductDto } from '../dto/transaction.mutation.dto';
import { GetTransactionInfo,GetTransactionOfSelf } from '../dto/transaction.query.dto';
import { UseGuards,UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/jwt.middleware';
import {FormatInterceptor} from '../../common/interceptor/formate-response.interceptor';

@Resolver(() => Transaction)
@UseGuards(AuthGuard)
@UseInterceptors(FormatInterceptor)
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) {}

  @Query(() => GetTransactionOfSelf)
  async getUserTransactions(@Context() context: any): Promise<GetTransactionOfSelf> {
    return this.transactionService.getUserTransactions(context.req.user_id);
  }

  /* ------------------------------------------mutation--------------------------------------------------------- */
  @Mutation(() => GetTransactionInfo)
  async buyProduct(
    @Context() context: any,
    @Args('data') data: BuyProductDto,
  ): Promise<GetTransactionInfo> {
    return this.transactionService.buyProduct(context.req.user_id, data);
  }

  @Mutation(() => GetTransactionInfo)
  async rentProduct(
    @Context() context: any,
    @Args('data') data: RentProductDto,
  ): Promise<GetTransactionInfo> {
    return this.transactionService.rentProduct(context.req.user_id, data);
  }
}

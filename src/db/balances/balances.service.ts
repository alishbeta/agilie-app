import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Balances, Fiats, Prisma, Tokens } from '@prisma/client';

type BalancesWithTokesAndFiats = Balances & {
  token: Tokens;
  fiatRef: Fiats;
};

@Injectable()
export class BalancesService {
  constructor(private prisma: PrismaService) {}

  async balance(
    balancesWhereUniqueInput: Prisma.BalancesWhereUniqueInput,
  ): Promise<Balances | null> {
    return this.prisma.balances.findUnique({
      where: balancesWhereUniqueInput,
    });
  }

  async balances(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BalancesWhereUniqueInput;
    where?: Prisma.BalancesWhereInput;
    orderBy?: Prisma.BalancesOrderByWithRelationInput;
  }): Promise<BalancesWithTokesAndFiats[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.balances.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        token: true,
        fiatRef: true,
      },
    });
  }

  async updateBalance(params: {
    where: Prisma.BalancesWhereUniqueInput;
    data: Prisma.BalancesUpdateInput;
  }): Promise<Balances> {
    const { where, data } = params;
    return this.prisma.balances.update({
      data,
      where,
    });
  }
}

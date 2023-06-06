import { PrismaService } from '../prisma/prisma.service';
import { Balances, Fiats, Prisma, Tokens } from '@prisma/client';
type BalancesWithTokesAndFiats = Balances & {
    token: Tokens;
    fiatRef: Fiats;
};
export declare class BalancesService {
    private prisma;
    constructor(prisma: PrismaService);
    balance(balancesWhereUniqueInput: Prisma.BalancesWhereUniqueInput): Promise<Balances | null>;
    balances(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.BalancesWhereUniqueInput;
        where?: Prisma.BalancesWhereInput;
        orderBy?: Prisma.BalancesOrderByWithRelationInput;
    }): Promise<BalancesWithTokesAndFiats[]>;
    updateBalance(params: {
        where: Prisma.BalancesWhereUniqueInput;
        data: Prisma.BalancesUpdateInput;
    }): Promise<Balances>;
}
export {};

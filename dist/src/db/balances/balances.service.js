"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalancesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BalancesService = exports.BalancesService = class BalancesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async balance(balancesWhereUniqueInput) {
        return this.prisma.balances.findUnique({
            where: balancesWhereUniqueInput,
        });
    }
    async balances(params) {
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
    async updateBalance(params) {
        const { where, data } = params;
        return this.prisma.balances.update({
            data,
            where,
        });
    }
};
exports.BalancesService = BalancesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BalancesService);
//# sourceMappingURL=balances.service.js.map
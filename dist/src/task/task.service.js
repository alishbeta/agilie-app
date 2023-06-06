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
var TaskService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const balances_service_1 = require("../db/balances/balances.service");
const kraken_provider_1 = require("../kraken/kraken.provider");
let TaskService = exports.TaskService = TaskService_1 = class TaskService {
    constructor(krakenProvider, balanceService) {
        this.krakenProvider = krakenProvider;
        this.balanceService = balanceService;
        this.logger = new common_1.Logger(TaskService_1.name);
    }
    async handleCron() {
        const balances = await this.balanceService.balances({});
        for (const balance of balances) {
            const exchangerate = this.krakenProvider.getExchangeRate(`${balance.token.ticker}/${balance.fiatRef.ticker}`);
            const amountRef = balance.amount.toNumber() * exchangerate.bit;
            this.balanceService.updateBalance({
                data: { amountRef: amountRef },
                where: {
                    id: balance.id,
                },
            });
        }
    }
};
__decorate([
    (0, schedule_1.Cron)('0 0 0 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TaskService.prototype, "handleCron", null);
exports.TaskService = TaskService = TaskService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [kraken_provider_1.KrakenProvider,
        balances_service_1.BalancesService])
], TaskService);
//# sourceMappingURL=task.service.js.map
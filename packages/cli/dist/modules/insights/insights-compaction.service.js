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
exports.InsightsCompactionService = void 0;
const di_1 = require("@n8n/di");
const n8n_core_1 = require("n8n-core");
const insights_by_period_repository_1 = require("./database/repositories/insights-by-period.repository");
const insights_raw_repository_1 = require("./database/repositories/insights-raw.repository");
const insights_config_1 = require("./insights.config");
let InsightsCompactionService = class InsightsCompactionService {
    constructor(insightsByPeriodRepository, insightsRawRepository, insightsConfig, logger) {
        this.insightsByPeriodRepository = insightsByPeriodRepository;
        this.insightsRawRepository = insightsRawRepository;
        this.insightsConfig = insightsConfig;
        this.logger = logger;
        this.logger = this.logger.scoped('insights');
    }
    startCompactionTimer() {
        this.stopCompactionTimer();
        this.compactInsightsTimer = setInterval(async () => await this.compactInsights(), this.insightsConfig.compactionIntervalMinutes * 60 * 1000);
        this.logger.debug('Started compaction timer');
    }
    stopCompactionTimer() {
        if (this.compactInsightsTimer !== undefined) {
            clearInterval(this.compactInsightsTimer);
            this.compactInsightsTimer = undefined;
            this.logger.debug('Stopped compaction timer');
        }
    }
    async compactInsights() {
        let numberOfCompactedRawData;
        do {
            numberOfCompactedRawData = await this.compactRawToHour();
        } while (numberOfCompactedRawData > 0);
        let numberOfCompactedHourData;
        do {
            numberOfCompactedHourData = await this.compactHourToDay();
        } while (numberOfCompactedHourData > 0);
        let numberOfCompactedDayData;
        do {
            numberOfCompactedDayData = await this.compactDayToWeek();
        } while (numberOfCompactedDayData > 0);
    }
    async compactRawToHour() {
        const batchQuery = this.insightsRawRepository.getRawInsightsBatchQuery(this.insightsConfig.compactionBatchSize);
        return await this.insightsByPeriodRepository.compactSourceDataIntoInsightPeriod({
            sourceBatchQuery: batchQuery,
            sourceTableName: this.insightsRawRepository.metadata.tableName,
            periodUnitToCompactInto: 'hour',
        });
    }
    async compactHourToDay() {
        const batchQuery = this.insightsByPeriodRepository.getPeriodInsightsBatchQuery({
            periodUnitToCompactFrom: 'hour',
            compactionBatchSize: this.insightsConfig.compactionBatchSize,
            maxAgeInDays: this.insightsConfig.compactionHourlyToDailyThresholdDays,
        });
        return await this.insightsByPeriodRepository.compactSourceDataIntoInsightPeriod({
            sourceBatchQuery: batchQuery,
            periodUnitToCompactInto: 'day',
        });
    }
    async compactDayToWeek() {
        const batchQuery = this.insightsByPeriodRepository.getPeriodInsightsBatchQuery({
            periodUnitToCompactFrom: 'day',
            compactionBatchSize: this.insightsConfig.compactionBatchSize,
            maxAgeInDays: this.insightsConfig.compactionDailyToWeeklyThresholdDays,
        });
        return await this.insightsByPeriodRepository.compactSourceDataIntoInsightPeriod({
            sourceBatchQuery: batchQuery,
            periodUnitToCompactInto: 'week',
        });
    }
};
exports.InsightsCompactionService = InsightsCompactionService;
exports.InsightsCompactionService = InsightsCompactionService = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [insights_by_period_repository_1.InsightsByPeriodRepository,
        insights_raw_repository_1.InsightsRawRepository,
        insights_config_1.InsightsConfig,
        n8n_core_1.Logger])
], InsightsCompactionService);
//# sourceMappingURL=insights-compaction.service.js.map
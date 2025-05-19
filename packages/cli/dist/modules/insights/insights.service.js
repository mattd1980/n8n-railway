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
exports.InsightsService = void 0;
const api_types_1 = require("@n8n/api-types");
const backend_common_1 = require("@n8n/backend-common");
const decorators_1 = require("@n8n/decorators");
const di_1 = require("@n8n/di");
const n8n_core_1 = require("n8n-core");
const n8n_workflow_1 = require("n8n-workflow");
const insights_shared_1 = require("./database/entities/insights-shared");
const insights_by_period_repository_1 = require("./database/repositories/insights-by-period.repository");
const insights_collection_service_1 = require("./insights-collection.service");
const insights_compaction_service_1 = require("./insights-compaction.service");
const insights_pruning_service_1 = require("./insights-pruning.service");
const keyRangeToDays = {
    day: 1,
    week: 7,
    '2weeks': 14,
    month: 30,
    quarter: 90,
    '6months': 180,
    year: 365,
};
let InsightsService = class InsightsService {
    constructor(insightsByPeriodRepository, compactionService, collectionService, pruningService, licenseState, logger) {
        this.insightsByPeriodRepository = insightsByPeriodRepository;
        this.compactionService = compactionService;
        this.collectionService = collectionService;
        this.pruningService = pruningService;
        this.licenseState = licenseState;
        this.logger = logger;
        this.logger = this.logger.scoped('insights');
    }
    startTimers() {
        this.compactionService.startCompactionTimer();
        this.collectionService.startFlushingTimer();
        if (this.pruningService.isPruningEnabled) {
            this.pruningService.startPruningTimer();
        }
        this.logger.debug('Started compaction, flushing and pruning schedulers');
    }
    stopTimers() {
        this.compactionService.stopCompactionTimer();
        this.collectionService.stopFlushingTimer();
        this.pruningService.stopPruningTimer();
        this.logger.debug('Stopped compaction, flushing and pruning schedulers');
    }
    async shutdown() {
        await this.collectionService.shutdown();
        this.stopTimers();
    }
    async getInsightsSummary({ periodLengthInDays, }) {
        const rows = await this.insightsByPeriodRepository.getPreviousAndCurrentPeriodTypeAggregates({
            periodLengthInDays,
        });
        const data = {
            current: { byType: {} },
            previous: { byType: {} },
        };
        rows.forEach((row) => {
            const { period, type, total_value } = row;
            if (!data[period])
                return;
            data[period].byType[insights_shared_1.NumberToType[type]] = total_value ? Number(total_value) : 0;
        });
        const getValueByType = (period, type) => data[period]?.byType[type] ?? 0;
        const currentSuccesses = getValueByType('current', 'success');
        const currentFailures = getValueByType('current', 'failure');
        const previousSuccesses = getValueByType('previous', 'success');
        const previousFailures = getValueByType('previous', 'failure');
        const currentTotal = currentSuccesses + currentFailures;
        const previousTotal = previousSuccesses + previousFailures;
        const currentFailureRate = currentTotal > 0 ? Math.round((currentFailures / currentTotal) * 1000) / 1000 : 0;
        const previousFailureRate = previousTotal > 0 ? Math.round((previousFailures / previousTotal) * 1000) / 1000 : 0;
        const currentTotalRuntime = getValueByType('current', 'runtime_ms') ?? 0;
        const previousTotalRuntime = getValueByType('previous', 'runtime_ms') ?? 0;
        const currentAvgRuntime = currentTotal > 0 ? Math.round((currentTotalRuntime / currentTotal) * 100) / 100 : 0;
        const previousAvgRuntime = previousTotal > 0 ? Math.round((previousTotalRuntime / previousTotal) * 100) / 100 : 0;
        const currentTimeSaved = getValueByType('current', 'time_saved_min');
        const previousTimeSaved = getValueByType('previous', 'time_saved_min');
        const getDeviation = (current, previous) => previousTotal === 0 ? null : current - previous;
        const result = {
            averageRunTime: {
                value: currentAvgRuntime,
                unit: 'millisecond',
                deviation: getDeviation(currentAvgRuntime, previousAvgRuntime),
            },
            failed: {
                value: currentFailures,
                unit: 'count',
                deviation: getDeviation(currentFailures, previousFailures),
            },
            failureRate: {
                value: currentFailureRate,
                unit: 'ratio',
                deviation: getDeviation(currentFailureRate, previousFailureRate),
            },
            timeSaved: {
                value: currentTimeSaved,
                unit: 'minute',
                deviation: getDeviation(currentTimeSaved, previousTimeSaved),
            },
            total: {
                value: currentTotal,
                unit: 'count',
                deviation: getDeviation(currentTotal, previousTotal),
            },
        };
        return result;
    }
    async getInsightsByWorkflow({ maxAgeInDays, skip = 0, take = 10, sortBy = 'total:desc', }) {
        const { count, rows } = await this.insightsByPeriodRepository.getInsightsByWorkflow({
            maxAgeInDays,
            skip,
            take,
            sortBy,
        });
        return {
            count,
            data: rows,
        };
    }
    async getInsightsByTime({ maxAgeInDays, periodUnit, }) {
        const rows = await this.insightsByPeriodRepository.getInsightsByTime({
            maxAgeInDays,
            periodUnit,
        });
        return rows.map((r) => {
            const total = r.succeeded + r.failed;
            return {
                date: r.periodStart,
                values: {
                    total,
                    succeeded: r.succeeded,
                    failed: r.failed,
                    failureRate: r.failed / total,
                    averageRunTime: r.runTime / total,
                    timeSaved: r.timeSaved,
                },
            };
        });
    }
    getAvailableDateRanges() {
        const maxHistoryInDays = this.licenseState.getInsightsMaxHistory() === -1
            ? Number.MAX_SAFE_INTEGER
            : this.licenseState.getInsightsMaxHistory();
        const isHourlyDateLicensed = this.licenseState.isInsightsHourlyDataLicensed();
        return api_types_1.INSIGHTS_DATE_RANGE_KEYS.map((key) => ({
            key,
            licensed: key === 'day' ? (isHourlyDateLicensed ?? false) : maxHistoryInDays >= keyRangeToDays[key],
            granularity: key === 'day' ? 'hour' : keyRangeToDays[key] <= 30 ? 'day' : 'week',
        }));
    }
    getMaxAgeInDaysAndGranularity(dateRangeKey) {
        const availableDateRanges = this.getAvailableDateRanges();
        const dateRange = availableDateRanges.find((range) => range.key === dateRangeKey);
        if (!dateRange) {
            throw new n8n_workflow_1.UserError('The selected date range is not available');
        }
        if (!dateRange.licensed) {
            throw new n8n_workflow_1.UserError('The selected date range exceeds the maximum history allowed by your license.');
        }
        return { ...dateRange, maxAgeInDays: keyRangeToDays[dateRangeKey] };
    }
};
exports.InsightsService = InsightsService;
__decorate([
    (0, decorators_1.OnShutdown)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InsightsService.prototype, "shutdown", null);
exports.InsightsService = InsightsService = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [insights_by_period_repository_1.InsightsByPeriodRepository,
        insights_compaction_service_1.InsightsCompactionService,
        insights_collection_service_1.InsightsCollectionService,
        insights_pruning_service_1.InsightsPruningService,
        backend_common_1.LicenseState,
        n8n_core_1.Logger])
], InsightsService);
//# sourceMappingURL=insights.service.js.map
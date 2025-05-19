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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcurrencyControlService = exports.CLOUD_TEMP_REPORTABLE_THRESHOLDS = exports.CLOUD_TEMP_PRODUCTION_LIMIT = void 0;
const db_1 = require("@n8n/db");
const di_1 = require("@n8n/di");
const lodash_1 = require("lodash");
const n8n_core_1 = require("n8n-core");
const config_1 = __importDefault(require("../config"));
const invalid_concurrency_limit_error_1 = require("../errors/invalid-concurrency-limit.error");
const unknown_execution_mode_error_1 = require("../errors/unknown-execution-mode.error");
const event_service_1 = require("../events/event.service");
const telemetry_1 = require("../telemetry");
const concurrency_queue_1 = require("./concurrency-queue");
exports.CLOUD_TEMP_PRODUCTION_LIMIT = 999;
exports.CLOUD_TEMP_REPORTABLE_THRESHOLDS = [5, 10, 20, 50, 100, 200];
let ConcurrencyControlService = class ConcurrencyControlService {
    constructor(logger, executionRepository, telemetry, eventService) {
        this.logger = logger;
        this.executionRepository = executionRepository;
        this.telemetry = telemetry;
        this.eventService = eventService;
        this.limitsToReport = exports.CLOUD_TEMP_REPORTABLE_THRESHOLDS.map((t) => exports.CLOUD_TEMP_PRODUCTION_LIMIT - t);
        this.logger = this.logger.scoped('concurrency');
        this.limits = new Map([
            ['production', config_1.default.getEnv('executions.concurrency.productionLimit')],
            ['evaluation', config_1.default.getEnv('executions.concurrency.evaluationLimit')],
        ]);
        this.limits.forEach((limit, type) => {
            if (limit === 0) {
                throw new invalid_concurrency_limit_error_1.InvalidConcurrencyLimitError(limit);
            }
            if (limit < -1) {
                this.limits.set(type, -1);
            }
        });
        if (Array.from(this.limits.values()).every((limit) => limit === -1) ||
            config_1.default.getEnv('executions.mode') === 'queue') {
            this.isEnabled = false;
            return;
        }
        this.queues = new Map();
        this.limits.forEach((limit, type) => {
            if (limit > 0) {
                this.queues.set(type, new concurrency_queue_1.ConcurrencyQueue(limit));
            }
        });
        this.logInit();
        this.isEnabled = true;
        this.queues.forEach((queue, type) => {
            queue.on('concurrency-check', ({ capacity }) => {
                if (this.shouldReport(capacity)) {
                    this.telemetry.track('User hit concurrency limit', {
                        threshold: exports.CLOUD_TEMP_PRODUCTION_LIMIT - capacity,
                        concurrencyQueue: type,
                    });
                }
            });
            queue.on('execution-throttled', ({ executionId }) => {
                this.logger.debug('Execution throttled', { executionId, type });
                this.eventService.emit('execution-throttled', { executionId, type });
            });
            queue.on('execution-released', (executionId) => {
                this.logger.debug('Execution released', { executionId, type });
            });
        });
    }
    has(executionId) {
        if (!this.isEnabled)
            return false;
        for (const queue of this.queues.values()) {
            if (queue.has(executionId)) {
                return true;
            }
        }
        return false;
    }
    async throttle({ mode, executionId }) {
        if (!this.isEnabled || this.isUnlimited(mode))
            return;
        await this.getQueue(mode)?.enqueue(executionId);
    }
    release({ mode }) {
        if (!this.isEnabled || this.isUnlimited(mode))
            return;
        this.getQueue(mode)?.dequeue();
    }
    remove({ mode, executionId }) {
        if (!this.isEnabled || this.isUnlimited(mode))
            return;
        this.getQueue(mode)?.remove(executionId);
    }
    async removeAll(executionIdsToCancel) {
        if (!this.isEnabled)
            return;
        this.queues.forEach((queue) => {
            const enqueuedExecutionIds = queue.getAll();
            for (const id of enqueuedExecutionIds) {
                queue.remove(id);
            }
        });
        if (executionIdsToCancel.length === 0)
            return;
        await this.executionRepository.cancelMany(executionIdsToCancel);
        this.logger.info('Canceled enqueued executions with response promises', {
            executionIds: executionIdsToCancel,
        });
    }
    disable() {
        this.isEnabled = false;
    }
    logInit() {
        this.logger.debug('Enabled');
        this.limits.forEach((limit, type) => {
            this.logger.debug([
                `${(0, lodash_1.capitalize)(type)} execution concurrency is`,
                limit === -1 ? 'unlimited' : 'limited to ' + limit.toString(),
            ].join(' '));
        });
    }
    isUnlimited(mode) {
        return this.getQueue(mode) === undefined;
    }
    shouldReport(capacity) {
        return config_1.default.getEnv('deployment.type') === 'cloud' && this.limitsToReport.includes(capacity);
    }
    getQueue(mode) {
        if (mode === 'error' ||
            mode === 'integrated' ||
            mode === 'cli' ||
            mode === 'internal' ||
            mode === 'manual' ||
            mode === 'retry') {
            return undefined;
        }
        if (mode === 'webhook' || mode === 'trigger')
            return this.queues.get('production');
        if (mode === 'evaluation')
            return this.queues.get('evaluation');
        throw new unknown_execution_mode_error_1.UnknownExecutionModeError(mode);
    }
};
exports.ConcurrencyControlService = ConcurrencyControlService;
exports.ConcurrencyControlService = ConcurrencyControlService = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [n8n_core_1.Logger,
        db_1.ExecutionRepository,
        telemetry_1.Telemetry,
        event_service_1.EventService])
], ConcurrencyControlService);
//# sourceMappingURL=concurrency-control.service.js.map
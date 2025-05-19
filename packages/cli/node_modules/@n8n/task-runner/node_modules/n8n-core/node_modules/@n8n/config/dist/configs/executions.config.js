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
exports.ExecutionsConfig = void 0;
const decorators_1 = require("../decorators");
let PruningIntervalsConfig = class PruningIntervalsConfig {
    constructor() {
        this.hardDelete = 15;
        this.softDelete = 60;
    }
};
__decorate([
    (0, decorators_1.Env)('EXECUTIONS_DATA_PRUNE_HARD_DELETE_INTERVAL'),
    __metadata("design:type", Number)
], PruningIntervalsConfig.prototype, "hardDelete", void 0);
__decorate([
    (0, decorators_1.Env)('EXECUTIONS_DATA_PRUNE_SOFT_DELETE_INTERVAL'),
    __metadata("design:type", Number)
], PruningIntervalsConfig.prototype, "softDelete", void 0);
PruningIntervalsConfig = __decorate([
    decorators_1.Config
], PruningIntervalsConfig);
let ExecutionsConfig = class ExecutionsConfig {
    constructor() {
        this.pruneData = true;
        this.pruneDataMaxAge = 336;
        this.pruneDataMaxCount = 10_000;
        this.pruneDataHardDeleteBuffer = 1;
    }
};
exports.ExecutionsConfig = ExecutionsConfig;
__decorate([
    (0, decorators_1.Env)('EXECUTIONS_DATA_PRUNE'),
    __metadata("design:type", Boolean)
], ExecutionsConfig.prototype, "pruneData", void 0);
__decorate([
    (0, decorators_1.Env)('EXECUTIONS_DATA_MAX_AGE'),
    __metadata("design:type", Number)
], ExecutionsConfig.prototype, "pruneDataMaxAge", void 0);
__decorate([
    (0, decorators_1.Env)('EXECUTIONS_DATA_PRUNE_MAX_COUNT'),
    __metadata("design:type", Number)
], ExecutionsConfig.prototype, "pruneDataMaxCount", void 0);
__decorate([
    (0, decorators_1.Env)('EXECUTIONS_DATA_HARD_DELETE_BUFFER'),
    __metadata("design:type", Number)
], ExecutionsConfig.prototype, "pruneDataHardDeleteBuffer", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", PruningIntervalsConfig)
], ExecutionsConfig.prototype, "pruneDataIntervals", void 0);
exports.ExecutionsConfig = ExecutionsConfig = __decorate([
    decorators_1.Config
], ExecutionsConfig);
//# sourceMappingURL=executions.config.js.map
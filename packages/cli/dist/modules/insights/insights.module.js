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
exports.InsightsModule = void 0;
const decorators_1 = require("@n8n/decorators");
const n8n_core_1 = require("n8n-core");
const insights_service_1 = require("./insights.service");
require("./insights.controller");
let InsightsModule = class InsightsModule {
    constructor(logger, insightsService, instanceSettings) {
        this.logger = logger;
        this.insightsService = insightsService;
        this.instanceSettings = instanceSettings;
        this.logger = this.logger.scoped('insights');
    }
    initialize() {
        if (this.instanceSettings.isLeader) {
            this.insightsService.startTimers();
        }
    }
    startBackgroundProcess() {
        this.insightsService.startTimers();
    }
    stopBackgroundProcess() {
        this.insightsService.stopTimers();
    }
};
exports.InsightsModule = InsightsModule;
__decorate([
    (0, decorators_1.OnLeaderTakeover)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InsightsModule.prototype, "startBackgroundProcess", null);
__decorate([
    (0, decorators_1.OnLeaderStepdown)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InsightsModule.prototype, "stopBackgroundProcess", null);
exports.InsightsModule = InsightsModule = __decorate([
    (0, decorators_1.N8nModule)(),
    __metadata("design:paramtypes", [n8n_core_1.Logger,
        insights_service_1.InsightsService,
        n8n_core_1.InstanceSettings])
], InsightsModule);
//# sourceMappingURL=insights.module.js.map
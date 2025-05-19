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
exports.TaskRunnerSentry = void 0;
const di_1 = require("@n8n/di");
const n8n_core_1 = require("n8n-core");
const sentry_config_1 = require("./config/sentry-config");
let TaskRunnerSentry = class TaskRunnerSentry {
    constructor(config, errorReporter) {
        this.config = config;
        this.errorReporter = errorReporter;
        this.filterOutUserCodeErrors = (event) => {
            const error = event?.exception?.values?.[0];
            return error ? this.isUserCodeError(error) : false;
        };
    }
    async initIfEnabled() {
        const { dsn, n8nVersion, environment, deploymentName } = this.config;
        if (!dsn)
            return;
        await this.errorReporter.init({
            serverType: 'task_runner',
            dsn,
            release: `n8n@${n8nVersion}`,
            environment,
            serverName: deploymentName,
            beforeSendFilter: this.filterOutUserCodeErrors,
        });
    }
    async shutdown() {
        if (!this.config.dsn)
            return;
        await this.errorReporter.shutdown();
    }
    isUserCodeError(error) {
        const frames = error.stacktrace?.frames;
        if (!frames)
            return false;
        return frames.some((frame) => frame.filename === 'node:vm' && frame.function === 'runInContext');
    }
};
exports.TaskRunnerSentry = TaskRunnerSentry;
exports.TaskRunnerSentry = TaskRunnerSentry = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [sentry_config_1.SentryConfig,
        n8n_core_1.ErrorReporter])
], TaskRunnerSentry);
//# sourceMappingURL=task-runner-sentry.js.map
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
exports.LicenseMetricsRepository = exports.LicenseMetrics = void 0;
const config_1 = require("@n8n/config");
const di_1 = require("@n8n/di");
const typeorm_1 = require("@n8n/typeorm");
let LicenseMetrics = class LicenseMetrics {
};
exports.LicenseMetrics = LicenseMetrics;
exports.LicenseMetrics = LicenseMetrics = __decorate([
    (0, typeorm_1.Entity)()
], LicenseMetrics);
let LicenseMetricsRepository = class LicenseMetricsRepository extends typeorm_1.Repository {
    constructor(dataSource, globalConfig) {
        super(LicenseMetrics, dataSource.manager);
        this.globalConfig = globalConfig;
    }
    toTableName(name) {
        const { tablePrefix } = this.globalConfig.database;
        return this.manager.connection.driver.escape(`${tablePrefix}${name}`);
    }
    toColumnName(name) {
        return this.manager.connection.driver.escape(name);
    }
    async getLicenseRenewalMetrics() {
        const userTable = this.toTableName('user');
        const workflowTable = this.toTableName('workflow_entity');
        const credentialTable = this.toTableName('credentials_entity');
        const workflowStatsTable = this.toTableName('workflow_statistics');
        const [{ enabled_user_count: enabledUsers, total_user_count: totalUsers, active_workflow_count: activeWorkflows, total_workflow_count: totalWorkflows, total_credentials_count: totalCredentials, production_executions_count: productionExecutions, production_root_executions_count: productionRootExecutions, manual_executions_count: manualExecutions, },] = (await this.query(`
			SELECT
				(SELECT COUNT(*) FROM ${userTable} WHERE disabled = false) AS enabled_user_count,
				(SELECT COUNT(*) FROM ${userTable}) AS total_user_count,
				(SELECT COUNT(*) FROM ${workflowTable} WHERE active = true) AS active_workflow_count,
				(SELECT COUNT(*) FROM ${workflowTable}) AS total_workflow_count,
				(SELECT COUNT(*) FROM ${credentialTable}) AS total_credentials_count,
				(SELECT SUM(count) FROM ${workflowStatsTable} WHERE name IN ('production_success', 'production_error')) AS production_executions_count,
				(SELECT SUM(${this.toColumnName('rootCount')}) FROM ${workflowStatsTable} WHERE name IN ('production_success', 'production_error')) AS production_root_executions_count,
				(SELECT SUM(count) FROM ${workflowStatsTable} WHERE name IN ('manual_success', 'manual_error')) AS manual_executions_count;
		`));
        const toNumber = (value) => (typeof value === 'number' ? value : parseInt(value, 10)) || 0;
        return {
            enabledUsers: toNumber(enabledUsers),
            totalUsers: toNumber(totalUsers),
            activeWorkflows: toNumber(activeWorkflows),
            totalWorkflows: toNumber(totalWorkflows),
            totalCredentials: toNumber(totalCredentials),
            productionExecutions: toNumber(productionExecutions),
            productionRootExecutions: toNumber(productionRootExecutions),
            manualExecutions: toNumber(manualExecutions),
        };
    }
};
exports.LicenseMetricsRepository = LicenseMetricsRepository;
exports.LicenseMetricsRepository = LicenseMetricsRepository = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        config_1.GlobalConfig])
], LicenseMetricsRepository);
//# sourceMappingURL=license-metrics.repository.js.map
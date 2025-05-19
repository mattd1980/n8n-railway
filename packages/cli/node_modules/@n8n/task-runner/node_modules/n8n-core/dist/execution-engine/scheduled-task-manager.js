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
exports.ScheduledTaskManager = void 0;
const di_1 = require("@n8n/di");
const cron_1 = require("cron");
const instance_settings_1 = require("../instance-settings");
let ScheduledTaskManager = class ScheduledTaskManager {
    constructor(instanceSettings) {
        this.instanceSettings = instanceSettings;
        this.cronJobs = new Map();
    }
    registerCron(workflow, cronExpression, onTick) {
        const cronJob = new cron_1.CronJob(cronExpression, () => {
            if (this.instanceSettings.isLeader)
                onTick();
        }, undefined, true, workflow.timezone);
        const cronJobsForWorkflow = this.cronJobs.get(workflow.id);
        if (cronJobsForWorkflow) {
            cronJobsForWorkflow.push(cronJob);
        }
        else {
            this.cronJobs.set(workflow.id, [cronJob]);
        }
    }
    deregisterCrons(workflowId) {
        const cronJobs = this.cronJobs.get(workflowId) ?? [];
        while (cronJobs.length) {
            const cronJob = cronJobs.pop();
            if (cronJob)
                cronJob.stop();
        }
    }
    deregisterAllCrons() {
        for (const workflowId of Object.keys(this.cronJobs)) {
            this.deregisterCrons(workflowId);
        }
    }
};
exports.ScheduledTaskManager = ScheduledTaskManager;
exports.ScheduledTaskManager = ScheduledTaskManager = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [instance_settings_1.InstanceSettings])
], ScheduledTaskManager);
//# sourceMappingURL=scheduled-task-manager.js.map
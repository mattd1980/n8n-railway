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
exports.ModuleRegistry = void 0;
const decorators_1 = require("@n8n/decorators");
const di_1 = require("@n8n/di");
let ModuleRegistry = class ModuleRegistry {
    constructor(moduleMetadata, lifecycleMetadata) {
        this.moduleMetadata = moduleMetadata;
        this.lifecycleMetadata = lifecycleMetadata;
    }
    async initializeModules() {
        for (const ModuleClass of this.moduleMetadata.getModules()) {
            await di_1.Container.get(ModuleClass).initialize?.();
        }
    }
    registerLifecycleHooks(hooks) {
        const handlers = this.lifecycleMetadata.getHandlers();
        for (const { handlerClass, methodName, eventName } of handlers) {
            const instance = di_1.Container.get(handlerClass);
            switch (eventName) {
                case 'workflowExecuteAfter':
                    hooks.addHandler(eventName, async function (runData, newStaticData) {
                        const context = {
                            type: 'workflowExecuteAfter',
                            workflow: this.workflowData,
                            runData,
                            newStaticData,
                        };
                        return await instance[methodName].call(instance, context);
                    });
                    break;
                case 'nodeExecuteBefore':
                    hooks.addHandler(eventName, async function (nodeName, taskData) {
                        const context = {
                            type: 'nodeExecuteBefore',
                            workflow: this.workflowData,
                            nodeName,
                            taskData,
                        };
                        return await instance[methodName].call(instance, context);
                    });
                    break;
                case 'nodeExecuteAfter':
                    hooks.addHandler(eventName, async function (nodeName, taskData, executionData) {
                        const context = {
                            type: 'nodeExecuteAfter',
                            workflow: this.workflowData,
                            nodeName,
                            taskData,
                            executionData,
                        };
                        return await instance[methodName].call(instance, context);
                    });
                    break;
                case 'workflowExecuteBefore':
                    hooks.addHandler(eventName, async function (workflowInstance, executionData) {
                        const context = {
                            type: 'workflowExecuteBefore',
                            workflow: this.workflowData,
                            workflowInstance,
                            executionData,
                        };
                        return await instance[methodName].call(instance, context);
                    });
                    break;
            }
        }
    }
};
exports.ModuleRegistry = ModuleRegistry;
exports.ModuleRegistry = ModuleRegistry = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [decorators_1.ModuleMetadata,
        decorators_1.LifecycleMetadata])
], ModuleRegistry);
//# sourceMappingURL=module-registry.js.map
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
exports.PubSubHandler = void 0;
const db_1 = require("@n8n/db");
const di_1 = require("@n8n/di");
const n8n_core_1 = require("n8n-core");
const n8n_workflow_1 = require("n8n-workflow");
const active_workflow_manager_1 = require("../../active-workflow-manager");
const message_event_bus_1 = require("../../eventbus/message-event-bus/message-event-bus");
const event_service_1 = require("../../events/event.service");
const external_secrets_manager_ee_1 = require("../../external-secrets.ee/external-secrets-manager.ee");
const license_1 = require("../../license");
const push_1 = require("../../push");
const publisher_service_1 = require("../../scaling/pubsub/publisher.service");
const community_packages_service_1 = require("../../services/community-packages.service");
const utils_1 = require("../../utils");
const test_webhooks_1 = require("../../webhooks/test-webhooks");
const worker_status_service_ee_1 = require("../worker-status.service.ee");
let PubSubHandler = class PubSubHandler {
    constructor(eventService, instanceSettings, license, eventbus, externalSecretsManager, communityPackagesService, publisher, workerStatusService, activeWorkflowManager, push, workflowRepository, testWebhooks) {
        this.eventService = eventService;
        this.instanceSettings = instanceSettings;
        this.license = license;
        this.eventbus = eventbus;
        this.externalSecretsManager = externalSecretsManager;
        this.communityPackagesService = communityPackagesService;
        this.publisher = publisher;
        this.workerStatusService = workerStatusService;
        this.activeWorkflowManager = activeWorkflowManager;
        this.push = push;
        this.workflowRepository = workflowRepository;
        this.testWebhooks = testWebhooks;
        this.commonHandlers = {
            'reload-license': async () => await this.license.reload(),
            'restart-event-bus': async () => await this.eventbus.restart(),
            'reload-external-secrets-providers': async () => await this.externalSecretsManager.reloadAllProviders(),
            'community-package-install': async ({ packageName, packageVersion }) => await this.communityPackagesService.installOrUpdateNpmPackage(packageName, packageVersion),
            'community-package-update': async ({ packageName, packageVersion }) => await this.communityPackagesService.installOrUpdateNpmPackage(packageName, packageVersion),
            'community-package-uninstall': async ({ packageName }) => await this.communityPackagesService.removeNpmPackage(packageName),
        };
        this.multiMainHandlers = {
            'add-webhooks-triggers-and-pollers': async ({ workflowId }) => {
                if (this.instanceSettings.isFollower)
                    return;
                try {
                    await this.activeWorkflowManager.add(workflowId, 'activate', undefined, {
                        shouldPublish: false,
                    });
                    this.push.broadcast({ type: 'workflowActivated', data: { workflowId } });
                    await this.publisher.publishCommand({
                        command: 'display-workflow-activation',
                        payload: { workflowId },
                    });
                }
                catch (e) {
                    const error = (0, n8n_workflow_1.ensureError)(e);
                    const { message } = error;
                    await this.workflowRepository.update(workflowId, { active: false });
                    this.push.broadcast({
                        type: 'workflowFailedToActivate',
                        data: { workflowId, errorMessage: message },
                    });
                    await this.publisher.publishCommand({
                        command: 'display-workflow-activation-error',
                        payload: { workflowId, errorMessage: message },
                    });
                }
            },
            'remove-triggers-and-pollers': async ({ workflowId }) => {
                if (this.instanceSettings.isFollower)
                    return;
                await this.activeWorkflowManager.removeActivationError(workflowId);
                await this.activeWorkflowManager.removeWorkflowTriggersAndPollers(workflowId);
                this.push.broadcast({ type: 'workflowDeactivated', data: { workflowId } });
                await this.publisher.publishCommand({
                    command: 'display-workflow-deactivation',
                    payload: { workflowId },
                });
            },
            'display-workflow-activation': async ({ workflowId }) => this.push.broadcast({ type: 'workflowActivated', data: { workflowId } }),
            'display-workflow-deactivation': async ({ workflowId }) => this.push.broadcast({ type: 'workflowDeactivated', data: { workflowId } }),
            'display-workflow-activation-error': async ({ workflowId, errorMessage }) => this.push.broadcast({ type: 'workflowFailedToActivate', data: { workflowId, errorMessage } }),
            'relay-execution-lifecycle-event': async ({ pushRef, ...pushMsg }) => {
                if (!this.push.hasPushRef(pushRef))
                    return;
                this.push.send(pushMsg, pushRef);
            },
            'clear-test-webhooks': async ({ webhookKey, workflowEntity, pushRef }) => {
                if (!this.push.hasPushRef(pushRef))
                    return;
                this.testWebhooks.clearTimeout(webhookKey);
                const workflow = this.testWebhooks.toWorkflow(workflowEntity);
                await this.testWebhooks.deactivateWebhooks(workflow);
            },
        };
    }
    init() {
        switch (this.instanceSettings.instanceType) {
            case 'webhook':
                this.setupHandlers(this.commonHandlers);
                break;
            case 'worker':
                this.setupHandlers({
                    ...this.commonHandlers,
                    'get-worker-status': async () => await this.publisher.publishWorkerResponse({
                        senderId: this.instanceSettings.hostId,
                        response: 'response-to-get-worker-status',
                        payload: this.workerStatusService.generateStatus(),
                    }),
                });
                break;
            case 'main':
                this.setupHandlers({
                    ...this.commonHandlers,
                    ...this.multiMainHandlers,
                    'response-to-get-worker-status': async (payload) => this.push.broadcast({
                        type: 'sendWorkerStatusMessage',
                        data: {
                            workerId: payload.senderId,
                            status: payload,
                        },
                    }),
                });
                break;
            default:
                (0, utils_1.assertNever)(this.instanceSettings.instanceType);
        }
    }
    setupHandlers(map) {
        for (const [eventName, handlerFn] of Object.entries(map)) {
            this.eventService.on(eventName, async (event) => {
                await handlerFn(event);
            });
        }
    }
};
exports.PubSubHandler = PubSubHandler;
exports.PubSubHandler = PubSubHandler = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [event_service_1.EventService,
        n8n_core_1.InstanceSettings,
        license_1.License,
        message_event_bus_1.MessageEventBus,
        external_secrets_manager_ee_1.ExternalSecretsManager,
        community_packages_service_1.CommunityPackagesService,
        publisher_service_1.Publisher,
        worker_status_service_ee_1.WorkerStatusService,
        active_workflow_manager_1.ActiveWorkflowManager,
        push_1.Push,
        db_1.WorkflowRepository,
        test_webhooks_1.TestWebhooks])
], PubSubHandler);
//# sourceMappingURL=pubsub-handler.js.map
import { WorkflowRepository } from '@n8n/db';
import { InstanceSettings } from 'n8n-core';
import { ActiveWorkflowManager } from '../../active-workflow-manager';
import { MessageEventBus } from '../../eventbus/message-event-bus/message-event-bus';
import { EventService } from '../../events/event.service';
import { ExternalSecretsManager } from '../../external-secrets.ee/external-secrets-manager.ee';
import { License } from '../../license';
import { Push } from '../../push';
import { Publisher } from '../../scaling/pubsub/publisher.service';
import { CommunityPackagesService } from '../../services/community-packages.service';
import { TestWebhooks } from '../../webhooks/test-webhooks';
import { WorkerStatusService } from '../worker-status.service.ee';
export declare class PubSubHandler {
    private readonly eventService;
    private readonly instanceSettings;
    private readonly license;
    private readonly eventbus;
    private readonly externalSecretsManager;
    private readonly communityPackagesService;
    private readonly publisher;
    private readonly workerStatusService;
    private readonly activeWorkflowManager;
    private readonly push;
    private readonly workflowRepository;
    private readonly testWebhooks;
    constructor(eventService: EventService, instanceSettings: InstanceSettings, license: License, eventbus: MessageEventBus, externalSecretsManager: ExternalSecretsManager, communityPackagesService: CommunityPackagesService, publisher: Publisher, workerStatusService: WorkerStatusService, activeWorkflowManager: ActiveWorkflowManager, push: Push, workflowRepository: WorkflowRepository, testWebhooks: TestWebhooks);
    init(): void;
    private setupHandlers;
    private commonHandlers;
    private multiMainHandlers;
}

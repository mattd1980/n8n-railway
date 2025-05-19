import { WorkflowRepository } from '@n8n/db';
import { InstanceSettings } from 'n8n-core';
import { ActiveWorkflowManager } from '../active-workflow-manager';
import { MultiMainSetup } from '../scaling/multi-main-setup.ee';
export declare class DebugController {
    private readonly multiMainSetup;
    private readonly activeWorkflowManager;
    private readonly workflowRepository;
    private readonly instanceSettings;
    constructor(multiMainSetup: MultiMainSetup, activeWorkflowManager: ActiveWorkflowManager, workflowRepository: WorkflowRepository, instanceSettings: InstanceSettings);
    getMultiMainSetupDetails(): Promise<{
        instanceId: string;
        leaderKey: string | null;
        isLeader: boolean;
        activeWorkflows: {
            webhooks: {
                id: string;
                name: string;
            }[];
            triggersAndPollers: import("@n8n/db").WorkflowEntity[];
        };
        activationErrors: import("../services/cache/cache.types").Hash<string>;
    }>;
}

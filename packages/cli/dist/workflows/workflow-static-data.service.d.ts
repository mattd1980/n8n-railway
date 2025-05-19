import { GlobalConfig } from '@n8n/config';
import { WorkflowRepository } from '@n8n/db';
import { ErrorReporter, Logger } from 'n8n-core';
import type { IDataObject, Workflow } from 'n8n-workflow';
export declare class WorkflowStaticDataService {
    private readonly globalConfig;
    private readonly logger;
    private readonly errorReporter;
    private readonly workflowRepository;
    constructor(globalConfig: GlobalConfig, logger: Logger, errorReporter: ErrorReporter, workflowRepository: WorkflowRepository);
    getStaticDataById(workflowId: string): Promise<IDataObject>;
    saveStaticData(workflow: Workflow): Promise<void>;
    saveStaticDataById(workflowId: string, newStaticData: IDataObject): Promise<void>;
}

import { GlobalConfig } from '@n8n/config';
import { Logger } from 'n8n-core';
import { type Workflow, type INode } from 'n8n-workflow';
import { AccessService } from '../../services/access.service';
import { OwnershipService } from '../../services/ownership.service';
import { UrlService } from '../../services/url.service';
export declare class SubworkflowPolicyChecker {
    private readonly logger;
    private readonly ownershipService;
    private readonly globalConfig;
    private readonly accessService;
    private readonly urlService;
    constructor(logger: Logger, ownershipService: OwnershipService, globalConfig: GlobalConfig, accessService: AccessService, urlService: UrlService);
    check(subworkflow: Workflow, parentWorkflowId: string, node?: INode, userId?: string): Promise<void>;
    private errorDetails;
    private findPolicy;
    private findProjects;
    private isListed;
    private readonly denialReasons;
    private logDenial;
}

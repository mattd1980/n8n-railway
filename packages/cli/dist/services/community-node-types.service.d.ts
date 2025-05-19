import type { CommunityNodeAttributes } from '@n8n/api-types';
import { GlobalConfig } from '@n8n/config';
import { Logger } from 'n8n-core';
import type { INodeTypeDescription } from 'n8n-workflow';
import { CommunityPackagesService } from './community-packages.service';
export declare class CommunityNodeTypesService {
    private readonly logger;
    private globalConfig;
    private communityPackagesService;
    private communityNodes;
    private lastUpdateTimestamp;
    constructor(logger: Logger, globalConfig: GlobalConfig, communityPackagesService: CommunityPackagesService);
    private fetchNodeTypes;
    private updateData;
    private resetData;
    private updateRequired;
    getDescriptions(): Promise<INodeTypeDescription[]>;
    getCommunityNodeAttributes(type: string): CommunityNodeAttributes | null;
    findVetted(packageName: string): (CommunityNodeAttributes & {
        nodeDescription: INodeTypeDescription;
    }) | undefined;
}

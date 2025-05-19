import type { CommunityNodeAttributes } from '@n8n/api-types';
import { Request } from 'express';
import { CommunityNodeTypesService } from '../services/community-node-types.service';
export declare class CommunityNodeTypesController {
    private readonly communityNodeTypesService;
    constructor(communityNodeTypesService: CommunityNodeTypesService);
    getCommunityNodeAttributes(req: Request): Promise<CommunityNodeAttributes | null>;
    getCommunityNodeTypes(): Promise<import("n8n-workflow").INodeTypeDescription[]>;
}

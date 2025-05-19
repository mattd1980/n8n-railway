import { GlobalConfig } from '@n8n/config';
import type { IWorkflowBase } from 'n8n-workflow';
import { LoadNodesAndCredentials } from '../../load-nodes-and-credentials';
import type { Risk, RiskReporter } from '../../security-audit/types';
import { CommunityPackagesService } from '../../services/community-packages.service';
export declare class NodesRiskReporter implements RiskReporter {
    private readonly loadNodesAndCredentials;
    private readonly communityPackagesService;
    private readonly globalConfig;
    constructor(loadNodesAndCredentials: LoadNodesAndCredentials, communityPackagesService: CommunityPackagesService, globalConfig: GlobalConfig);
    report(workflows: IWorkflowBase[]): Promise<Risk.StandardReport | null>;
    private getCommunityNodeDetails;
    private getCustomNodeDetails;
}

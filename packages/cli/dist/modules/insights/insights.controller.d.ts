import { InsightsDateFilterDto, ListInsightsWorkflowQueryDto } from '@n8n/api-types';
import type { InsightsSummary, InsightsByTime, InsightsByWorkflow } from '@n8n/api-types';
import { AuthenticatedRequest } from '../../requests';
import { InsightsService } from './insights.service';
export declare class InsightsController {
    private readonly insightsService;
    constructor(insightsService: InsightsService);
    private getMaxAgeInDaysAndGranularity;
    getInsightsSummary(_req: AuthenticatedRequest, _res: Response, payload?: InsightsDateFilterDto): Promise<InsightsSummary>;
    getInsightsByWorkflow(_req: AuthenticatedRequest, _res: Response, payload: ListInsightsWorkflowQueryDto): Promise<InsightsByWorkflow>;
    getInsightsByTime(_req: AuthenticatedRequest, _res: Response, payload: InsightsDateFilterDto): Promise<InsightsByTime[]>;
}

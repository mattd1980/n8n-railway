import { WorkflowStatisticsRepository } from '@n8n/db';
import { Response, NextFunction } from 'express';
import { Logger } from 'n8n-core';
import type { IWorkflowStatisticsDataLoaded } from '../interfaces';
import { WorkflowFinderService } from '../workflows/workflow-finder.service';
import { StatisticsRequest } from './workflow-statistics.types';
interface WorkflowStatisticsData<T> {
    productionSuccess: T;
    productionError: T;
    manualSuccess: T;
    manualError: T;
}
export declare class WorkflowStatisticsController {
    private readonly workflowFinderService;
    private readonly workflowStatisticsRepository;
    private readonly logger;
    constructor(workflowFinderService: WorkflowFinderService, workflowStatisticsRepository: WorkflowStatisticsRepository, logger: Logger);
    hasWorkflowAccess(req: StatisticsRequest.GetOne, _res: Response, next: NextFunction): Promise<void>;
    getCounts(req: StatisticsRequest.GetOne): Promise<WorkflowStatisticsData<number>>;
    getTimes(req: StatisticsRequest.GetOne): Promise<WorkflowStatisticsData<Date | null>>;
    getDataLoaded(req: StatisticsRequest.GetOne): Promise<IWorkflowStatisticsDataLoaded>;
    private getData;
}
export {};

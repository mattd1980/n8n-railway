import type { IDataObject } from 'n8n-workflow';
export interface EvaluationMetricsAddResultsInfo {
    addedMetrics: Record<string, number>;
    missingMetrics: Set<string>;
    unknownMetrics: Set<string>;
    incorrectTypeMetrics: Set<string>;
}
export declare class EvaluationMetrics {
    private readonly metricNames;
    private readonly rawMetricsByName;
    constructor(metricNames: Set<string>);
    addResults(result: IDataObject): EvaluationMetricsAddResultsInfo;
    getAggregatedMetrics(): Record<string, number>;
}

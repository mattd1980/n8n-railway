import type { IWorkflowBase } from 'n8n-workflow';
import type { RiskReporter, Risk } from '../../security-audit/types';
export declare class DatabaseRiskReporter implements RiskReporter {
    report(workflows: IWorkflowBase[]): Promise<Risk.StandardReport | null>;
    private getIssues;
}

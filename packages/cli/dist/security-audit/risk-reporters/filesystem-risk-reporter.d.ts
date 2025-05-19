import type { IWorkflowBase } from 'n8n-workflow';
import type { RiskReporter, Risk } from '../../security-audit/types';
export declare class FilesystemRiskReporter implements RiskReporter {
    report(workflows: IWorkflowBase[]): Promise<Risk.StandardReport | null>;
}

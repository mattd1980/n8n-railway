import type { User } from '@n8n/db';
import type { IWorkflowBase } from 'n8n-workflow';
import { BaseCommand } from './base-command';
import type { IExecutionResult, IResult, IWorkflowExecutionProgress } from '../types/commands.types';
export declare class ExecuteBatch extends BaseCommand {
    static description: string;
    static cancelled: boolean;
    static workflowExecutionsProgress: IWorkflowExecutionProgress[][];
    static shallow: boolean;
    static compare: string;
    static snapshot: string;
    static concurrency: number;
    static githubWorkflow: boolean;
    static debug: boolean;
    static executionTimeout: number;
    static instanceOwner: User;
    static examples: string[];
    static flags: {
        help: import("@oclif/core/lib/interfaces").BooleanFlag<void>;
        debug: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        ids: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        concurrency: import("@oclif/core/lib/interfaces").OptionFlag<number, import("@oclif/core/lib/interfaces").CustomOptions>;
        output: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        snapshot: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        compare: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        shallow: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        githubWorkflow: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        skipList: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        retries: import("@oclif/core/lib/interfaces").OptionFlag<number, import("@oclif/core/lib/interfaces").CustomOptions>;
        shortOutput: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
    };
    static aliases: string[];
    needsCommunityPackages: boolean;
    needsTaskRunner: boolean;
    stopProcess(skipExit?: boolean | number): Promise<void>;
    private formatJsonOutput;
    private shouldBeConsideredAsWarning;
    init(): Promise<void>;
    run(): Promise<void>;
    mergeResults(results: IResult, retryResults: IResult): void;
    private runTests;
    setOutput(key: string, value: any): void;
    updateStatus(): void;
    initializeLogs(): void;
    startThread(workflowData: IWorkflowBase): Promise<IExecutionResult>;
}

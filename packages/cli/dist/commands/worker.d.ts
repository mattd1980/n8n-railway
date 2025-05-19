import { type Config } from '@oclif/core';
import type { ScalingService } from '../scaling/scaling.service';
import { BaseCommand } from './base-command';
export declare class Worker extends BaseCommand {
    static description: string;
    static examples: string[];
    static flags: {
        help: import("@oclif/core/lib/interfaces").BooleanFlag<void>;
        concurrency: import("@oclif/core/lib/interfaces").OptionFlag<number, import("@oclif/core/lib/interfaces").CustomOptions>;
    };
    concurrency: number;
    scalingService: ScalingService;
    needsCommunityPackages: boolean;
    needsTaskRunner: boolean;
    stopProcess(): Promise<void>;
    constructor(argv: string[], cmdConfig: Config);
    init(): Promise<void>;
    initEventBus(): Promise<void>;
    initOrchestration(): Promise<void>;
    setConcurrency(): Promise<void>;
    initScalingService(): Promise<void>;
    run(): Promise<void>;
    catch(error: Error): Promise<void>;
}

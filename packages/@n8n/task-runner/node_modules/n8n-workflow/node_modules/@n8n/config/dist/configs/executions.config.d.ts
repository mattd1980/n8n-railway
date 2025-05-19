declare class PruningIntervalsConfig {
    hardDelete: number;
    softDelete: number;
}
export declare class ExecutionsConfig {
    pruneData: boolean;
    pruneDataMaxAge: number;
    pruneDataMaxCount: number;
    pruneDataHardDeleteBuffer: number;
    pruneDataIntervals: PruningIntervalsConfig;
}
export {};

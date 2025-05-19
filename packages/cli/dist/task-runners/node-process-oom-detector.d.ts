import type { ChildProcess } from 'node:child_process';
export declare class NodeProcessOomDetector {
    get didProcessOom(): boolean;
    private _didProcessOom;
    constructor(processToMonitor: ChildProcess);
    private monitorProcess;
    private onStderr;
}

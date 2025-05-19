export declare class SourceControlGetStatus {
    direction: 'push' | 'pull';
    preferLocalVersion: boolean;
    verbose: boolean;
    constructor(values: {
        direction: 'push' | 'pull';
        preferLocalVersion: string | boolean;
        verbose: string | boolean;
    });
}

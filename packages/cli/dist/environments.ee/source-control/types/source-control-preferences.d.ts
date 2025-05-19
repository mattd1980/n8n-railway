import { KeyPairType } from './key-pair-type';
export declare class SourceControlPreferences {
    constructor(preferences?: Partial<SourceControlPreferences> | undefined);
    connected: boolean;
    repositoryUrl: string;
    branchName: string;
    branchReadOnly: boolean;
    branchColor: string;
    readonly publicKey?: string;
    readonly initRepo?: boolean;
    readonly keyGeneratorType?: KeyPairType;
    static fromJSON(json: Partial<SourceControlPreferences>): SourceControlPreferences;
    static merge(preferences: Partial<SourceControlPreferences>, defaultPreferences: Partial<SourceControlPreferences>): SourceControlPreferences;
}

import type { User } from '@n8n/db';
import { Logger } from 'n8n-core';
import type { CommitResult, DiffResult, FetchResult, PullResult, PushResult, SimpleGit, StatusResult } from 'simple-git';
import { OwnershipService } from '../../services/ownership.service';
import { SourceControlPreferencesService } from './source-control-preferences.service.ee';
import type { SourceControlPreferences } from './types/source-control-preferences';
export declare class SourceControlGitService {
    private readonly logger;
    private readonly ownershipService;
    private readonly sourceControlPreferencesService;
    git: SimpleGit | null;
    private gitOptions;
    constructor(logger: Logger, ownershipService: OwnershipService, sourceControlPreferencesService: SourceControlPreferencesService);
    private preInitCheck;
    initService(options: {
        sourceControlPreferences: SourceControlPreferences;
        gitFolder: string;
        sshFolder: string;
        sshKeyName: string;
    }): Promise<void>;
    setGitSshCommand(gitFolder?: string, sshFolder?: string): Promise<void>;
    resetService(): void;
    private checkRepositorySetup;
    private hasRemote;
    initRepository(sourceControlPreferences: Pick<SourceControlPreferences, 'repositoryUrl' | 'branchName' | 'initRepo'>, user: User): Promise<void>;
    private trackRemoteIfReady;
    setGitUserDetails(name: string, email: string): Promise<void>;
    getBranches(): Promise<{
        branches: string[];
        currentBranch: string;
    }>;
    setBranch(branch: string): Promise<{
        branches: string[];
        currentBranch: string;
    }>;
    getCurrentBranch(): Promise<{
        current: string;
        remote: string;
    }>;
    diffRemote(): Promise<DiffResult | undefined>;
    diffLocal(): Promise<DiffResult | undefined>;
    fetch(): Promise<FetchResult>;
    pull(options?: {
        ffOnly: boolean;
    }): Promise<PullResult>;
    push(options?: {
        force: boolean;
        branch: string;
    }): Promise<PushResult>;
    stage(files: Set<string>, deletedFiles?: Set<string>): Promise<string>;
    resetBranch(options?: {
        hard: boolean;
        target: string;
    }): Promise<string>;
    commit(message: string): Promise<CommitResult>;
    status(): Promise<StatusResult>;
}

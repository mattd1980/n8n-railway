import { CredentialSharingRole } from '@n8n/permissions';
import { WithTimestamps } from './abstract-entity';
import { CredentialsEntity } from './credentials-entity';
import { Project } from './project';
export declare class SharedCredentials extends WithTimestamps {
    role: CredentialSharingRole;
    credentials: CredentialsEntity;
    credentialsId: string;
    project: Project;
    projectId: string;
}

import { CreateFolderDto, DeleteFolderDto, ListFolderQueryDto, TransferFolderBodyDto, UpdateFolderDto } from '@n8n/api-types';
import { Response } from 'express';
import { AuthenticatedRequest } from '../requests';
import { FolderService } from '../services/folder.service';
import { EnterpriseWorkflowService } from '../workflows/workflow.service.ee';
export declare class ProjectController {
    private readonly folderService;
    private readonly enterpriseWorkflowService;
    constructor(folderService: FolderService, enterpriseWorkflowService: EnterpriseWorkflowService);
    createFolder(req: AuthenticatedRequest<{
        projectId: string;
    }>, _res: Response, payload: CreateFolderDto): Promise<{
        name: string;
        parentFolderId: string | null;
        parentFolder: import("@n8n/db").Folder | null;
        subFolders: import("@n8n/db").Folder[];
        workflows: import("@n8n/db").WorkflowEntity[];
        tags: import("@n8n/db").TagEntity[];
        id: string;
        generateId(): void;
        createdAt: Date;
        updatedAt: Date;
        setUpdateDate(): void;
    }>;
    getFolderTree(req: AuthenticatedRequest<{
        projectId: string;
        folderId: string;
    }>, _res: Response): Promise<import("../services/folder.service").SimpleFolderNode[]>;
    updateFolder(req: AuthenticatedRequest<{
        projectId: string;
        folderId: string;
    }>, _res: Response, payload: UpdateFolderDto): Promise<void>;
    deleteFolder(req: AuthenticatedRequest<{
        projectId: string;
        folderId: string;
    }>, _res: Response, payload: DeleteFolderDto): Promise<void>;
    listFolders(req: AuthenticatedRequest<{
        projectId: string;
    }>, res: Response, payload: ListFolderQueryDto): Promise<void>;
    getFolderContent(req: AuthenticatedRequest<{
        projectId: string;
        folderId: string;
    }>): Promise<{
        totalSubFolders: number;
        totalWorkflows: number;
    }>;
    transferFolderToProject(req: AuthenticatedRequest, _res: unknown, sourceFolderId: string, sourceProjectId: string, body: TransferFolderBodyDto): Promise<void>;
}

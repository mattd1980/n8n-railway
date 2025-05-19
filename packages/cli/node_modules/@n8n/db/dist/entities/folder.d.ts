import { WithTimestampsAndStringId } from './abstract-entity';
import { Project } from './project';
import { TagEntity } from './tag-entity';
import type { WorkflowEntity } from './workflow-entity';
export declare class Folder extends WithTimestampsAndStringId {
    name: string;
    parentFolderId: string | null;
    parentFolder: Folder | null;
    subFolders: Folder[];
    homeProject: Project;
    workflows: WorkflowEntity[];
    tags: TagEntity[];
}

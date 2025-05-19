import type { Folder } from './folder';
import type { TagEntity } from './tag-entity';
export declare class FolderTagMapping {
    folderId: string;
    folders: Folder[];
    tagId: string;
    tags: TagEntity[];
}

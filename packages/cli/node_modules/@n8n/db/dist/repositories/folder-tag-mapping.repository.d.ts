import { DataSource, Repository } from '@n8n/typeorm';
import { FolderTagMapping } from '../entities/folder-tag-mapping';
export declare class FolderTagMappingRepository extends Repository<FolderTagMapping> {
    constructor(dataSource: DataSource);
    overwriteTags(folderId: string, tagIds: string[]): Promise<import("@n8n/typeorm").InsertResult>;
}

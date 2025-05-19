import type { EntityManager } from '@n8n/typeorm';
import { DataSource, Repository } from '@n8n/typeorm';
import { TagEntity } from '../entities';
import type { IWorkflowDb } from '../entities/types-db';
export declare class TagRepository extends Repository<TagEntity> {
    constructor(dataSource: DataSource);
    findMany(tagIds: string[]): Promise<TagEntity[]>;
    setTags(tx: EntityManager, dbTags: TagEntity[], workflow: IWorkflowDb): Promise<void>;
    getWorkflowIdsViaTags(tags: string[]): Promise<string[]>;
}

import { DataSource, Repository } from '@n8n/typeorm';
import { AnnotationTagMapping } from '../entities';
export declare class AnnotationTagMappingRepository extends Repository<AnnotationTagMapping> {
    constructor(dataSource: DataSource);
    overwriteTags(annotationId: number, tagIds: string[]): Promise<import("@n8n/typeorm").InsertResult>;
}

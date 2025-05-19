import { DataSource, Repository } from '@n8n/typeorm';
import { AnnotationTagEntity } from '../entities';
export declare class AnnotationTagRepository extends Repository<AnnotationTagEntity> {
    constructor(dataSource: DataSource);
}

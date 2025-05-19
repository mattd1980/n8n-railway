import { DataSource, Repository } from '@n8n/typeorm';
import { ExecutionAnnotation } from '../entities';
export declare class ExecutionAnnotationRepository extends Repository<ExecutionAnnotation> {
    constructor(dataSource: DataSource);
}

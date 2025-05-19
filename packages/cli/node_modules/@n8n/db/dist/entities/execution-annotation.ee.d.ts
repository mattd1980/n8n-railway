import type { AnnotationVote } from 'n8n-workflow';
import type { AnnotationTagEntity } from './annotation-tag-entity.ee';
import type { AnnotationTagMapping } from './annotation-tag-mapping.ee';
import { ExecutionEntity } from './execution-entity';
export declare class ExecutionAnnotation {
    id: number;
    vote: AnnotationVote | null;
    note: string | null;
    executionId: string;
    execution: ExecutionEntity;
    tags?: AnnotationTagEntity[];
    tagMappings: AnnotationTagMapping[];
}

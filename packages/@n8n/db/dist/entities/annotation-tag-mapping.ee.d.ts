import type { AnnotationTagEntity } from './annotation-tag-entity.ee';
import type { ExecutionAnnotation } from './execution-annotation.ee';
export declare class AnnotationTagMapping {
    annotationId: number;
    annotations: ExecutionAnnotation[];
    tagId: string;
    tags: AnnotationTagEntity[];
}

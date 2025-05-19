import { WithTimestampsAndStringId } from './abstract-entity';
import type { AnnotationTagMapping } from './annotation-tag-mapping.ee';
import type { ExecutionAnnotation } from './execution-annotation.ee';
export declare class AnnotationTagEntity extends WithTimestampsAndStringId {
    name: string;
    annotations: ExecutionAnnotation[];
    annotationMappings: AnnotationTagMapping[];
}

import type { AnnotationTagEntity } from '@n8n/db';
import { AnnotationTagRepository } from '@n8n/db';
type IAnnotationTagDb = Pick<AnnotationTagEntity, 'id' | 'name' | 'createdAt' | 'updatedAt'>;
type IAnnotationTagWithCountDb = IAnnotationTagDb & {
    usageCount: number;
};
type GetAllResult<T> = T extends {
    withUsageCount: true;
} ? IAnnotationTagWithCountDb[] : IAnnotationTagDb[];
export declare class AnnotationTagService {
    private tagRepository;
    constructor(tagRepository: AnnotationTagRepository);
    toEntity(attrs: {
        name: string;
        id?: string;
    }): AnnotationTagEntity;
    save(tag: AnnotationTagEntity): Promise<AnnotationTagEntity>;
    delete(id: string): Promise<import("@n8n/typeorm").DeleteResult>;
    getAll<T extends {
        withUsageCount: boolean;
    }>(options?: T): Promise<GetAllResult<T>>;
}
export {};

import { AnnotationTagsRequest } from '../requests';
import { AnnotationTagService } from '../services/annotation-tag.service.ee';
export declare class AnnotationTagsController {
    private readonly annotationTagService;
    constructor(annotationTagService: AnnotationTagService);
    getAll(req: AnnotationTagsRequest.GetAll): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    createTag(req: AnnotationTagsRequest.Create): Promise<import("@n8n/db").AnnotationTagEntity>;
    updateTag(req: AnnotationTagsRequest.Update): Promise<import("@n8n/db").AnnotationTagEntity>;
    deleteTag(req: AnnotationTagsRequest.Delete): Promise<boolean>;
}

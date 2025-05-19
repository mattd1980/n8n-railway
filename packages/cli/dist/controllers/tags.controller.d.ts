import { CreateOrUpdateTagRequestDto, RetrieveTagQueryDto } from '@n8n/api-types';
import { Response } from 'express';
import { AuthenticatedRequest } from '../requests';
import { TagService } from '../services/tag.service';
export declare class TagsController {
    private readonly tagService;
    constructor(tagService: TagService);
    getAll(_req: AuthenticatedRequest, _res: Response, query: RetrieveTagQueryDto): Promise<import("@n8n/db").TagEntity[]>;
    createTag(_req: AuthenticatedRequest, _res: Response, payload: CreateOrUpdateTagRequestDto): Promise<import("@n8n/db").TagEntity>;
    updateTag(_req: AuthenticatedRequest, _res: Response, tagId: string, payload: CreateOrUpdateTagRequestDto): Promise<import("@n8n/db").TagEntity>;
    deleteTag(_req: AuthenticatedRequest, _res: Response, tagId: string): Promise<boolean>;
}

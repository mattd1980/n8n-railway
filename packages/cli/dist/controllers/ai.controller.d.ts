import { AiChatRequestDto, AiApplySuggestionRequestDto, AiAskRequestDto, AiFreeCreditsRequestDto, AiBuilderChatRequestDto } from '@n8n/api-types';
import type { AiAssistantSDK } from '@n8n_io/ai-assistant-sdk';
import { Response } from 'express';
import { CredentialsService } from '../credentials/credentials.service';
import { AuthenticatedRequest } from '../requests';
import { WorkflowBuilderService } from '../services/ai-workflow-builder.service';
import { AiService } from '../services/ai.service';
import { UserService } from '../services/user.service';
export type FlushableResponse = Response & {
    flush: () => void;
};
export declare class AiController {
    private readonly aiService;
    private readonly workflowBuilderService;
    private readonly credentialsService;
    private readonly userService;
    constructor(aiService: AiService, workflowBuilderService: WorkflowBuilderService, credentialsService: CredentialsService, userService: UserService);
    build(req: AuthenticatedRequest, res: FlushableResponse, payload: AiBuilderChatRequestDto): Promise<void>;
    chat(req: AuthenticatedRequest, res: FlushableResponse, payload: AiChatRequestDto): Promise<void>;
    applySuggestion(req: AuthenticatedRequest, _: Response, payload: AiApplySuggestionRequestDto): Promise<AiAssistantSDK.ApplySuggestionResponse>;
    askAi(req: AuthenticatedRequest, _: Response, payload: AiAskRequestDto): Promise<AiAssistantSDK.AskAiResponsePayload>;
    aiCredits(req: AuthenticatedRequest, _: Response, payload: AiFreeCreditsRequestDto): Promise<{
        scopes: import("@n8n/permissions").Scope[];
        name: string;
        data: string;
        type: string;
        isManaged: boolean;
        id: string;
        generateId(): void;
        createdAt: Date;
        updatedAt: Date;
        setUpdateDate(): void;
    }>;
}

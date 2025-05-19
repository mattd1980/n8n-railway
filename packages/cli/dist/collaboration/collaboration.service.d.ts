import type { User } from '@n8n/db';
import { UserRepository } from '@n8n/db';
import { ErrorReporter } from 'n8n-core';
import { CollaborationState } from '../collaboration/collaboration.state';
import { Push } from '../push';
import { AccessService } from '../services/access.service';
export declare class CollaborationService {
    private readonly errorReporter;
    private readonly push;
    private readonly state;
    private readonly userRepository;
    private readonly accessService;
    constructor(errorReporter: ErrorReporter, push: Push, state: CollaborationState, userRepository: UserRepository, accessService: AccessService);
    init(): void;
    handleUserMessage(userId: User['id'], msg: unknown): Promise<void>;
    private handleWorkflowOpened;
    private handleWorkflowClosed;
    private sendWorkflowUsersChangedMessage;
}

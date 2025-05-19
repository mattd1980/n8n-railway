import type { NextFunction, Response } from 'express';
import type { AuthlessRequest } from '../../../requests';
import type { TaskBrokerServerInitRequest } from '../../../task-runners/task-broker/task-broker-types';
import { TaskBrokerAuthService } from './task-broker-auth.service';
export declare class TaskBrokerAuthController {
    private readonly authService;
    constructor(authService: TaskBrokerAuthService);
    createGrantToken(req: AuthlessRequest): Promise<{
        token: string;
    }>;
    authMiddleware(req: TaskBrokerServerInitRequest, res: Response, next: NextFunction): Promise<void>;
}

import { ChangePasswordRequestDto, ForgotPasswordRequestDto, ResolvePasswordTokenQueryDto } from '@n8n/api-types';
import { UserRepository } from '@n8n/db';
import { Response } from 'express';
import { Logger } from 'n8n-core';
import { AuthService } from '../auth/auth.service';
import { EventService } from '../events/event.service';
import { ExternalHooks } from '../external-hooks';
import { License } from '../license';
import { MfaService } from '../mfa/mfa.service';
import { AuthlessRequest } from '../requests';
import { PasswordUtility } from '../services/password.utility';
import { UserService } from '../services/user.service';
import { UserManagementMailer } from '../user-management/email';
export declare class PasswordResetController {
    private readonly logger;
    private readonly externalHooks;
    private readonly mailer;
    private readonly authService;
    private readonly userService;
    private readonly mfaService;
    private readonly license;
    private readonly passwordUtility;
    private readonly userRepository;
    private readonly eventService;
    constructor(logger: Logger, externalHooks: ExternalHooks, mailer: UserManagementMailer, authService: AuthService, userService: UserService, mfaService: MfaService, license: License, passwordUtility: PasswordUtility, userRepository: UserRepository, eventService: EventService);
    forgotPassword(_req: AuthlessRequest, _res: Response, payload: ForgotPasswordRequestDto): Promise<void>;
    resolvePasswordToken(_req: AuthlessRequest, _res: Response, payload: ResolvePasswordTokenQueryDto): Promise<void>;
    changePassword(req: AuthlessRequest, res: Response, payload: ChangePasswordRequestDto): Promise<void>;
}

import { ExternalHooks } from '../external-hooks';
import { MfaService } from '../mfa/mfa.service';
import { AuthenticatedRequest, MFA } from '../requests';
export declare class MFAController {
    private mfaService;
    private externalHooks;
    constructor(mfaService: MfaService, externalHooks: ExternalHooks);
    canEnableMFA(req: AuthenticatedRequest): Promise<void>;
    getQRCode(req: AuthenticatedRequest): Promise<{
        secret: string;
        recoveryCodes: string[];
        qrCode: string;
    }>;
    activateMFA(req: MFA.Activate): Promise<void>;
    disableMFA(req: MFA.Disable): Promise<void>;
    verifyMFA(req: MFA.Verify): Promise<void>;
}

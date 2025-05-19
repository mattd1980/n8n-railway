import { SamlAcsDto, SamlPreferences, SamlToggleDto } from '@n8n/api-types';
import { Response } from 'express';
import { AuthService } from '../../../auth/auth.service';
import { EventService } from '../../../events/event.service';
import { AuthenticatedRequest, AuthlessRequest } from '../../../requests';
import { UrlService } from '../../../services/url.service';
import { SamlService } from '../saml.service.ee';
export declare class SamlController {
    private readonly authService;
    private readonly samlService;
    private readonly urlService;
    private readonly eventService;
    constructor(authService: AuthService, samlService: SamlService, urlService: UrlService, eventService: EventService);
    getServiceProviderMetadata(_: AuthlessRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    configGet(): Promise<{
        entityID: string;
        returnUrl: string;
        ignoreSSL: boolean;
        loginBinding: "post" | "redirect";
        authnRequestsSigned: boolean;
        wantAssertionsSigned: boolean;
        wantMessageSigned: boolean;
        acsBinding: "post" | "redirect";
        signatureConfig: {
            prefix: string;
            location: {
                action: "before" | "after" | "prepend" | "append";
                reference: string;
            };
        };
        relayState: string;
        loginEnabled?: boolean | undefined;
        loginLabel?: string | undefined;
        metadata?: string | undefined;
        mapping?: ({
            email: string;
            firstName: string;
            lastName: string;
            userPrincipalName: string;
        } & {}) | undefined;
        metadataUrl?: string | undefined;
    }>;
    configPost(_req: AuthenticatedRequest, _res: Response, payload: SamlPreferences): Promise<SamlPreferences | undefined>;
    toggleEnabledPost(_req: AuthenticatedRequest, res: Response, { loginEnabled }: SamlToggleDto): Promise<Response<any, Record<string, any>>>;
    acsGet(req: AuthlessRequest, res: Response): Promise<void | Response<any, Record<string, any>>>;
    acsPost(req: AuthlessRequest, res: Response, payload: SamlAcsDto): Promise<void | Response<any, Record<string, any>>>;
    private acsHandler;
    initSsoGet(req: AuthlessRequest<{}, {}, {}, {
        redirect?: string;
    }>, res: Response): Promise<string | Response<any, Record<string, any>>>;
    configTestGet(_: AuthenticatedRequest, res: Response): Promise<string | Response<any, Record<string, any>>>;
    private handleInitSSO;
}

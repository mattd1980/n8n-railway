import { CommunityRegisteredRequestDto } from '@n8n/api-types';
import { InstanceSettings } from 'n8n-core';
import { AuthenticatedRequest, LicenseRequest } from '../requests';
import { UrlService } from '../services/url.service';
import { LicenseService } from './license.service';
export declare class LicenseController {
    private readonly licenseService;
    private readonly instanceSettings;
    private readonly urlService;
    constructor(licenseService: LicenseService, instanceSettings: InstanceSettings, urlService: UrlService);
    getLicenseData(): Promise<{
        usage: {
            activeWorkflowTriggers: {
                value: number;
                limit: number;
                warningThreshold: number;
            };
        };
        license: {
            planId: string;
            planName: string;
        };
    }>;
    requestEnterpriseTrial(req: AuthenticatedRequest): Promise<void>;
    registerCommunityEdition(req: AuthenticatedRequest, _res: Response, payload: CommunityRegisteredRequestDto): Promise<{
        title: string;
        text: string;
    }>;
    activateLicense(req: LicenseRequest.Activate): Promise<{
        managementToken: string;
        usage: {
            activeWorkflowTriggers: {
                value: number;
                limit: number;
                warningThreshold: number;
            };
        };
        license: {
            planId: string;
            planName: string;
        };
    }>;
    renewLicense(): Promise<{
        managementToken: string;
        usage: {
            activeWorkflowTriggers: {
                value: number;
                limit: number;
                warningThreshold: number;
            };
        };
        license: {
            planId: string;
            planName: string;
        };
    }>;
    private getTokenAndData;
}

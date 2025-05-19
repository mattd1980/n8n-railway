import type { User } from '@n8n/db';
import { WorkflowRepository } from '@n8n/db';
import { Logger } from 'n8n-core';
import { EventService } from '../events/event.service';
import { License } from '../license';
import { UrlService } from '../services/url.service';
export declare const LicenseErrors: {
    SCHEMA_VALIDATION: string;
    RESERVATION_EXHAUSTED: string;
    RESERVATION_EXPIRED: string;
    NOT_FOUND: string;
    RESERVATION_CONFLICT: string;
    RESERVATION_DUPLICATE: string;
};
export declare class LicenseService {
    private readonly logger;
    private readonly license;
    private readonly workflowRepository;
    private readonly urlService;
    private readonly eventService;
    constructor(logger: Logger, license: License, workflowRepository: WorkflowRepository, urlService: UrlService, eventService: EventService);
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
    requestEnterpriseTrial(user: User): Promise<void>;
    registerCommunityEdition({ userId, email, instanceId, instanceUrl, licenseType, }: {
        userId: User['id'];
        email: string;
        instanceId: string;
        instanceUrl: string;
        licenseType: string;
    }): Promise<{
        title: string;
        text: string;
    }>;
    getManagementJwt(): string;
    activateLicense(activationKey: string): Promise<void>;
    renewLicense(): Promise<void>;
    private mapErrorMessage;
}

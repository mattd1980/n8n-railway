import type { BannerName } from '@n8n/api-types';
import { SettingsRepository } from '@n8n/db';
import { ErrorReporter } from 'n8n-core';
export declare class BannerService {
    private readonly settingsRepository;
    private readonly errorReporter;
    constructor(settingsRepository: SettingsRepository, errorReporter: ErrorReporter);
    dismissBanner(bannerName: BannerName): Promise<void>;
}

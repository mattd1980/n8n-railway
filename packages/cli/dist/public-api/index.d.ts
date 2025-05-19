import express from 'express';
export declare const loadPublicApiVersions: (publicApiEndpoint: string) => Promise<{
    apiRouters: express.Router[];
    apiLatestVersion: number;
}>;
export declare function isApiEnabled(): boolean;

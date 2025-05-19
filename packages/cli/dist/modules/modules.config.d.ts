import { CommaSeparatedStringArray } from '@n8n/config';
import type { InstanceSettings } from 'n8n-core';
export type ModulePreInitContext = {
    instance: InstanceSettings;
};
export type ModulePreInit = {
    shouldLoadModule: (ctx: ModulePreInitContext) => boolean;
};
declare const moduleNames: readonly ["insights"];
export type ModuleName = (typeof moduleNames)[number];
declare class Modules extends CommaSeparatedStringArray<ModuleName> {
    constructor(str: string);
}
export declare class ModulesConfig {
    enabledModules: Modules;
    disabledModules: Modules;
    private readonly defaultModules;
    readonly loadedModules: Set<"insights">;
    get modules(): ModuleName[];
    addLoadedModule(module: ModuleName): void;
}
export {};

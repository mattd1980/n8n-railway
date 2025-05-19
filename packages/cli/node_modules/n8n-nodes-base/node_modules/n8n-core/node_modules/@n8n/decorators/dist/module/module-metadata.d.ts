import type { Module } from './module';
export declare class ModuleMetadata {
    private readonly modules;
    register(module: Module): void;
    getModules(): SetIterator<Module>;
}

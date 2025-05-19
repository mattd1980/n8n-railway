import { type Constructable } from '@n8n/di';
export interface BaseN8nModule {
    initialize?(): void | Promise<void>;
}
export type Module = Constructable<BaseN8nModule>;
export declare const N8nModule: () => ClassDecorator;

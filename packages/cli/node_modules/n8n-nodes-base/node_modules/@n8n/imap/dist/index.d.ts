import { ImapSimple } from './ImapSimple';
import type { ImapSimpleOptions, MessagePart } from './types';
export declare function connect(options: ImapSimpleOptions): Promise<ImapSimple>;
export declare function getParts(struct: any, parts?: MessagePart[]): MessagePart[];
export * from './ImapSimple';
export * from './errors';
export * from './types';

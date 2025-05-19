import { EventEmitter } from 'events';
import type Imap from 'imap';
import { PartData } from './PartData';
import type { Message, MessagePart } from './types';
export declare class ImapSimple extends EventEmitter {
    private readonly imap;
    private ending;
    constructor(imap: Imap);
    end(): void;
    search(searchCriteria: any[], fetchOptions: Imap.FetchOptions): Promise<Message[]>;
    getPartData(message: Message, part: MessagePart): Promise<PartData>;
    addFlags(uid: number[], flags: string | string[]): Promise<void>;
    getBoxes(): Promise<Imap.MailBoxes>;
    openBox(boxName: string): Promise<Imap.Box>;
    closeBox(autoExpunge?: boolean): Promise<void>;
}

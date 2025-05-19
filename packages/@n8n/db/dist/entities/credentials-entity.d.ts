import { WithTimestampsAndStringId } from './abstract-entity';
import type { SharedCredentials } from './shared-credentials';
import type { ICredentialsDb } from './types-db';
export declare class CredentialsEntity extends WithTimestampsAndStringId implements ICredentialsDb {
    name: string;
    data: string;
    type: string;
    shared: SharedCredentials[];
    isManaged: boolean;
    toJSON(): Omit<this, "generateId" | "setUpdateDate" | "shared" | "toJSON">;
}

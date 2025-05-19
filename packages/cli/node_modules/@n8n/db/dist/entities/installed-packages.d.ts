import { WithTimestamps } from './abstract-entity';
import type { InstalledNodes } from './installed-nodes';
export declare class InstalledPackages extends WithTimestamps {
    packageName: string;
    installedVersion: string;
    authorName?: string;
    authorEmail?: string;
    installedNodes: InstalledNodes[];
}

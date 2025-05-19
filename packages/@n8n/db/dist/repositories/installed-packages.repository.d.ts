import { DataSource, Repository } from '@n8n/typeorm';
import type { PackageDirectoryLoader } from 'n8n-core';
import { InstalledNodesRepository } from './installed-nodes.repository';
import { InstalledPackages } from '../entities';
export declare class InstalledPackagesRepository extends Repository<InstalledPackages> {
    private installedNodesRepository;
    constructor(dataSource: DataSource, installedNodesRepository: InstalledNodesRepository);
    saveInstalledPackageWithNodes(packageLoader: PackageDirectoryLoader): Promise<InstalledPackages>;
}

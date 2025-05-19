import type { Variables } from '@n8n/db';
import { VariablesRepository } from '@n8n/db';
import { EventService } from '../../events/event.service';
import { License } from '../../license';
import { CacheService } from '../../services/cache/cache.service';
export declare class VariablesService {
    private readonly cacheService;
    private readonly variablesRepository;
    private readonly eventService;
    private readonly license;
    constructor(cacheService: CacheService, variablesRepository: VariablesRepository, eventService: EventService, license: License);
    getAllCached(state?: 'empty'): Promise<Variables[]>;
    getCount(): Promise<number>;
    getCached(id: string): Promise<Variables | null>;
    delete(id: string): Promise<void>;
    updateCache(): Promise<void>;
    findAll(): Promise<Variables[]>;
    validateVariable(variable: Omit<Variables, 'id'>): void;
    create(variable: Omit<Variables, 'id'>): Promise<Variables>;
    update(id: string, variable: Omit<Variables, 'id'>): Promise<Variables>;
    private canCreateNewVariable;
}

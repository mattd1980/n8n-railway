import { DataSource, Repository } from '@n8n/typeorm';
import { EventDestinations } from '../entities';
export declare class EventDestinationsRepository extends Repository<EventDestinations> {
    constructor(dataSource: DataSource);
}

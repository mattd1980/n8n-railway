import { DataSource, Repository } from '@n8n/typeorm';
import { WebhookEntity } from '../entities';
export declare class WebhookRepository extends Repository<WebhookEntity> {
    constructor(dataSource: DataSource);
}

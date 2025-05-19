import { License } from '../license';
import { Publisher } from '../scaling/pubsub/publisher.service';
export declare class OrchestrationController {
    private readonly licenseService;
    private readonly publisher;
    constructor(licenseService: License, publisher: Publisher);
    getWorkersStatusAll(): Promise<void>;
}

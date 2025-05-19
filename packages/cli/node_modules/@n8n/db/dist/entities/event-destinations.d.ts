import { MessageEventBusDestinationOptions } from 'n8n-workflow';
import { WithTimestamps } from './abstract-entity';
export declare class EventDestinations extends WithTimestamps {
    id: string;
    destination: MessageEventBusDestinationOptions;
}

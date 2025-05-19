import type { EventDestinations } from '@n8n/db';
import type { MessageEventBusDestination } from './message-event-bus-destination.ee';
import type { MessageEventBus } from '../message-event-bus/message-event-bus';
export declare function messageEventBusDestinationFromDb(eventBusInstance: MessageEventBus, dbData: EventDestinations): MessageEventBusDestination | null;

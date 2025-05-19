import { EventService } from '../../events/event.service';
import type { RelayEventMap } from '../../events/maps/relay.event-map';
export declare class EventRelay {
    readonly eventService: EventService;
    constructor(eventService: EventService);
    protected setupListeners<EventNames extends keyof RelayEventMap>(map: {
        [EventName in EventNames]?: (event: RelayEventMap[EventName]) => void | Promise<void>;
    }): void;
}

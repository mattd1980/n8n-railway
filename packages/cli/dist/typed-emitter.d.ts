import { EventEmitter } from 'node:events';
type Payloads<ListenerMap> = {
    [E in keyof ListenerMap]: unknown;
};
type Listener<Payload> = (payload: Payload) => void;
export declare class TypedEmitter<ListenerMap extends Payloads<ListenerMap>> extends EventEmitter {
    private debounceWait;
    on<EventName extends keyof ListenerMap & string>(eventName: EventName, listener: Listener<ListenerMap[EventName]>): this;
    once<EventName extends keyof ListenerMap & string>(eventName: EventName, listener: Listener<ListenerMap[EventName]>): this;
    off<EventName extends keyof ListenerMap & string>(eventName: EventName, listener: Listener<ListenerMap[EventName]>): this;
    emit<EventName extends keyof ListenerMap & string>(eventName: EventName, payload?: ListenerMap[EventName]): boolean;
    protected debouncedEmit: import("lodash").DebouncedFunc<(<EventName extends keyof ListenerMap & string>(eventName: EventName, payload?: ListenerMap[EventName]) => boolean)>;
}
export {};

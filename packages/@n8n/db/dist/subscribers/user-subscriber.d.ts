import type { EntitySubscriberInterface, UpdateEvent } from '@n8n/typeorm';
import { User } from '../entities';
export declare class UserSubscriber implements EntitySubscriberInterface<User> {
    private readonly eventReporter;
    listenTo(): typeof User;
    afterUpdate(event: UpdateEvent<User>): Promise<void>;
}

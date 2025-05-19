import type { PubSubCommandMap, PubSubEventMap, PubSubWorkerResponseMap } from '../../events/maps/pub-sub.event-map';
import type { Resolve } from '../../utlity.types';
import type { COMMAND_PUBSUB_CHANNEL, WORKER_RESPONSE_PUBSUB_CHANNEL } from '../constants';
export declare namespace PubSub {
    export type Channel = typeof COMMAND_PUBSUB_CHANNEL | typeof WORKER_RESPONSE_PUBSUB_CHANNEL;
    export type HandlerFn = (msg: string) => void;
    type _ToCommand<CommandKey extends keyof PubSubCommandMap> = {
        command: CommandKey;
        senderId?: string;
        targets?: string[];
        selfSend?: boolean;
        debounce?: boolean;
    } & (PubSubCommandMap[CommandKey] extends never ? {
        payload?: never;
    } : {
        payload: PubSubCommandMap[CommandKey];
    });
    type ToCommand<CommandKey extends keyof PubSubCommandMap> = Resolve<_ToCommand<CommandKey>>;
    namespace Commands {
        type ReloadLicense = ToCommand<'reload-license'>;
        type RestartEventBus = ToCommand<'restart-event-bus'>;
        type ReloadExternalSecretsProviders = ToCommand<'reload-external-secrets-providers'>;
        type CommunityPackageInstall = ToCommand<'community-package-install'>;
        type CommunityPackageUpdate = ToCommand<'community-package-update'>;
        type CommunityPackageUninstall = ToCommand<'community-package-uninstall'>;
        type GetWorkerId = ToCommand<'get-worker-id'>;
        type GetWorkerStatus = ToCommand<'get-worker-status'>;
        type AddWebhooksTriggersAndPollers = ToCommand<'add-webhooks-triggers-and-pollers'>;
        type RemoveTriggersAndPollers = ToCommand<'remove-triggers-and-pollers'>;
        type DisplayWorkflowActivation = ToCommand<'display-workflow-activation'>;
        type DisplayWorkflowDeactivation = ToCommand<'display-workflow-deactivation'>;
        type DisplayWorkflowActivationError = ToCommand<'display-workflow-activation-error'>;
        type RelayExecutionLifecycleEvent = ToCommand<'relay-execution-lifecycle-event'>;
        type ClearTestWebhooks = ToCommand<'clear-test-webhooks'>;
    }
    export type Command = Commands.ReloadLicense | Commands.RestartEventBus | Commands.ReloadExternalSecretsProviders | Commands.CommunityPackageInstall | Commands.CommunityPackageUpdate | Commands.CommunityPackageUninstall | Commands.GetWorkerId | Commands.GetWorkerStatus | Commands.AddWebhooksTriggersAndPollers | Commands.RemoveTriggersAndPollers | Commands.DisplayWorkflowActivation | Commands.DisplayWorkflowDeactivation | Commands.DisplayWorkflowActivationError | Commands.RelayExecutionLifecycleEvent | Commands.ClearTestWebhooks;
    type _ToWorkerResponse<WorkerResponseKey extends keyof PubSubWorkerResponseMap> = {
        senderId: string;
        targets?: string[];
        response: WorkerResponseKey;
        debounce?: boolean;
    } & (PubSubWorkerResponseMap[WorkerResponseKey] extends never ? {
        payload?: never;
    } : {
        payload: PubSubWorkerResponseMap[WorkerResponseKey];
    });
    type ToWorkerResponse<WorkerResponseKey extends keyof PubSubWorkerResponseMap> = Resolve<_ToWorkerResponse<WorkerResponseKey>>;
    export type WorkerResponse = ToWorkerResponse<'response-to-get-worker-status'>;
    export type CommonEvents = Pick<PubSubEventMap, 'reload-license' | 'restart-event-bus' | 'reload-external-secrets-providers' | 'community-package-install' | 'community-package-update' | 'community-package-uninstall'>;
    export type MultiMainEvents = Pick<PubSubEventMap, 'add-webhooks-triggers-and-pollers' | 'remove-triggers-and-pollers' | 'display-workflow-activation' | 'display-workflow-deactivation' | 'display-workflow-activation-error' | 'relay-execution-lifecycle-event' | 'clear-test-webhooks'>;
    export {};
}

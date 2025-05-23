import { MessageEventBus } from '../../eventbus/message-event-bus/message-event-bus';
import { EventService } from '../../events/event.service';
import { EventRelay } from '../../events/relays/event-relay';
export declare class LogStreamingEventRelay extends EventRelay {
    readonly eventService: EventService;
    private readonly eventBus;
    constructor(eventService: EventService, eventBus: MessageEventBus);
    init(): void;
    private workflowCreated;
    private workflowDeleted;
    private workflowArchived;
    private workflowUnarchived;
    private workflowSaved;
    private workflowPreExecute;
    private workflowPostExecute;
    private nodePreExecute;
    private nodePostExecute;
    private userDeleted;
    private userInvited;
    private userReinvited;
    private userUpdated;
    private userSignedUp;
    private userLoggedIn;
    private userLoginFailed;
    private userInviteEmailClick;
    private userPasswordResetEmailClick;
    private userPasswordResetRequestClick;
    private publicApiKeyCreated;
    private publicApiKeyDeleted;
    private emailFailed;
    private credentialsCreated;
    private credentialsDeleted;
    private credentialsShared;
    private credentialsUpdated;
    private communityPackageInstalled;
    private communityPackageUpdated;
    private communityPackageDeleted;
    private executionThrottled;
    private executionStartedDuringBootup;
    private aiMessagesRetrievedFromMemory;
    private aiMessageAddedToMemory;
    private aiOutputParsed;
    private aiDocumentsRetrieved;
    private aiDocumentEmbedded;
    private aiQueryEmbedded;
    private aiDocumentProcessed;
    private aiTextSplitIntoChunks;
    private aiToolCalled;
    private aiVectorStoreSearched;
    private aiLlmGeneratedOutput;
    private aiLlmErrored;
    private aiVectorStorePopulated;
    private aiVectorStoreUpdated;
}

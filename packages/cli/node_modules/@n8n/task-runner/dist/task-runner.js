"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRunner = exports.noOp = void 0;
const n8n_core_1 = require("n8n-core");
const n8n_workflow_1 = require("n8n-workflow");
const nanoid_1 = require("nanoid");
const node_events_1 = require("node:events");
const ws_1 = require("ws");
const timeout_error_1 = require("./js-task-runner/errors/timeout-error");
const node_types_1 = require("./node-types");
const task_state_1 = require("./task-state");
const task_cancelled_error_1 = require("./js-task-runner/errors/task-cancelled-error");
const OFFER_VALID_TIME_MS = 5000;
const OFFER_VALID_EXTRA_MS = 100;
const msToNs = (ms) => BigInt(ms * 1_000_000);
const noOp = () => { };
exports.noOp = noOp;
class TaskRunner extends node_events_1.EventEmitter {
    constructor(opts) {
        super();
        this.id = (0, nanoid_1.nanoid)();
        this.canSendOffers = false;
        this.runningTasks = new Map();
        this.openOffers = new Map();
        this.dataRequests = new Map();
        this.nodeTypesRequests = new Map();
        this.rpcCalls = new Map();
        this.nodeTypes = new node_types_1.TaskRunnerNodeTypes([]);
        this.receiveMessage = (message) => {
            const data = JSON.parse(message.data);
            void this.onMessage(data);
        };
        this.stopTaskOffers = () => {
            this.canSendOffers = false;
            if (this.offerInterval) {
                clearInterval(this.offerInterval);
                this.offerInterval = undefined;
            }
        };
        this.taskType = opts.taskType;
        this.name = opts.name ?? 'Node.js Task Runner SDK';
        this.maxConcurrency = opts.maxConcurrency;
        this.taskTimeout = opts.taskTimeout;
        this.idleTimeout = opts.idleTimeout;
        const { host: taskBrokerHost } = new URL(opts.taskBrokerUri);
        const wsUrl = `ws://${taskBrokerHost}/runners/_ws?id=${this.id}`;
        this.ws = new ws_1.WebSocket(wsUrl, {
            headers: {
                authorization: `Bearer ${opts.grantToken}`,
            },
            maxPayload: opts.maxPayloadSize,
        });
        this.ws.addEventListener('error', (event) => {
            const error = (0, n8n_workflow_1.ensureError)(event.error);
            if ('code' in error &&
                typeof error.code === 'string' &&
                ['ECONNREFUSED', 'ENOTFOUND'].some((code) => code === error.code)) {
                console.error(`Error: Failed to connect to n8n task broker. Please ensure n8n task broker is reachable at: ${taskBrokerHost}`);
                process.exit(1);
            }
            else {
                console.error(`Error: Failed to connect to n8n task broker at ${taskBrokerHost}`);
                console.error('Details:', event.message || 'Unknown error');
            }
        });
        this.ws.addEventListener('message', this.receiveMessage);
        this.ws.addEventListener('close', this.stopTaskOffers);
        this.resetIdleTimer();
    }
    resetIdleTimer() {
        if (this.idleTimeout === 0)
            return;
        this.clearIdleTimer();
        this.idleTimer = setTimeout(() => {
            if (this.runningTasks.size === 0)
                this.emit('runner:reached-idle-timeout');
        }, this.idleTimeout * 1000);
    }
    startTaskOffers() {
        this.canSendOffers = true;
        if (this.offerInterval) {
            clearInterval(this.offerInterval);
        }
        this.offerInterval = setInterval(() => this.sendOffers(), 250);
    }
    deleteStaleOffers() {
        this.openOffers.forEach((offer, key) => {
            if (offer.validUntil < process.hrtime.bigint()) {
                this.openOffers.delete(key);
            }
        });
    }
    sendOffers() {
        this.deleteStaleOffers();
        if (!this.canSendOffers) {
            return;
        }
        const offersToSend = this.maxConcurrency - (this.openOffers.size + this.runningTasks.size);
        for (let i = 0; i < offersToSend; i++) {
            const validForInMs = OFFER_VALID_TIME_MS + (0, n8n_workflow_1.randomInt)(500);
            const validUntil = process.hrtime.bigint() + msToNs(validForInMs + OFFER_VALID_EXTRA_MS);
            const offer = {
                offerId: (0, nanoid_1.nanoid)(),
                validUntil,
            };
            this.openOffers.set(offer.offerId, offer);
            this.send({
                type: 'runner:taskoffer',
                taskType: this.taskType,
                offerId: offer.offerId,
                validFor: validForInMs,
            });
        }
    }
    send(message) {
        this.ws.send(JSON.stringify(message));
    }
    onMessage(message) {
        switch (message.type) {
            case 'broker:inforequest':
                this.send({
                    type: 'runner:info',
                    name: this.name,
                    types: [this.taskType],
                });
                break;
            case 'broker:runnerregistered':
                this.startTaskOffers();
                break;
            case 'broker:taskofferaccept':
                this.offerAccepted(message.offerId, message.taskId);
                break;
            case 'broker:taskcancel':
                void this.taskCancelled(message.taskId, message.reason);
                break;
            case 'broker:tasksettings':
                void this.receivedSettings(message.taskId, message.settings);
                break;
            case 'broker:taskdataresponse':
                this.processDataResponse(message.requestId, message.data);
                break;
            case 'broker:rpcresponse':
                this.handleRpcResponse(message.callId, message.status, message.data);
                break;
            case 'broker:nodetypes':
                this.processNodeTypesResponse(message.requestId, message.nodeTypes);
                break;
        }
    }
    processDataResponse(requestId, data) {
        const request = this.dataRequests.get(requestId);
        if (!request) {
            return;
        }
        request.resolve(data);
    }
    processNodeTypesResponse(requestId, nodeTypes) {
        const request = this.nodeTypesRequests.get(requestId);
        if (!request)
            return;
        request.resolve(nodeTypes);
    }
    hasOpenTaskSlots() {
        return this.runningTasks.size < this.maxConcurrency;
    }
    offerAccepted(offerId, taskId) {
        if (!this.hasOpenTaskSlots()) {
            this.openOffers.delete(offerId);
            this.send({
                type: 'runner:taskrejected',
                taskId,
                reason: 'No open task slots - runner already at capacity',
            });
            return;
        }
        const offer = this.openOffers.get(offerId);
        if (!offer) {
            this.send({
                type: 'runner:taskrejected',
                taskId,
                reason: 'Offer expired - not accepted within validity window',
            });
            return;
        }
        else {
            this.openOffers.delete(offerId);
        }
        this.resetIdleTimer();
        const taskState = new task_state_1.TaskState({
            taskId,
            timeoutInS: this.taskTimeout,
            onTimeout: () => {
                void this.taskTimedOut(taskId);
            },
        });
        this.runningTasks.set(taskId, taskState);
        this.send({
            type: 'runner:taskaccepted',
            taskId,
        });
    }
    async taskCancelled(taskId, reason) {
        const taskState = this.runningTasks.get(taskId);
        if (!taskState) {
            return;
        }
        await taskState.caseOf({
            waitingForSettings: () => this.finishTask(taskState),
            'aborting:timeout': exports.noOp,
            'aborting:cancelled': exports.noOp,
            running: () => {
                taskState.status = 'aborting:cancelled';
                taskState.abortController.abort('cancelled');
                this.cancelTaskRequests(taskId, reason);
            },
        });
    }
    async taskTimedOut(taskId) {
        const taskState = this.runningTasks.get(taskId);
        if (!taskState) {
            return;
        }
        await taskState.caseOf({
            waitingForSettings: () => {
                try {
                    this.send({
                        type: 'runner:taskerror',
                        taskId,
                        error: new timeout_error_1.TimeoutError(this.taskTimeout),
                    });
                }
                finally {
                    this.finishTask(taskState);
                }
            },
            'aborting:timeout': task_state_1.TaskState.throwUnexpectedTaskStatus,
            running: () => {
                taskState.status = 'aborting:timeout';
                taskState.abortController.abort('timeout');
                this.cancelTaskRequests(taskId, 'timeout');
            },
            'aborting:cancelled': exports.noOp,
        });
    }
    async receivedSettings(taskId, settings) {
        const taskState = this.runningTasks.get(taskId);
        if (!taskState) {
            return;
        }
        await taskState.caseOf({
            'aborting:cancelled': task_state_1.TaskState.throwUnexpectedTaskStatus,
            'aborting:timeout': task_state_1.TaskState.throwUnexpectedTaskStatus,
            running: task_state_1.TaskState.throwUnexpectedTaskStatus,
            waitingForSettings: async () => {
                taskState.status = 'running';
                await this.executeTask({
                    taskId,
                    settings,
                }, taskState.abortController.signal)
                    .then(async (data) => await this.taskExecutionSucceeded(taskState, data))
                    .catch(async (error) => await this.taskExecutionFailed(taskState, error));
            },
        });
    }
    async executeTask(_taskParams, _signal) {
        throw new n8n_workflow_1.ApplicationError('Unimplemented');
    }
    async requestNodeTypes(taskId, requestParams) {
        const requestId = (0, nanoid_1.nanoid)();
        const nodeTypesPromise = new Promise((resolve, reject) => {
            this.nodeTypesRequests.set(requestId, {
                requestId,
                taskId,
                resolve: resolve,
                reject,
            });
        });
        this.send({
            type: 'runner:nodetypesrequest',
            taskId,
            requestId,
            requestParams,
        });
        try {
            return await nodeTypesPromise;
        }
        finally {
            this.nodeTypesRequests.delete(requestId);
        }
    }
    async requestData(taskId, requestParams) {
        const requestId = (0, nanoid_1.nanoid)();
        const dataRequestPromise = new Promise((resolve, reject) => {
            this.dataRequests.set(requestId, {
                requestId,
                taskId,
                resolve: resolve,
                reject,
            });
        });
        this.send({
            type: 'runner:taskdatarequest',
            taskId,
            requestId,
            requestParams,
        });
        try {
            return await dataRequestPromise;
        }
        finally {
            this.dataRequests.delete(requestId);
        }
    }
    async makeRpcCall(taskId, name, params) {
        const callId = (0, nanoid_1.nanoid)();
        const dataPromise = new Promise((resolve, reject) => {
            this.rpcCalls.set(callId, {
                callId,
                resolve,
                reject,
            });
        });
        try {
            this.send({
                type: 'runner:rpc',
                callId,
                taskId,
                name,
                params,
            });
            const returnValue = await dataPromise;
            return (0, n8n_core_1.isSerializedBuffer)(returnValue) ? (0, n8n_core_1.toBuffer)(returnValue) : returnValue;
        }
        finally {
            this.rpcCalls.delete(callId);
        }
    }
    handleRpcResponse(callId, status, data) {
        const call = this.rpcCalls.get(callId);
        if (!call) {
            return;
        }
        if (status === 'success') {
            call.resolve(data);
        }
        else {
            call.reject(typeof data === 'string' ? new Error(data) : data);
        }
    }
    async stop() {
        this.clearIdleTimer();
        this.stopTaskOffers();
        await this.waitUntilAllTasksAreDone();
        await this.closeConnection();
    }
    clearIdleTimer() {
        if (this.idleTimer)
            clearTimeout(this.idleTimer);
        this.idleTimer = undefined;
    }
    async closeConnection() {
        this.ws.close(1000, 'Shutting down');
        await new Promise((resolve) => {
            this.ws.once('close', resolve);
        });
    }
    async waitUntilAllTasksAreDone(maxWaitTimeInMs = 30_000) {
        const start = Date.now();
        while (this.runningTasks.size > 0) {
            if (Date.now() - start > maxWaitTimeInMs) {
                throw new n8n_workflow_1.ApplicationError('Timeout while waiting for tasks to finish');
            }
            await new Promise((resolve) => setTimeout(resolve, 100));
        }
    }
    async taskExecutionSucceeded(taskState, data) {
        try {
            const sendData = () => {
                this.send({
                    type: 'runner:taskdone',
                    taskId: taskState.taskId,
                    data,
                });
            };
            await taskState.caseOf({
                waitingForSettings: task_state_1.TaskState.throwUnexpectedTaskStatus,
                'aborting:cancelled': exports.noOp,
                'aborting:timeout': sendData,
                running: sendData,
            });
        }
        finally {
            this.finishTask(taskState);
        }
    }
    async taskExecutionFailed(taskState, error) {
        try {
            const sendError = () => {
                this.send({
                    type: 'runner:taskerror',
                    taskId: taskState.taskId,
                    error,
                });
            };
            await taskState.caseOf({
                waitingForSettings: task_state_1.TaskState.throwUnexpectedTaskStatus,
                'aborting:cancelled': exports.noOp,
                'aborting:timeout': () => {
                    console.warn(`Task ${taskState.taskId} timed out`);
                    sendError();
                },
                running: sendError,
            });
        }
        finally {
            this.finishTask(taskState);
        }
    }
    cancelTaskRequests(taskId, reason) {
        for (const [requestId, request] of this.dataRequests.entries()) {
            if (request.taskId === taskId) {
                request.reject(new task_cancelled_error_1.TaskCancelledError(reason));
                this.dataRequests.delete(requestId);
            }
        }
        for (const [requestId, request] of this.nodeTypesRequests.entries()) {
            if (request.taskId === taskId) {
                request.reject(new task_cancelled_error_1.TaskCancelledError(reason));
                this.nodeTypesRequests.delete(requestId);
            }
        }
    }
    finishTask(taskState) {
        taskState.cleanup();
        this.runningTasks.delete(taskState.taskId);
        this.sendOffers();
        this.resetIdleTimer();
    }
}
exports.TaskRunner = TaskRunner;
//# sourceMappingURL=task-runner.js.map
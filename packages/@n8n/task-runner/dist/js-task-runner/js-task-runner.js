"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsTaskRunner = void 0;
const lodash_1 = require("lodash");
const set_1 = __importDefault(require("lodash/set"));
const luxon_1 = require("luxon");
const n8n_core_1 = require("n8n-core");
const n8n_workflow_1 = require("n8n-workflow");
const a = __importStar(require("node:assert"));
const node_vm_1 = require("node:vm");
const unsupported_function_error_1 = require("../js-task-runner/errors/unsupported-function.error");
const runner_types_1 = require("../runner-types");
const task_runner_1 = require("../task-runner");
const built_ins_parser_1 = require("./built-ins-parser/built-ins-parser");
const built_ins_parser_state_1 = require("./built-ins-parser/built-ins-parser-state");
const error_like_1 = require("./errors/error-like");
const execution_error_1 = require("./errors/execution-error");
const serializable_error_1 = require("./errors/serializable-error");
const timeout_error_1 = require("./errors/timeout-error");
const require_resolver_1 = require("./require-resolver");
const result_validation_1 = require("./result-validation");
const data_request_response_reconstruct_1 = require("../data-request/data-request-response-reconstruct");
class JsTaskRunner extends task_runner_1.TaskRunner {
    constructor(config, name = 'JS Task Runner') {
        super({
            taskType: 'javascript',
            name,
            ...config.baseRunnerConfig,
        });
        this.builtInsParser = new built_ins_parser_1.BuiltInsParser();
        this.taskDataReconstruct = new data_request_response_reconstruct_1.DataRequestResponseReconstruct();
        const { jsRunnerConfig } = config;
        const parseModuleAllowList = (moduleList) => moduleList === '*'
            ? '*'
            : new Set(moduleList
                .split(',')
                .map((x) => x.trim())
                .filter((x) => x !== ''));
        const allowedBuiltInModules = parseModuleAllowList(jsRunnerConfig.allowedBuiltInModules ?? '');
        const allowedExternalModules = parseModuleAllowList(jsRunnerConfig.allowedExternalModules ?? '');
        this.requireResolver = (0, require_resolver_1.createRequireResolver)({
            allowedBuiltInModules,
            allowedExternalModules,
        });
        this.preventPrototypePollution(allowedExternalModules, jsRunnerConfig.allowPrototypeMutation);
    }
    preventPrototypePollution(allowedExternalModules, allowPrototypeMutation) {
        if (allowedExternalModules instanceof Set) {
            for (const module of allowedExternalModules) {
                require(module);
            }
        }
        if (!allowPrototypeMutation) {
            Object.getOwnPropertyNames(globalThis)
                .map((name) => globalThis[name])
                .filter((value) => typeof value === 'function')
                .forEach((fn) => Object.freeze(fn.prototype));
        }
        [n8n_workflow_1.Workflow, n8n_workflow_1.Expression, n8n_workflow_1.WorkflowDataProxy, luxon_1.DateTime, luxon_1.Interval, luxon_1.Duration]
            .map((constructor) => constructor.prototype)
            .forEach(Object.freeze);
    }
    async executeTask(taskParams, abortSignal) {
        const { taskId, settings } = taskParams;
        a.ok(settings, 'JS Code not sent to runner');
        this.validateTaskSettings(settings);
        const neededBuiltInsResult = this.builtInsParser.parseUsedBuiltIns(settings.code);
        const neededBuiltIns = neededBuiltInsResult.ok
            ? neededBuiltInsResult.result
            : built_ins_parser_state_1.BuiltInsParserState.newNeedsAllDataState();
        const dataResponse = await this.requestData(taskId, neededBuiltIns.toDataRequestParams(settings.chunk));
        const data = this.reconstructTaskData(dataResponse, settings.chunk);
        await this.requestNodeTypeIfNeeded(neededBuiltIns, data.workflow, taskId);
        const workflowParams = data.workflow;
        const workflow = new n8n_workflow_1.Workflow({
            ...workflowParams,
            nodeTypes: this.nodeTypes,
        });
        workflow.staticData = n8n_workflow_1.ObservableObject.create(workflow.staticData);
        const result = settings.nodeMode === 'runOnceForAllItems'
            ? await this.runForAllItems(taskId, settings, data, workflow, abortSignal)
            : await this.runForEachItem(taskId, settings, data, workflow, abortSignal);
        return {
            result,
            customData: data.runExecutionData.resultData.metadata,
            staticData: workflow.staticData.__dataChanged ? workflow.staticData : undefined,
        };
    }
    validateTaskSettings(settings) {
        a.ok(settings.code, 'No code to execute');
        if (settings.nodeMode === 'runOnceForAllItems') {
            a.ok(settings.chunk === undefined, 'Chunking is not supported for runOnceForAllItems');
        }
    }
    getNativeVariables() {
        return {
            Buffer,
            setTimeout,
            setInterval,
            setImmediate,
            clearTimeout,
            clearInterval,
            clearImmediate,
            btoa,
            atob,
            TextDecoder,
            TextDecoderStream,
            TextEncoder,
            TextEncoderStream,
            FormData,
        };
    }
    async runForAllItems(taskId, settings, data, workflow, signal) {
        const dataProxy = this.createDataProxy(data, workflow, data.itemIndex);
        const inputItems = data.connectionInputData;
        const context = this.buildContext(taskId, workflow, data.node, dataProxy, {
            items: inputItems,
        });
        try {
            const result = await new Promise((resolve, reject) => {
                const abortHandler = () => {
                    reject(new timeout_error_1.TimeoutError(this.taskTimeout));
                };
                signal.addEventListener('abort', abortHandler, { once: true });
                const preventPrototypeManipulation = 'Object.getPrototypeOf = () => ({}); Reflect.getPrototypeOf = () => ({}); Object.setPrototypeOf = () => false; Reflect.setPrototypeOf = () => false;';
                const taskResult = (0, node_vm_1.runInContext)(`globalThis.global = globalThis; ${preventPrototypeManipulation}; module.exports = async function VmCodeWrapper() {${settings.code}\n}()`, context, { timeout: this.taskTimeout * 1000 });
                void taskResult
                    .then(resolve)
                    .catch(reject)
                    .finally(() => {
                    signal.removeEventListener('abort', abortHandler);
                });
            });
            if (result === null) {
                return [];
            }
            return (0, result_validation_1.validateRunForAllItemsOutput)(result);
        }
        catch (e) {
            const error = this.toExecutionErrorIfNeeded(e);
            if (settings.continueOnFail) {
                return [{ json: { error: error.message } }];
            }
            throw error;
        }
    }
    async runForEachItem(taskId, settings, data, workflow, signal) {
        const inputItems = data.connectionInputData;
        const returnData = [];
        const chunkStartIdx = settings.chunk ? settings.chunk.startIndex : 0;
        const chunkEndIdx = settings.chunk
            ? settings.chunk.startIndex + settings.chunk.count
            : inputItems.length;
        const context = this.buildContext(taskId, workflow, data.node);
        for (let index = chunkStartIdx; index < chunkEndIdx; index++) {
            const dataProxy = this.createDataProxy(data, workflow, index);
            Object.assign(context, dataProxy, { item: inputItems[index] });
            try {
                let result = await new Promise((resolve, reject) => {
                    const abortHandler = () => {
                        reject(new timeout_error_1.TimeoutError(this.taskTimeout));
                    };
                    signal.addEventListener('abort', abortHandler);
                    const taskResult = (0, node_vm_1.runInContext)(`module.exports = async function VmCodeWrapper() {${settings.code}\n}()`, context, { timeout: this.taskTimeout * 1000 });
                    void taskResult
                        .then(resolve)
                        .catch(reject)
                        .finally(() => {
                        signal.removeEventListener('abort', abortHandler);
                    });
                });
                if (result === null) {
                    continue;
                }
                result = (0, result_validation_1.validateRunForEachItemOutput)(result, index);
                if (result) {
                    returnData.push(result.binary
                        ? {
                            json: result.json,
                            pairedItem: { item: index },
                            binary: result.binary,
                        }
                        : {
                            json: result.json,
                            pairedItem: { item: index },
                        });
                }
            }
            catch (e) {
                const error = this.toExecutionErrorIfNeeded(e);
                if (!settings.continueOnFail) {
                    throw error;
                }
                returnData.push({
                    json: { error: error.message },
                    pairedItem: {
                        item: index,
                    },
                });
            }
        }
        return returnData;
    }
    createDataProxy(data, workflow, itemIndex) {
        return new n8n_workflow_1.WorkflowDataProxy(workflow, data.runExecutionData, data.runIndex, itemIndex, data.activeNodeName, data.connectionInputData, data.siblingParameters, data.mode, (0, n8n_core_1.getAdditionalKeys)(data.additionalData, data.mode, data.runExecutionData), data.executeData, data.defaultReturnRunIndex, data.selfData, data.contextNodeName, data.envProviderState ?? {
            env: {},
            isEnvAccessBlocked: false,
            isProcessAvailable: true,
        }).getDataProxy({ throwOnMissingExecutionData: false });
    }
    toExecutionErrorIfNeeded(error) {
        if (error instanceof Error) {
            return (0, serializable_error_1.makeSerializable)(error);
        }
        if ((0, error_like_1.isErrorLike)(error)) {
            return new execution_error_1.ExecutionError(error);
        }
        return new execution_error_1.ExecutionError({ message: JSON.stringify(error) });
    }
    reconstructTaskData(response, chunk) {
        const inputData = this.taskDataReconstruct.reconstructConnectionInputItems(response.inputData, chunk);
        return {
            ...response,
            connectionInputData: inputData,
            executeData: this.taskDataReconstruct.reconstructExecuteData(response, inputData),
        };
    }
    async requestNodeTypeIfNeeded(neededBuiltIns, workflow, taskId) {
        if (neededBuiltIns.needsAllNodes) {
            const uniqueNodeTypes = new Map(workflow.nodes.map((node) => [
                `${node.type}|${node.typeVersion}`,
                { name: node.type, version: node.typeVersion },
            ]));
            const unknownNodeTypes = this.nodeTypes.onlyUnknown([...uniqueNodeTypes.values()]);
            const nodeTypes = await this.requestNodeTypes(taskId, unknownNodeTypes);
            this.nodeTypes.addNodeTypeDescriptions(nodeTypes);
        }
    }
    buildRpcCallObject(taskId) {
        const rpcObject = {};
        for (const rpcMethod of runner_types_1.EXPOSED_RPC_METHODS) {
            (0, set_1.default)(rpcObject, rpcMethod.split('.'), async (...args) => await this.makeRpcCall(taskId, rpcMethod, args));
        }
        for (const rpcMethod of runner_types_1.UNSUPPORTED_HELPER_FUNCTIONS) {
            (0, set_1.default)(rpcObject, rpcMethod.split('.'), () => {
                throw new unsupported_function_error_1.UnsupportedFunctionError(rpcMethod);
            });
        }
        return rpcObject;
    }
    buildCustomConsole(taskId) {
        return {
            ...Object.keys(console).reduce((acc, name) => {
                acc[name] = task_runner_1.noOp;
                return acc;
            }, {}),
            log: (...args) => {
                const formattedLogArgs = args.map((arg) => {
                    if ((0, lodash_1.isObject)(arg) && '__isExecutionContext' in arg)
                        return '[[ExecutionContext]]';
                    if (typeof arg === 'string')
                        return `'${arg}'`;
                    return (0, n8n_workflow_1.jsonStringify)(arg, { replaceCircularRefs: true });
                });
                void this.makeRpcCall(taskId, 'logNodeOutput', formattedLogArgs);
            },
        };
    }
    buildContext(taskId, workflow, node, dataProxy, additionalProperties = {}) {
        return (0, node_vm_1.createContext)({
            __isExecutionContext: true,
            require: this.requireResolver,
            module: {},
            console: this.buildCustomConsole(taskId),
            $getWorkflowStaticData: (type) => workflow.getStaticData(type, node),
            ...this.getNativeVariables(),
            ...dataProxy,
            ...this.buildRpcCallObject(taskId),
            ...additionalProperties,
        });
    }
}
exports.JsTaskRunner = JsTaskRunner;
//# sourceMappingURL=js-task-runner.js.map
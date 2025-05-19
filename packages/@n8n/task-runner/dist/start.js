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
Object.defineProperty(exports, "__esModule", { value: true });
require("./polyfills");
const di_1 = require("@n8n/di");
const n8n_workflow_1 = require("n8n-workflow");
const main_config_1 = require("./config/main-config");
const js_task_runner_1 = require("./js-task-runner/js-task-runner");
const task_runner_sentry_1 = require("./task-runner-sentry");
let healthCheckServer;
let runner;
let isShuttingDown = false;
let sentry;
function createSignalHandler(signal, timeoutInS = 10) {
    return async function onSignal() {
        if (isShuttingDown) {
            return;
        }
        console.log(`Received ${signal} signal, shutting down...`);
        setTimeout(() => {
            console.error('Shutdown timeout reached, forcing shutdown...');
            process.exit(1);
        }, timeoutInS * 1000).unref();
        isShuttingDown = true;
        try {
            if (runner) {
                await runner.stop();
                runner = undefined;
                void healthCheckServer?.stop();
            }
            if (sentry) {
                await sentry.shutdown();
                sentry = undefined;
            }
        }
        catch (e) {
            const error = (0, n8n_workflow_1.ensureError)(e);
            console.error('Error stopping task runner', { error });
        }
        finally {
            console.log('Task runner stopped');
            process.exit(0);
        }
    };
}
void (async function start() {
    const config = di_1.Container.get(main_config_1.MainConfig);
    (0, n8n_workflow_1.setGlobalState)({
        defaultTimezone: config.baseRunnerConfig.timezone,
    });
    sentry = di_1.Container.get(task_runner_sentry_1.TaskRunnerSentry);
    await sentry.initIfEnabled();
    runner = new js_task_runner_1.JsTaskRunner(config);
    runner.on('runner:reached-idle-timeout', () => {
        void createSignalHandler('IDLE_TIMEOUT', 1)();
    });
    const { enabled, host, port } = config.baseRunnerConfig.healthcheckServer;
    if (enabled) {
        const { HealthCheckServer } = await Promise.resolve().then(() => __importStar(require('./health-check-server')));
        healthCheckServer = new HealthCheckServer();
        await healthCheckServer.start(host, port);
    }
    process.on('SIGINT', createSignalHandler('SIGINT'));
    process.on('SIGTERM', createSignalHandler('SIGTERM'));
})().catch((e) => {
    const error = (0, n8n_workflow_1.ensureError)(e);
    console.error('Task runner failed to start', { error });
    process.exit(1);
});
//# sourceMappingURL=start.js.map
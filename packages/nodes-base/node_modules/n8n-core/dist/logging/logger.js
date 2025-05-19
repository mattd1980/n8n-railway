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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Logger_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const backend_common_1 = require("@n8n/backend-common");
const config_1 = require("@n8n/config");
const di_1 = require("@n8n/di");
const callsites_1 = __importDefault(require("callsites"));
const n8n_workflow_1 = require("n8n-workflow");
const node_path_1 = __importStar(require("node:path"));
const picocolors_1 = __importDefault(require("picocolors"));
const winston_1 = __importDefault(require("winston"));
const noOp = () => { };
let Logger = Logger_1 = class Logger {
    get isScopingEnabled() {
        return this.scopes.size > 0;
    }
    constructor(globalConfig, instanceSettingsConfig, { isRoot } = { isRoot: true }) {
        this.globalConfig = globalConfig;
        this.instanceSettingsConfig = instanceSettingsConfig;
        this.noColor = process.env.NO_COLOR !== undefined && process.env.NO_COLOR !== '';
        this.level = this.globalConfig.logging.level;
        const isSilent = this.level === 'silent';
        this.internalLogger = winston_1.default.createLogger({
            level: this.level,
            silent: isSilent,
        });
        if (!isSilent) {
            this.setLevel();
            const { outputs, scopes } = this.globalConfig.logging;
            if (outputs.includes('console'))
                this.setConsoleTransport();
            if (outputs.includes('file'))
                this.setFileTransport();
            this.scopes = new Set(scopes);
        }
        else {
            this.scopes = new Set();
        }
        if (isRoot)
            n8n_workflow_1.LoggerProxy.init(this);
    }
    setInternalLogger(internalLogger) {
        this.internalLogger = internalLogger;
    }
    scoped(scopes) {
        scopes = Array.isArray(scopes) ? scopes : [scopes];
        const scopedLogger = new Logger_1(this.globalConfig, this.instanceSettingsConfig, {
            isRoot: false,
        });
        const childLogger = this.internalLogger.child({ scopes });
        scopedLogger.setInternalLogger(childLogger);
        return scopedLogger;
    }
    log(level, message, metadata) {
        const location = {};
        const caller = (0, callsites_1.default)().at(2);
        if (caller !== undefined) {
            location.file = (0, node_path_1.basename)(caller.getFileName() ?? '');
            const fnName = caller.getFunctionName();
            if (fnName)
                location.function = fnName;
        }
        this.internalLogger.log(level, message, { ...metadata, ...location });
    }
    setLevel() {
        const { levels } = this.internalLogger;
        for (const logLevel of n8n_workflow_1.LOG_LEVELS) {
            if (levels[logLevel] > levels[this.level]) {
                Object.defineProperty(this, logLevel, { value: noOp });
            }
        }
    }
    setConsoleTransport() {
        const format = this.level === 'debug' && backend_common_1.inDevelopment
            ? this.debugDevConsoleFormat()
            : this.level === 'debug' && backend_common_1.inProduction
                ? this.debugProdConsoleFormat()
                : winston_1.default.format.printf(({ message }) => message);
        this.internalLogger.add(new winston_1.default.transports.Console({ format }));
    }
    scopeFilter() {
        return winston_1.default.format((info) => {
            if (!this.isScopingEnabled)
                return info;
            const { scopes } = info.metadata;
            const shouldIncludeScope = scopes && scopes?.length > 0 && scopes.some((s) => this.scopes.has(s));
            return shouldIncludeScope ? info : false;
        })();
    }
    color() {
        return this.noColor ? winston_1.default.format.uncolorize() : winston_1.default.format.colorize({ all: true });
    }
    debugDevConsoleFormat() {
        return winston_1.default.format.combine(winston_1.default.format.metadata(), winston_1.default.format.timestamp({ format: () => this.devTsFormat() }), this.color(), this.scopeFilter(), winston_1.default.format.printf(({ level: rawLevel, message, timestamp, metadata: rawMetadata }) => {
            const separator = ' '.repeat(3);
            const logLevelColumnWidth = this.noColor ? 5 : 15;
            const level = rawLevel.toLowerCase().padEnd(logLevelColumnWidth, ' ');
            const metadata = this.toPrintable(rawMetadata);
            return [timestamp, level, message + ' ' + picocolors_1.default.dim(metadata)].join(separator);
        }));
    }
    debugProdConsoleFormat() {
        return winston_1.default.format.combine(winston_1.default.format.metadata(), winston_1.default.format.timestamp(), this.color(), this.scopeFilter(), winston_1.default.format.printf(({ level, message, timestamp, metadata: rawMetadata }) => {
            const metadata = this.toPrintable(rawMetadata);
            return `${timestamp} | ${level.padEnd(5)} | ${message}${metadata ? ' ' + metadata : ''}`;
        }));
    }
    devTsFormat() {
        const now = new Date();
        const pad = (num, digits = 2) => num.toString().padStart(digits, '0');
        const hours = pad(now.getHours());
        const minutes = pad(now.getMinutes());
        const seconds = pad(now.getSeconds());
        const milliseconds = pad(now.getMilliseconds(), 3);
        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    }
    toPrintable(metadata) {
        if ((0, backend_common_1.isObjectLiteral)(metadata) && Object.keys(metadata).length > 0) {
            return backend_common_1.inProduction
                ? JSON.stringify(metadata)
                : JSON.stringify(metadata)
                    .replace(/{"/g, '{ "')
                    .replace(/,"/g, ', "')
                    .replace(/:/g, ': ')
                    .replace(/}/g, ' }');
        }
        return '';
    }
    setFileTransport() {
        const format = winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.metadata(), winston_1.default.format.json());
        const filename = node_path_1.default.join(this.instanceSettingsConfig.n8nFolder, this.globalConfig.logging.file.location);
        const { fileSizeMax, fileCountMax } = this.globalConfig.logging.file;
        this.internalLogger.add(new winston_1.default.transports.File({
            filename,
            format,
            maxsize: fileSizeMax * 1_048_576,
            maxFiles: fileCountMax,
        }));
    }
    error(message, metadata = {}) {
        this.log('error', message, metadata);
    }
    warn(message, metadata = {}) {
        this.log('warn', message, metadata);
    }
    info(message, metadata = {}) {
        this.log('info', message, metadata);
    }
    debug(message, metadata = {}) {
        this.log('debug', message, metadata);
    }
    getInternalLogger() {
        return this.internalLogger;
    }
};
exports.Logger = Logger;
exports.Logger = Logger = Logger_1 = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [config_1.GlobalConfig,
        config_1.InstanceSettingsConfig, Object])
], Logger);
//# sourceMappingURL=logger.js.map
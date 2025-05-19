"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuiltInsParserState = void 0;
class BuiltInsParserState {
    constructor(opts = {}) {
        this.neededNodeNames = new Set();
        this.needsAllNodes = false;
        this.needs$env = false;
        this.needs$input = false;
        this.needs$execution = false;
        this.needs$prevNode = false;
        Object.assign(this, opts);
    }
    markNeedsAllNodes() {
        this.needsAllNodes = true;
        this.needs$input = true;
        this.neededNodeNames = new Set();
    }
    markNodeAsNeeded(nodeName) {
        if (this.needsAllNodes) {
            return;
        }
        this.neededNodeNames.add(nodeName);
    }
    markEnvAsNeeded() {
        this.needs$env = true;
    }
    markInputAsNeeded() {
        this.needs$input = true;
    }
    markExecutionAsNeeded() {
        this.needs$execution = true;
    }
    markPrevNodeAsNeeded() {
        this.needs$prevNode = true;
    }
    toDataRequestParams(chunk) {
        return {
            dataOfNodes: this.needsAllNodes ? 'all' : Array.from(this.neededNodeNames),
            env: this.needs$env,
            input: {
                include: this.needs$input,
                chunk,
            },
            prevNode: this.needs$prevNode,
        };
    }
    static newNeedsAllDataState() {
        const obj = new BuiltInsParserState();
        obj.markNeedsAllNodes();
        obj.markEnvAsNeeded();
        obj.markInputAsNeeded();
        obj.markExecutionAsNeeded();
        obj.markPrevNodeAsNeeded();
        return obj;
    }
}
exports.BuiltInsParserState = BuiltInsParserState;
//# sourceMappingURL=built-ins-parser-state.js.map
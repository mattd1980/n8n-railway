"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionError = void 0;
const serializable_error_1 = require("./serializable-error");
class ExecutionError extends serializable_error_1.SerializableError {
    constructor(error, itemIndex) {
        super(error.message);
        this.description = null;
        this.itemIndex = undefined;
        this.context = undefined;
        this.lineNumber = undefined;
        this.itemIndex = itemIndex;
        if (this.itemIndex !== undefined) {
            this.context = { itemIndex: this.itemIndex };
        }
        Object.defineProperty(this, 'stack', {
            value: error.stack,
            enumerable: true,
        });
        this.populateFromStack();
    }
    populateFromStack() {
        const stackRows = (this.stack ?? '').split('\n');
        if (stackRows.length === 0) {
            this.message = 'Unknown error';
            return;
        }
        const messageRow = stackRows.find((line) => line.includes('Error:'));
        const lineNumberDisplay = this.toLineNumberDisplay(stackRows);
        if (!messageRow) {
            this.message = `Unknown error ${lineNumberDisplay}`;
            return;
        }
        const [errorDetails, errorType] = this.toErrorDetailsAndType(messageRow);
        if (errorType)
            this.description = errorType;
        if (!errorDetails) {
            this.message = `Unknown error ${lineNumberDisplay}`;
            return;
        }
        this.message = `${errorDetails} ${lineNumberDisplay}`;
    }
    toLineNumberDisplay(stackRows) {
        if (!stackRows || stackRows.length === 0)
            return '';
        const userFnLine = stackRows.find((row) => row.match(/\(evalmachine\.<anonymous>:\d+:\d+\)/) && !row.includes('VmCodeWrapper'));
        if (userFnLine) {
            const match = userFnLine.match(/evalmachine\.<anonymous>:(\d+):/);
            if (match)
                this.lineNumber = Number(match[1]);
        }
        if (this.lineNumber === undefined) {
            const topLevelLine = stackRows.find((row) => row.includes('VmCodeWrapper') && row.includes('evalmachine.<anonymous>'));
            if (topLevelLine) {
                const match = topLevelLine.match(/evalmachine\.<anonymous>:(\d+):/);
                if (match)
                    this.lineNumber = Number(match[1]);
            }
        }
        if (this.lineNumber === undefined)
            return '';
        return this.itemIndex === undefined
            ? `[line ${this.lineNumber}]`
            : `[line ${this.lineNumber}, for item ${this.itemIndex}]`;
    }
    toErrorDetailsAndType(messageRow) {
        if (!messageRow)
            return [null, null];
        const [errorDetails, errorType] = messageRow
            .split(':')
            .reverse()
            .map((i) => i.trim());
        return [errorDetails, errorType === 'Error' ? null : errorType];
    }
}
exports.ExecutionError = ExecutionError;
//# sourceMappingURL=execution-error.js.map
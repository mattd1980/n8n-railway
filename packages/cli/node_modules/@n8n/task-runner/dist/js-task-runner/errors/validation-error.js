"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
const serializable_error_1 = require("./serializable-error");
class ValidationError extends serializable_error_1.SerializableError {
    constructor({ message, description, itemIndex, lineNumber, }) {
        super(message);
        this.description = '';
        this.itemIndex = undefined;
        this.context = undefined;
        this.lineNumber = undefined;
        this.lineNumber = lineNumber;
        this.itemIndex = itemIndex;
        if (this.lineNumber !== undefined && this.itemIndex !== undefined) {
            this.message = `${message} [line ${lineNumber}, for item ${itemIndex}]`;
        }
        else if (this.lineNumber !== undefined) {
            this.message = `${message} [line ${lineNumber}]`;
        }
        else if (this.itemIndex !== undefined) {
            this.message = `${message} [item ${itemIndex}]`;
        }
        else {
            this.message = message;
        }
        this.description = description;
        if (this.itemIndex !== undefined) {
            this.context = { itemIndex: this.itemIndex };
        }
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=validation-error.js.map
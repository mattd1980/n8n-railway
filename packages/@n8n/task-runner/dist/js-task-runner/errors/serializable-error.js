"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializableError = void 0;
exports.makeSerializable = makeSerializable;
function makeSerializable(error) {
    Object.defineProperties(error, {
        message: {
            value: error.message,
            enumerable: true,
            configurable: true,
        },
        stack: {
            value: error.stack,
            enumerable: true,
            configurable: true,
        },
    });
    return error;
}
class SerializableError extends Error {
    constructor(message) {
        super(message);
        makeSerializable(this);
    }
}
exports.SerializableError = SerializableError;
//# sourceMappingURL=serializable-error.js.map
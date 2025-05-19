"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonArrayOfObjectsError = exports.REQUIRED_N8N_ITEM_KEYS = void 0;
exports.validateRunForAllItemsOutput = validateRunForAllItemsOutput;
exports.validateRunForEachItemOutput = validateRunForEachItemOutput;
const n8n_core_1 = require("n8n-core");
const validation_error_1 = require("./errors/validation-error");
const obj_utils_1 = require("./obj-utils");
exports.REQUIRED_N8N_ITEM_KEYS = new Set([
    'json',
    'binary',
    'pairedItem',
    'error',
    'index',
]);
function validateTopLevelKeys(item, itemIndex) {
    for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
            if (exports.REQUIRED_N8N_ITEM_KEYS.has(key))
                continue;
            throw new validation_error_1.ValidationError({
                message: `Unknown top-level item key: ${key}`,
                description: 'Access the properties of an item under `.json`, e.g. `item.json`',
                itemIndex,
            });
        }
    }
}
function validateItem({ json, binary }, itemIndex) {
    if (json === undefined || !(0, obj_utils_1.isObject)(json)) {
        throw new validation_error_1.ValidationError({
            message: "A 'json' property isn't an object",
            description: "In the returned data, every key named 'json' must point to an object.",
            itemIndex,
        });
    }
    if (binary !== undefined && !(0, obj_utils_1.isObject)(binary)) {
        throw new validation_error_1.ValidationError({
            message: "A 'binary' property isn't an object",
            description: "In the returned data, every key named 'binary' must point to an object.",
            itemIndex,
        });
    }
}
class NonArrayOfObjectsError extends validation_error_1.ValidationError {
    constructor() {
        super({
            message: "Code doesn't return items properly",
            description: 'Please return an array of objects, one for each item you would like to output.',
        });
    }
}
exports.NonArrayOfObjectsError = NonArrayOfObjectsError;
function validateRunForAllItemsOutput(executionResult) {
    if (Array.isArray(executionResult)) {
        for (const item of executionResult) {
            if (!(0, obj_utils_1.isObject)(item))
                throw new NonArrayOfObjectsError();
        }
        const mustHaveTopLevelN8nKey = executionResult.some((item) => Object.keys(item).find((key) => exports.REQUIRED_N8N_ITEM_KEYS.has(key)));
        if (mustHaveTopLevelN8nKey) {
            for (let index = 0; index < executionResult.length; index++) {
                const item = executionResult[index];
                validateTopLevelKeys(item, index);
            }
        }
    }
    else if (!(0, obj_utils_1.isObject)(executionResult)) {
        throw new NonArrayOfObjectsError();
    }
    const returnData = (0, n8n_core_1.normalizeItems)(executionResult);
    returnData.forEach(validateItem);
    return returnData;
}
function validateRunForEachItemOutput(executionResult, itemIndex) {
    if (typeof executionResult !== 'object') {
        throw new validation_error_1.ValidationError({
            message: "Code doesn't return an object",
            description: `Please return an object representing the output item. ('${executionResult}' was returned instead.)`,
            itemIndex,
        });
    }
    if (Array.isArray(executionResult)) {
        const firstSentence = executionResult.length > 0
            ? `An array of ${typeof executionResult[0]}s was returned.`
            : 'An empty array was returned.';
        throw new validation_error_1.ValidationError({
            message: "Code doesn't return a single object",
            description: `${firstSentence} If you need to output multiple items, please use the 'Run Once for All Items' mode instead.`,
            itemIndex,
        });
    }
    const [returnData] = (0, n8n_core_1.normalizeItems)([executionResult]);
    validateItem(returnData, itemIndex);
    validateTopLevelKeys(returnData, itemIndex);
    return returnData;
}
//# sourceMappingURL=result-validation.js.map
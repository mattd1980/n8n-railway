"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var Sandbox_exports = {};
__export(Sandbox_exports, {
  REQUIRED_N8N_ITEM_KEYS: () => REQUIRED_N8N_ITEM_KEYS,
  Sandbox: () => Sandbox,
  getSandboxContext: () => getSandboxContext
});
module.exports = __toCommonJS(Sandbox_exports);
var import_events = require("events");
var import_utils = require("./utils");
var import_ValidationError = require("./ValidationError");
const REQUIRED_N8N_ITEM_KEYS = /* @__PURE__ */ new Set([
  "json",
  "binary",
  "pairedItem",
  "error",
  /**
   * The `index` key was added accidentally to Function, FunctionItem, Gong,
   * Execute Workflow, and ToolWorkflowV2, so we need to allow it temporarily.
   * Once we stop using it in all nodes, we can stop allowing the `index` key.
   */
  "index"
]);
function getSandboxContext(index) {
  const helpers = {
    ...this.helpers,
    httpRequestWithAuthentication: this.helpers.httpRequestWithAuthentication.bind(this),
    requestWithAuthenticationPaginated: this.helpers.requestWithAuthenticationPaginated.bind(this)
  };
  return {
    // from NodeExecuteFunctions
    $getNodeParameter: this.getNodeParameter.bind(this),
    $getWorkflowStaticData: this.getWorkflowStaticData.bind(this),
    helpers,
    // to bring in all $-prefixed vars and methods from WorkflowDataProxy
    // $node, $items(), $parameter, $json, $env, etc.
    ...this.getWorkflowDataProxy(index)
  };
}
class Sandbox extends import_events.EventEmitter {
  constructor(textKeys, helpers) {
    super();
    this.textKeys = textKeys;
    this.helpers = helpers;
  }
  validateRunCodeEachItem(executionResult, itemIndex) {
    if (typeof executionResult !== "object") {
      throw new import_ValidationError.ValidationError({
        message: `Code doesn't return ${this.getTextKey("object", { includeArticle: true })}`,
        description: `Please return ${this.getTextKey("object", {
          includeArticle: true
        })} representing the output item. ('${executionResult}' was returned instead.)`,
        itemIndex
      });
    }
    if (Array.isArray(executionResult)) {
      const firstSentence = executionResult.length > 0 ? `An array of ${typeof executionResult[0]}s was returned.` : "An empty array was returned.";
      throw new import_ValidationError.ValidationError({
        message: `Code doesn't return a single ${this.getTextKey("object")}`,
        description: `${firstSentence} If you need to output multiple items, please use the 'Run Once for All Items' mode instead.`,
        itemIndex
      });
    }
    const [returnData] = this.helpers.normalizeItems([executionResult]);
    this.validateItem(returnData, itemIndex);
    this.validateTopLevelKeys(returnData, itemIndex);
    return returnData;
  }
  validateRunCodeAllItems(executionResult) {
    if (typeof executionResult !== "object") {
      throw new import_ValidationError.ValidationError({
        message: "Code doesn't return items properly",
        description: `Please return an array of ${this.getTextKey("object", {
          plural: true
        })}, one for each item you would like to output.`
      });
    }
    if (Array.isArray(executionResult)) {
      const mustHaveTopLevelN8nKey = executionResult.some(
        (item) => Object.keys(item).find((key) => REQUIRED_N8N_ITEM_KEYS.has(key))
      );
      if (mustHaveTopLevelN8nKey) {
        for (let index = 0; index < executionResult.length; index++) {
          const item = executionResult[index];
          this.validateTopLevelKeys(item, index);
        }
      }
    }
    const returnData = this.helpers.normalizeItems(executionResult);
    returnData.forEach((item, index) => this.validateItem(item, index));
    return returnData;
  }
  getTextKey(key, options) {
    const response = this.textKeys[key][options?.plural ? "plural" : "singular"];
    if (!options?.includeArticle) {
      return response;
    }
    if (["a", "e", "i", "o", "u"].some((value) => response.startsWith(value))) {
      return `an ${response}`;
    }
    return `a ${response}`;
  }
  validateItem({ json, binary }, itemIndex) {
    if (json === void 0 || !(0, import_utils.isObject)(json)) {
      throw new import_ValidationError.ValidationError({
        message: `A 'json' property isn't ${this.getTextKey("object", { includeArticle: true })}`,
        description: `In the returned data, every key named 'json' must point to ${this.getTextKey(
          "object",
          { includeArticle: true }
        )}.`,
        itemIndex
      });
    }
    if (binary !== void 0 && !(0, import_utils.isObject)(binary)) {
      throw new import_ValidationError.ValidationError({
        message: `A 'binary' property isn't ${this.getTextKey("object", { includeArticle: true })}`,
        description: `In the returned data, every key named 'binary\u2019 must point to ${this.getTextKey(
          "object",
          { includeArticle: true }
        )}.`,
        itemIndex
      });
    }
  }
  validateTopLevelKeys(item, itemIndex) {
    Object.keys(item).forEach((key) => {
      if (REQUIRED_N8N_ITEM_KEYS.has(key)) return;
      throw new import_ValidationError.ValidationError({
        message: `Unknown top-level item key: ${key}`,
        description: "Access the properties of an item under `.json`, e.g. `item.json`",
        itemIndex
      });
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  REQUIRED_N8N_ITEM_KEYS,
  Sandbox,
  getSandboxContext
});
//# sourceMappingURL=Sandbox.js.map
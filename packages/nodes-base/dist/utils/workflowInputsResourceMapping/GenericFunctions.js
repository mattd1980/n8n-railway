"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var GenericFunctions_exports = {};
__export(GenericFunctions_exports, {
  getCurrentWorkflowInputData: () => getCurrentWorkflowInputData,
  getFieldEntries: () => getFieldEntries,
  getWorkflowInputValues: () => getWorkflowInputValues,
  loadWorkflowInputMappings: () => loadWorkflowInputMappings
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_generate_schema = require("generate-schema");
var import_lodash = __toESM(require("lodash"));
var import_n8n_workflow = require("n8n-workflow");
var import_constants = require("./constants");
const SUPPORTED_TYPES = import_constants.TYPE_OPTIONS.map((x) => x.value);
function parseJsonSchema(schema) {
  if (schema.type !== "object") {
    if (schema.type === void 0) {
      return "Invalid JSON schema. Missing key `type` in schema";
    }
    if (Array.isArray(schema.type)) {
      return `Invalid JSON schema type. Only object type is supported, but got an array of types: ${schema.type.join(", ")}`;
    }
    return `Invalid JSON schema type. Only object type is supported, but got ${schema.type}`;
  }
  if (!schema?.properties) {
    return "Invalid JSON schema. Missing key `properties` in schema";
  }
  if (typeof schema.properties !== "object") {
    return "Invalid JSON schema. Key `properties` is not an object";
  }
  const result = [];
  for (const [name, v] of Object.entries(schema.properties)) {
    if (typeof v !== "object") {
      return `Invalid JSON schema. Value for property '${name}' is not an object`;
    }
    const type = v?.type;
    if (type === "null") {
      result.push({ name, type: "any" });
    } else if (Array.isArray(type)) {
      return `Invalid JSON schema. Array of types for property '${name}' is not supported by n8n. Either provide a single type or use type 'any' to allow any type`;
    } else if (typeof type !== "string") {
      return `Invalid JSON schema. Unexpected non-string type ${type} for property '${name}'`;
    } else if (!SUPPORTED_TYPES.includes(type)) {
      return `Invalid JSON schema. Unsupported type ${type} for property '${name}'. Supported types are ${JSON.stringify(SUPPORTED_TYPES, null, 1)}`;
    } else {
      result.push({ name, type });
    }
  }
  return result;
}
function parseJsonExample(context) {
  const jsonString = context.getNodeParameter(import_constants.JSON_EXAMPLE, 0, "");
  const json = (0, import_n8n_workflow.jsonParse)(jsonString);
  return (0, import_generate_schema.json)(json);
}
function getFieldEntries(context) {
  const inputSource = context.getNodeParameter(import_constants.INPUT_SOURCE, 0, import_constants.PASSTHROUGH);
  let result = "Internal Error: Invalid input source";
  try {
    if (inputSource === import_constants.WORKFLOW_INPUTS) {
      result = context.getNodeParameter(
        `${import_constants.WORKFLOW_INPUTS}.${import_constants.VALUES}`,
        0,
        []
      );
    } else if (inputSource === import_constants.JSON_EXAMPLE) {
      const schema = parseJsonExample(context);
      result = parseJsonSchema(schema);
    } else if (inputSource === import_constants.PASSTHROUGH) {
      result = [];
    }
  } catch (e) {
    result = e && typeof e === "object" && "message" in e && typeof e.message === "string" ? e.message : `Unknown error occurred: ${JSON.stringify(e)}`;
  }
  if (Array.isArray(result)) {
    const dataMode = String(inputSource);
    const workflow = context.getWorkflow();
    const node = context.getNode();
    return {
      fields: result,
      dataMode,
      subworkflowInfo: { workflowId: workflow.id, triggerId: node.id }
    };
  }
  throw new import_n8n_workflow.NodeOperationError(context.getNode(), result);
}
function getWorkflowInputValues() {
  const inputData = this.getInputData();
  return inputData.map(({ json, binary }, itemIndex) => {
    const itemFieldValues = this.getNodeParameter(
      "workflowInputs.value",
      itemIndex,
      {}
    );
    return {
      json: {
        ...json,
        ...itemFieldValues
      },
      index: itemIndex,
      pairedItem: {
        item: itemIndex
      },
      binary
    };
  });
}
function getCurrentWorkflowInputData() {
  const inputData = getWorkflowInputValues.call(this);
  const schema = this.getNodeParameter("workflowInputs.schema", 0, []);
  if (schema.length === 0) {
    return inputData;
  } else {
    const removedKeys = new Set(schema.filter((x) => x.removed).map((x) => x.displayName));
    const filteredInputData = inputData.map(({ json, binary }, index) => ({
      index,
      pairedItem: { item: index },
      json: import_lodash.default.pickBy(json, (_v, key) => !removedKeys.has(key)),
      binary
    }));
    return filteredInputData;
  }
}
async function loadWorkflowInputMappings() {
  const nodeLoadContext = await this.getWorkflowNodeContext(import_n8n_workflow.EXECUTE_WORKFLOW_TRIGGER_NODE_TYPE);
  let fields = [];
  let dataMode = import_constants.PASSTHROUGH;
  let subworkflowInfo;
  if (nodeLoadContext) {
    const fieldValues = getFieldEntries(nodeLoadContext);
    dataMode = fieldValues.dataMode;
    subworkflowInfo = fieldValues.subworkflowInfo;
    fields = fieldValues.fields.map((currentWorkflowInput) => {
      const field = {
        id: currentWorkflowInput.name,
        displayName: currentWorkflowInput.name,
        required: false,
        defaultMatch: false,
        display: true,
        canBeUsedToMatch: true
      };
      if (currentWorkflowInput.type !== "any") {
        field.type = currentWorkflowInput.type;
      }
      return field;
    });
  }
  return { fields, dataMode, subworkflowInfo };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getCurrentWorkflowInputData,
  getFieldEntries,
  getWorkflowInputValues,
  loadWorkflowInputMappings
});
//# sourceMappingURL=GenericFunctions.js.map
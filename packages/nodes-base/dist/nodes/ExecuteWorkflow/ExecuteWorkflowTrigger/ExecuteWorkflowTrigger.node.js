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
var ExecuteWorkflowTrigger_node_exports = {};
__export(ExecuteWorkflowTrigger_node_exports, {
  ExecuteWorkflowTrigger: () => ExecuteWorkflowTrigger
});
module.exports = __toCommonJS(ExecuteWorkflowTrigger_node_exports);
var import_lodash = __toESM(require("lodash"));
var import_n8n_workflow = require("n8n-workflow");
var import_constants = require("../../../utils/workflowInputsResourceMapping/constants");
var import_GenericFunctions = require("../../../utils/workflowInputsResourceMapping/GenericFunctions");
class ExecuteWorkflowTrigger {
  constructor() {
    this.description = {
      displayName: "Execute Workflow Trigger",
      name: "executeWorkflowTrigger",
      icon: "fa:sign-out-alt",
      group: ["trigger"],
      version: [1, 1.1],
      description: "Helpers for calling other n8n workflows. Used for designing modular, microservice-like workflows.",
      eventTriggerDescription: "",
      maxNodes: 1,
      defaults: {
        name: "When Executed by Another Workflow",
        color: "#ff6d5a"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      hints: [
        {
          message: "This workflow isn't set to accept any input data. Fill out the workflow input schema or change the workflow to accept any data passed to it.",
          // This condition checks if we have no input fields, which gets a bit awkward:
          // For WORKFLOW_INPUTS: keys() only contains `VALUES` if at least one value is provided
          // For JSON_EXAMPLE: We remove all whitespace and check if we're left with an empty object. Note that we already error if the example is not valid JSON
          displayCondition: `={{$parameter['${import_constants.INPUT_SOURCE}'] === '${import_constants.WORKFLOW_INPUTS}' && !$parameter['${import_constants.WORKFLOW_INPUTS}'].keys().length || $parameter['${import_constants.INPUT_SOURCE}'] === '${import_constants.JSON_EXAMPLE}' && $parameter['${import_constants.JSON_EXAMPLE}'].toString().replaceAll(' ', '').replaceAll('\\n', '') === '{}' }}`,
          whenToDisplay: "always",
          location: "ndv"
        }
      ],
      properties: [
        {
          displayName: "Events",
          name: "events",
          type: "hidden",
          noDataExpression: true,
          options: [
            {
              name: "Workflow Call",
              value: "worklfow_call",
              description: "When executed by another workflow using Execute Workflow Trigger",
              action: "When executed by Another Workflow"
            }
          ],
          default: "worklfow_call"
        },
        {
          displayName: "When an \u2018execute workflow\u2019 node calls this workflow, the execution starts here. Any data passed into the 'execute workflow' node will be output by this node.",
          name: "notice",
          type: "notice",
          default: "",
          displayOptions: {
            show: { "@version": [{ _cnd: { eq: 1 } }] }
          }
        },
        {
          displayName: "This node is out of date. Please upgrade by removing it and adding a new one",
          name: "outdatedVersionWarning",
          type: "notice",
          displayOptions: { show: { "@version": [{ _cnd: { eq: 1 } }] } },
          default: ""
        },
        {
          // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
          displayName: "Input data mode",
          name: import_constants.INPUT_SOURCE,
          type: "options",
          options: [
            {
              // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
              name: "Define using fields below",
              value: import_constants.WORKFLOW_INPUTS,
              description: "Provide input fields via UI"
            },
            {
              // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
              name: "Define using JSON example",
              value: import_constants.JSON_EXAMPLE,
              description: "Generate a schema from an example JSON object"
            },
            {
              // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
              name: "Accept all data",
              value: import_constants.PASSTHROUGH,
              description: "Use all incoming data from the parent workflow"
            }
          ],
          default: import_constants.WORKFLOW_INPUTS,
          noDataExpression: true,
          displayOptions: {
            show: { "@version": [{ _cnd: { gte: 1.1 } }] }
          }
        },
        {
          displayName: "Provide an example object to infer fields and their types.<br>To allow any type for a given field, set the value to null.",
          name: `${import_constants.JSON_EXAMPLE}_notice`,
          type: "notice",
          default: "",
          displayOptions: {
            show: { "@version": [{ _cnd: { gte: 1.1 } }], inputSource: [import_constants.JSON_EXAMPLE] }
          }
        },
        {
          displayName: "JSON Example",
          name: import_constants.JSON_EXAMPLE,
          type: "json",
          default: JSON.stringify(
            {
              aField: "a string",
              aNumber: 123,
              thisFieldAcceptsAnyType: null,
              anArray: []
            },
            null,
            2
          ),
          noDataExpression: true,
          displayOptions: {
            show: { "@version": [{ _cnd: { gte: 1.1 } }], inputSource: [import_constants.JSON_EXAMPLE] }
          }
        },
        {
          displayName: "Workflow Input Schema",
          name: import_constants.WORKFLOW_INPUTS,
          placeholder: "Add field",
          type: "fixedCollection",
          description: "Define expected input fields. If no inputs are provided, all data from the calling workflow will be passed through.",
          typeOptions: {
            multipleValues: true,
            sortable: true,
            minRequiredFields: 1
          },
          displayOptions: {
            show: { "@version": [{ _cnd: { gte: 1.1 } }], inputSource: [import_constants.WORKFLOW_INPUTS] }
          },
          default: {},
          options: [
            {
              name: import_constants.VALUES,
              displayName: "Values",
              values: [
                {
                  displayName: "Name",
                  name: "name",
                  type: "string",
                  default: "",
                  placeholder: "e.g. fieldName",
                  description: "A unique name for this workflow input, used to reference it from another workflows",
                  required: true,
                  noDataExpression: true
                },
                {
                  displayName: "Type",
                  name: "type",
                  type: "options",
                  description: "Expected data type for this input value. Determines how this field's values are stored, validated, and displayed.",
                  options: import_constants.TYPE_OPTIONS,
                  required: true,
                  default: "string",
                  noDataExpression: true
                }
              ]
            }
          ]
        }
      ]
    };
  }
  async execute() {
    const inputData = this.getInputData();
    const inputSource = this.getNodeParameter(import_constants.INPUT_SOURCE, 0, import_constants.PASSTHROUGH);
    if (inputSource === import_constants.PASSTHROUGH) {
      return [inputData];
    } else {
      const newParams = (0, import_GenericFunctions.getFieldEntries)(this);
      const newKeys = new Set(newParams.fields.map((x) => x.name));
      const itemsInSchema = inputData.map(({ json, binary }, index) => ({
        json: {
          ...Object.fromEntries(newParams.fields.map((x) => [x.name, import_constants.FALLBACK_DEFAULT_VALUE])),
          // Need to trim to the expected schema to support legacy Execute Workflow callers passing through all their data
          // which we do not want to expose past this node.
          ...import_lodash.default.pickBy(json, (_value, key) => newKeys.has(key))
        },
        index,
        binary
      }));
      return [itemsInSchema];
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ExecuteWorkflowTrigger
});
//# sourceMappingURL=ExecuteWorkflowTrigger.node.js.map
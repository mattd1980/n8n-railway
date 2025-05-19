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
var StopAndError_node_exports = {};
__export(StopAndError_node_exports, {
  StopAndError: () => StopAndError
});
module.exports = __toCommonJS(StopAndError_node_exports);
var import_n8n_workflow = require("n8n-workflow");
const errorObjectPlaceholder = `{
	"code": "404",
	"description": "The resource could not be fetched"
}`;
class StopAndError {
  constructor() {
    this.description = {
      displayName: "Stop and Error",
      name: "stopAndError",
      icon: "fa:exclamation-triangle",
      iconColor: "red",
      group: ["input"],
      version: 1,
      description: "Throw an error in the workflow",
      defaults: {
        name: "Stop and Error",
        color: "#ff0000"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [],
      properties: [
        {
          displayName: "Error Type",
          name: "errorType",
          type: "options",
          options: [
            {
              name: "Error Message",
              value: "errorMessage"
            },
            {
              name: "Error Object",
              value: "errorObject"
            }
          ],
          default: "errorMessage",
          description: "Type of error to throw"
        },
        {
          displayName: "Error Message",
          name: "errorMessage",
          type: "string",
          placeholder: "An error occurred!",
          default: "",
          required: true,
          displayOptions: {
            show: {
              errorType: ["errorMessage"]
            }
          }
        },
        {
          displayName: "Error Object",
          name: "errorObject",
          type: "json",
          description: "Object containing error properties",
          default: "",
          typeOptions: {
            alwaysOpenEditWindow: true
          },
          placeholder: errorObjectPlaceholder,
          required: true,
          displayOptions: {
            show: {
              errorType: ["errorObject"]
            }
          }
        }
      ]
    };
  }
  async execute() {
    const errorType = this.getNodeParameter("errorType", 0);
    const { id: workflowId, name: workflowName } = this.getWorkflow();
    let toThrow;
    if (errorType === "errorMessage") {
      toThrow = this.getNodeParameter("errorMessage", 0);
    } else {
      const json = this.getNodeParameter("errorObject", 0);
      const errorObject = (0, import_n8n_workflow.jsonParse)(json);
      toThrow = {
        name: "User-thrown error",
        message: `Workflow ID ${workflowId} "${workflowName}" has failed`,
        ...errorObject
      };
    }
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), toThrow);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StopAndError
});
//# sourceMappingURL=StopAndError.node.js.map
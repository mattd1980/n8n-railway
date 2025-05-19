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
var errorHandler_exports = {};
__export(errorHandler_exports, {
  ErrorMap: () => ErrorMap,
  handleError: () => handleError
});
module.exports = __toCommonJS(errorHandler_exports);
var import_n8n_workflow = require("n8n-workflow");
const ErrorMap = {
  Container: {
    Conflict: {
      getMessage: (id) => `Container "${id}" already exists.`,
      description: "Use a unique value for 'ID' and try again."
    },
    NotFound: {
      getMessage: (id) => `Container "${id}" was not found.`,
      description: "Double-check the value in the parameter 'Container' and try again."
    }
  },
  Item: {
    NotFound: {
      getMessage: (id) => `Item "${id}" was not found.`,
      description: "Double-check the values in the parameter 'Item' and 'Partition Key' (if applicable) and try again."
    }
  }
};
async function handleError(data, response) {
  if (String(response.statusCode).startsWith("4") || String(response.statusCode).startsWith("5")) {
    const resource = this.getNodeParameter("resource");
    const error = response.body;
    let errorMessage = error.message;
    let errorDetails = void 0;
    if (resource === "container") {
      if (error.code === "Conflict") {
        const newContainerValue = this.getNodeParameter("containerCreate");
        throw new import_n8n_workflow.NodeApiError(this.getNode(), error, {
          message: ErrorMap.Container.Conflict.getMessage(newContainerValue ?? "Unknown"),
          description: ErrorMap.Container.Conflict.description
        });
      }
      if (error.code === "NotFound") {
        const containerValue = this.getNodeParameter("container", void 0, {
          extractValue: true
        });
        throw new import_n8n_workflow.NodeApiError(this.getNode(), error, {
          message: ErrorMap.Container.NotFound.getMessage(containerValue ?? "Unknown"),
          description: ErrorMap.Container.NotFound.description
        });
      }
    } else if (resource === "item") {
      if (error.code === "NotFound") {
        const itemValue = this.getNodeParameter("item", void 0, {
          extractValue: true
        });
        throw new import_n8n_workflow.NodeApiError(this.getNode(), error, {
          message: ErrorMap.Item.NotFound.getMessage(itemValue ?? "Unknown"),
          description: ErrorMap.Item.NotFound.description
        });
      }
    }
    try {
      errorMessage = (0, import_n8n_workflow.jsonParse)(errorMessage).message;
    } catch {
    }
    const match = errorMessage.match(/Message: ({.*?})/);
    if (match?.[1]) {
      try {
        errorDetails = (0, import_n8n_workflow.jsonParse)(match[1]).Errors;
      } catch {
      }
    }
    if (errorDetails && errorDetails.length > 0) {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), error, {
        message: error.code,
        description: errorDetails.join("\n")
      });
    } else {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), error, {
        message: error.code,
        description: error.message
      });
    }
  }
  return data;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ErrorMap,
  handleError
});
//# sourceMappingURL=errorHandler.js.map
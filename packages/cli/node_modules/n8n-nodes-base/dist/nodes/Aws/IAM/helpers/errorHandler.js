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
  handleError: () => handleError
});
module.exports = __toCommonJS(errorHandler_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_constants = require("./constants");
function mapErrorToResponse(errorCode, errorMessage) {
  const isUser = /user/i.test(errorMessage);
  const isGroup = /group/i.test(errorMessage);
  switch (errorCode) {
    case "EntityAlreadyExists":
      if (isUser) {
        return {
          message: errorMessage,
          description: import_constants.ERROR_DESCRIPTIONS.EntityAlreadyExists.User
        };
      }
      if (isGroup) {
        return {
          message: errorMessage,
          description: import_constants.ERROR_DESCRIPTIONS.EntityAlreadyExists.Group
        };
      }
      break;
    case "NoSuchEntity":
      if (isUser) {
        return {
          message: errorMessage,
          description: import_constants.ERROR_DESCRIPTIONS.NoSuchEntity.User
        };
      }
      if (isGroup) {
        return {
          message: errorMessage,
          description: import_constants.ERROR_DESCRIPTIONS.NoSuchEntity.Group
        };
      }
      break;
    case "DeleteConflict":
      return {
        message: errorMessage,
        description: import_constants.ERROR_DESCRIPTIONS.DeleteConflict.Default
      };
  }
  return void 0;
}
async function handleError(data, response) {
  const statusCode = String(response.statusCode);
  if (!statusCode.startsWith("4") && !statusCode.startsWith("5")) {
    return data;
  }
  const responseBody = response.body;
  const error = responseBody.Error;
  if (!error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), response);
  }
  const specificError = mapErrorToResponse(error.Code, error.Message);
  if (specificError) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), response, specificError);
  } else {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), response, {
      message: error.Code,
      description: error.Message
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handleError
});
//# sourceMappingURL=errorHandler.js.map
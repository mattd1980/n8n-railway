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
function mapErrorToResponse(errorType, resource, operation, inputValue) {
  const op = operation;
  const nameLabel = resource.charAt(0).toUpperCase() + resource.slice(1);
  const valuePart = inputValue ? ` "${inputValue}"` : "";
  const notFoundMessage = (base, suffix) => ({
    ...base,
    message: `${nameLabel}${valuePart} ${suffix}`
  });
  const isNotFound = [
    "UserNotFoundException",
    "ResourceNotFoundException",
    "NoSuchEntity"
  ].includes(errorType);
  const isExists = [
    "UsernameExistsException",
    "EntityAlreadyExists",
    "GroupExistsException"
  ].includes(errorType);
  if (isNotFound) {
    if (resource === "user") {
      if (operation === "addToGroup") {
        return notFoundMessage(import_constants.ERROR_MESSAGES.UserGroup.add, "not found while adding to group.");
      }
      if (operation === "removeFromGroup") {
        return notFoundMessage(
          import_constants.ERROR_MESSAGES.UserGroup.remove,
          "not found while removing from group."
        );
      }
      return notFoundMessage(import_constants.ERROR_MESSAGES.ResourceNotFound.User[op], "not found.");
    }
    if (resource === "group") {
      return notFoundMessage(import_constants.ERROR_MESSAGES.ResourceNotFound.Group[op], "not found.");
    }
  }
  if (isExists) {
    const existsMessage = `${nameLabel}${valuePart} already exists.`;
    if (resource === "user") {
      return { ...import_constants.ERROR_MESSAGES.EntityAlreadyExists.User, message: existsMessage };
    }
    if (resource === "group") {
      return { ...import_constants.ERROR_MESSAGES.EntityAlreadyExists.Group, message: existsMessage };
    }
  }
  return void 0;
}
async function handleError(data, response) {
  const statusCode = String(response.statusCode);
  if (!statusCode.startsWith("4") && !statusCode.startsWith("5")) {
    return data;
  }
  const resource = this.getNodeParameter("resource");
  const operation = this.getNodeParameter("operation");
  let inputValue;
  if (operation === "create") {
    if (resource === "user") {
      inputValue = this.getNodeParameter("newUserName", "");
    } else if (resource === "group") {
      inputValue = this.getNodeParameter("newGroupName", "");
    }
  } else {
    inputValue = this.getNodeParameter(resource, "", { extractValue: true });
  }
  const responseBody = response.body;
  const errorType = responseBody.__type ?? response.headers?.["x-amzn-errortype"];
  const errorMessage = responseBody.message ?? response.headers?.["x-amzn-errormessage"];
  if (!errorType) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), response);
  }
  const specificError = mapErrorToResponse(errorType, resource, operation, inputValue);
  throw new import_n8n_workflow.NodeApiError(
    this.getNode(),
    response,
    specificError ?? {
      message: errorType,
      description: errorMessage
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handleError
});
//# sourceMappingURL=errorHandler.js.map
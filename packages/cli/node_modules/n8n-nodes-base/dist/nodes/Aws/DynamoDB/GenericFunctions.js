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
var GenericFunctions_exports = {};
__export(GenericFunctions_exports, {
  awsApiRequest: () => awsApiRequest,
  awsApiRequestAllItems: () => awsApiRequestAllItems,
  copyInputItem: () => copyInputItem
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function awsApiRequest(service, method, path, body, headers) {
  const credentials = await this.getCredentials("aws");
  const requestOptions = {
    qs: {
      service,
      path
    },
    method,
    body: JSON.stringify(body),
    url: "",
    headers,
    region: credentials?.region
  };
  try {
    return JSON.parse(
      await this.helpers.requestWithAuthentication.call(this, "aws", requestOptions)
    );
  } catch (error) {
    const statusCode = error.statusCode || error.cause?.statusCode;
    let errorMessage = error.response?.body?.message || error.response?.body?.Message || error.message;
    if (statusCode === 403) {
      if (errorMessage === "The security token included in the request is invalid.") {
        throw new import_n8n_workflow.ApplicationError("The AWS credentials are not valid!", { level: "warning" });
      } else if (errorMessage.startsWith(
        "The request signature we calculated does not match the signature you provided"
      )) {
        throw new import_n8n_workflow.ApplicationError("The AWS credentials are not valid!", { level: "warning" });
      }
    }
    if (error.cause?.error) {
      try {
        errorMessage = JSON.parse(error.cause?.error).message;
      } catch (ex) {
      }
    }
    throw new import_n8n_workflow.ApplicationError(`AWS error response [${statusCode}]: ${errorMessage}`, {
      level: "warning"
    });
  }
}
async function awsApiRequestAllItems(service, method, path, body, headers) {
  const returnData = [];
  let responseData;
  do {
    const originalHeaders = Object.assign({}, headers);
    responseData = await awsApiRequest.call(this, service, method, path, body, originalHeaders);
    if (responseData.LastEvaluatedKey) {
      body.ExclusiveStartKey = responseData.LastEvaluatedKey;
    }
    returnData.push(...responseData.Items);
  } while (responseData.LastEvaluatedKey !== void 0);
  return returnData;
}
function copyInputItem(item, properties) {
  const newItem = {};
  for (const property of properties) {
    if (item.json[property] === void 0) {
      newItem[property] = null;
    } else {
      newItem[property] = (0, import_n8n_workflow.deepCopy)(item.json[property]);
    }
  }
  return newItem;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  awsApiRequest,
  awsApiRequestAllItems,
  copyInputItem
});
//# sourceMappingURL=GenericFunctions.js.map
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
var transport_exports = {};
__export(transport_exports, {
  awsApiRequest: () => awsApiRequest,
  awsApiRequestAllItems: () => awsApiRequestAllItems
});
module.exports = __toCommonJS(transport_exports);
async function awsApiRequest(method, action, body) {
  const credentialsType = "aws";
  const credentials = await this.getCredentials(credentialsType);
  const requestOptions = {
    url: "",
    method,
    body,
    headers: {
      "Content-Type": "application/x-amz-json-1.1",
      "X-Amz-Target": `AWSCognitoIdentityProviderService.${action}`
    },
    qs: {
      service: "cognito-idp",
      _region: credentials.region
    }
  };
  return await this.helpers.httpRequestWithAuthentication.call(
    this,
    credentialsType,
    requestOptions
  );
}
async function awsApiRequestAllItems(method, action, body, propertyName) {
  const returnData = [];
  let nextToken;
  do {
    const requestBody = {
      ...body,
      ...nextToken ? { NextToken: nextToken } : {}
    };
    const response = await awsApiRequest.call(
      this,
      method,
      action,
      JSON.stringify(requestBody)
    );
    const items = response[propertyName] ?? [];
    returnData.push(...items);
    nextToken = response.NextToken;
  } while (nextToken);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  awsApiRequest,
  awsApiRequestAllItems
});
//# sourceMappingURL=index.js.map
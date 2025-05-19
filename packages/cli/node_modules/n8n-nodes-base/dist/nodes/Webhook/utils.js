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
var utils_exports = {};
__export(utils_exports, {
  checkResponseModeConfiguration: () => checkResponseModeConfiguration,
  configuredOutputs: () => configuredOutputs,
  getResponseCode: () => getResponseCode,
  getResponseData: () => getResponseData,
  isIpWhitelisted: () => isIpWhitelisted,
  setupOutputConnection: () => setupOutputConnection,
  validateWebhookAuthentication: () => validateWebhookAuthentication
});
module.exports = __toCommonJS(utils_exports);
var import_basic_auth = __toESM(require("basic-auth"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_n8n_workflow = require("n8n-workflow");
var import_error = require("./error");
var import_utilities = require("../../utils/utilities");
const getResponseCode = (parameters) => {
  if (parameters.responseCode) {
    return parameters.responseCode;
  }
  const responseCodeOptions = parameters.options;
  if (responseCodeOptions?.responseCode?.values) {
    const { responseCode, customCode } = responseCodeOptions.responseCode.values;
    if (customCode) {
      return customCode;
    }
    return responseCode;
  }
  return 200;
};
const getResponseData = (parameters) => {
  const { responseData, responseMode, options } = parameters;
  if (responseData) return responseData;
  if (responseMode === "onReceived") {
    const data = options?.responseData;
    if (data) return data;
  }
  if (options?.noResponseBody) return "noData";
  return void 0;
};
const configuredOutputs = (parameters) => {
  const httpMethod = parameters.httpMethod;
  if (!Array.isArray(httpMethod))
    return [
      {
        type: "main",
        displayName: httpMethod
      }
    ];
  const outputs = httpMethod.map((method) => {
    return {
      type: "main",
      displayName: method
    };
  });
  return outputs;
};
const setupOutputConnection = (ctx, method, additionalData) => {
  const httpMethod = ctx.getNodeParameter("httpMethod", []);
  let webhookUrl = ctx.getNodeWebhookUrl("default");
  const executionMode = ctx.getMode() === "manual" ? "test" : "production";
  if (executionMode === "test") {
    webhookUrl = webhookUrl.replace("/webhook/", "/webhook-test/");
  }
  if (!Array.isArray(httpMethod)) {
    return (outputData) => {
      outputData.json.webhookUrl = webhookUrl;
      outputData.json.executionMode = executionMode;
      if (additionalData?.jwtPayload) {
        outputData.json.jwtPayload = additionalData.jwtPayload;
      }
      return [[outputData]];
    };
  }
  const outputIndex = httpMethod.indexOf(method.toUpperCase());
  const outputs = httpMethod.map(() => []);
  return (outputData) => {
    outputData.json.webhookUrl = webhookUrl;
    outputData.json.executionMode = executionMode;
    if (additionalData?.jwtPayload) {
      outputData.json.jwtPayload = additionalData.jwtPayload;
    }
    outputs[outputIndex] = [outputData];
    return outputs;
  };
};
const isIpWhitelisted = (whitelist, ips, ip) => {
  if (whitelist === void 0 || whitelist === "") {
    return true;
  }
  if (!Array.isArray(whitelist)) {
    whitelist = whitelist.split(",").map((entry) => entry.trim());
  }
  for (const address of whitelist) {
    if (ip && ip.includes(address)) {
      return true;
    }
    if (ips.some((entry) => entry.includes(address))) {
      return true;
    }
  }
  return false;
};
const checkResponseModeConfiguration = (context) => {
  const responseMode = context.getNodeParameter("responseMode", "onReceived");
  const connectedNodes = context.getChildNodes(context.getNode().name);
  const isRespondToWebhookConnected = connectedNodes.some(
    (node) => node.type === "n8n-nodes-base.respondToWebhook"
  );
  if (!isRespondToWebhookConnected && responseMode === "responseNode") {
    throw new import_n8n_workflow.NodeOperationError(
      context.getNode(),
      new Error("No Respond to Webhook node found in the workflow"),
      {
        description: "Insert a Respond to Webhook node to your workflow to respond to the webhook or choose another option for the \u201CRespond\u201D parameter"
      }
    );
  }
  if (isRespondToWebhookConnected && responseMode !== "responseNode") {
    throw new import_n8n_workflow.NodeOperationError(
      context.getNode(),
      new Error("Webhook node not correctly configured"),
      {
        description: "Set the \u201CRespond\u201D parameter to \u201CUsing Respond to Webhook Node\u201D or remove the Respond to Webhook node"
      }
    );
  }
};
async function validateWebhookAuthentication(ctx, authPropertyName) {
  const authentication = ctx.getNodeParameter(authPropertyName);
  if (authentication === "none") return;
  const req = ctx.getRequestObject();
  const headers = ctx.getHeaderData();
  if (authentication === "basicAuth") {
    let expectedAuth;
    try {
      expectedAuth = await ctx.getCredentials("httpBasicAuth");
    } catch {
    }
    if (expectedAuth === void 0 || !expectedAuth.user || !expectedAuth.password) {
      throw new import_error.WebhookAuthorizationError(500, "No authentication data defined on node!");
    }
    const providedAuth = (0, import_basic_auth.default)(req);
    if (!providedAuth) throw new import_error.WebhookAuthorizationError(401);
    if (providedAuth.name !== expectedAuth.user || providedAuth.pass !== expectedAuth.password) {
      throw new import_error.WebhookAuthorizationError(403);
    }
  } else if (authentication === "bearerAuth") {
    let expectedAuth;
    try {
      expectedAuth = await ctx.getCredentials("httpBearerAuth");
    } catch {
    }
    const expectedToken = expectedAuth?.token;
    if (!expectedToken) {
      throw new import_error.WebhookAuthorizationError(500, "No authentication data defined on node!");
    }
    if (headers.authorization !== `Bearer ${expectedToken}`) {
      throw new import_error.WebhookAuthorizationError(403);
    }
  } else if (authentication === "headerAuth") {
    let expectedAuth;
    try {
      expectedAuth = await ctx.getCredentials("httpHeaderAuth");
    } catch {
    }
    if (expectedAuth === void 0 || !expectedAuth.name || !expectedAuth.value) {
      throw new import_error.WebhookAuthorizationError(500, "No authentication data defined on node!");
    }
    const headerName = expectedAuth.name.toLowerCase();
    const expectedValue = expectedAuth.value;
    if (!headers.hasOwnProperty(headerName) || headers[headerName] !== expectedValue) {
      throw new import_error.WebhookAuthorizationError(403);
    }
  } else if (authentication === "jwtAuth") {
    let expectedAuth;
    try {
      expectedAuth = await ctx.getCredentials("jwtAuth");
    } catch {
    }
    if (expectedAuth === void 0) {
      throw new import_error.WebhookAuthorizationError(500, "No authentication data defined on node!");
    }
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    if (!token) {
      throw new import_error.WebhookAuthorizationError(401, "No token provided");
    }
    let secretOrPublicKey;
    if (expectedAuth.keyType === "passphrase") {
      secretOrPublicKey = expectedAuth.secret;
    } else {
      secretOrPublicKey = (0, import_utilities.formatPrivateKey)(expectedAuth.publicKey, true);
    }
    try {
      return import_jsonwebtoken.default.verify(token, secretOrPublicKey, {
        algorithms: [expectedAuth.algorithm]
      });
    } catch (error) {
      throw new import_error.WebhookAuthorizationError(403, error.message);
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkResponseModeConfiguration,
  configuredOutputs,
  getResponseCode,
  getResponseData,
  isIpWhitelisted,
  setupOutputConnection,
  validateWebhookAuthentication
});
//# sourceMappingURL=utils.js.map
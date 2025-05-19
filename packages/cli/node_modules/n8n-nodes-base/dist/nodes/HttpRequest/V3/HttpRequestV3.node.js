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
var HttpRequestV3_node_exports = {};
__export(HttpRequestV3_node_exports, {
  HttpRequestV3: () => HttpRequestV3
});
module.exports = __toCommonJS(HttpRequestV3_node_exports);
var import_set = __toESM(require("lodash/set"));
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../../utils/utilities");
var import_Description = require("./Description");
var import_GenericFunctions = require("../GenericFunctions");
var import_optimizeResponse = require("../shared/optimizeResponse");
function toText(data) {
  if (typeof data === "object" && data !== null) {
    return JSON.stringify(data);
  }
  return data;
}
class HttpRequestV3 {
  constructor(baseDescription) {
    this.description = {
      ...baseDescription,
      subtitle: '={{$parameter["method"] + ": " + $parameter["url"]}}',
      version: [3, 4, 4.1, 4.2],
      defaults: {
        name: "HTTP Request",
        color: "#0004F5"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "httpSslAuth",
          required: true,
          displayOptions: {
            show: {
              provideSslCertificates: [true]
            }
          }
        }
      ],
      usableAsTool: {
        replacements: {
          codex: {
            subcategories: {
              Tools: ["Recommended Tools"]
            }
          }
        }
      },
      properties: import_Description.mainProperties
    };
  }
  async execute() {
    const items = this.getInputData();
    const nodeVersion = this.getNode().typeVersion;
    const fullResponseProperties = ["body", "headers", "statusCode", "statusMessage"];
    let authentication;
    try {
      authentication = this.getNodeParameter("authentication", 0);
    } catch {
    }
    let httpBasicAuth;
    let httpBearerAuth;
    let httpDigestAuth;
    let httpHeaderAuth;
    let httpQueryAuth;
    let httpCustomAuth;
    let oAuth1Api;
    let oAuth2Api;
    let sslCertificates;
    let nodeCredentialType;
    let genericCredentialType;
    let requestOptions = {
      uri: ""
    };
    let returnItems = [];
    const errorItems = {};
    const requestPromises = [];
    let fullResponse = false;
    let autoDetectResponseFormat = false;
    const pagination = this.getNodeParameter("options.pagination.pagination", 0, null, {
      rawExpressions: true
    });
    const requests = [];
    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      try {
        if (authentication === "genericCredentialType") {
          genericCredentialType = this.getNodeParameter("genericAuthType", 0);
          if (genericCredentialType === "httpBasicAuth") {
            httpBasicAuth = await this.getCredentials("httpBasicAuth", itemIndex);
          } else if (genericCredentialType === "httpBearerAuth") {
            httpBearerAuth = await this.getCredentials("httpBearerAuth", itemIndex);
          } else if (genericCredentialType === "httpDigestAuth") {
            httpDigestAuth = await this.getCredentials("httpDigestAuth", itemIndex);
          } else if (genericCredentialType === "httpHeaderAuth") {
            httpHeaderAuth = await this.getCredentials("httpHeaderAuth", itemIndex);
          } else if (genericCredentialType === "httpQueryAuth") {
            httpQueryAuth = await this.getCredentials("httpQueryAuth", itemIndex);
          } else if (genericCredentialType === "httpCustomAuth") {
            httpCustomAuth = await this.getCredentials("httpCustomAuth", itemIndex);
          } else if (genericCredentialType === "oAuth1Api") {
            oAuth1Api = await this.getCredentials("oAuth1Api", itemIndex);
          } else if (genericCredentialType === "oAuth2Api") {
            oAuth2Api = await this.getCredentials("oAuth2Api", itemIndex);
          }
        } else if (authentication === "predefinedCredentialType") {
          nodeCredentialType = this.getNodeParameter("nodeCredentialType", itemIndex);
        }
        const provideSslCertificates = this.getNodeParameter(
          "provideSslCertificates",
          itemIndex,
          false
        );
        if (provideSslCertificates) {
          sslCertificates = await this.getCredentials("httpSslAuth", itemIndex);
        }
        const requestMethod = this.getNodeParameter("method", itemIndex);
        const sendQuery = this.getNodeParameter("sendQuery", itemIndex, false);
        const queryParameters = this.getNodeParameter(
          "queryParameters.parameters",
          itemIndex,
          []
        );
        const specifyQuery = this.getNodeParameter("specifyQuery", itemIndex, "keypair");
        const jsonQueryParameter = this.getNodeParameter("jsonQuery", itemIndex, "");
        const sendBody = this.getNodeParameter("sendBody", itemIndex, false);
        const bodyContentType = this.getNodeParameter("contentType", itemIndex, "");
        const specifyBody = this.getNodeParameter("specifyBody", itemIndex, "");
        const bodyParameters = this.getNodeParameter(
          "bodyParameters.parameters",
          itemIndex,
          []
        );
        const jsonBodyParameter = this.getNodeParameter("jsonBody", itemIndex, "");
        const body = this.getNodeParameter("body", itemIndex, "");
        const sendHeaders = this.getNodeParameter("sendHeaders", itemIndex, false);
        const headerParameters = this.getNodeParameter(
          "headerParameters.parameters",
          itemIndex,
          []
        );
        const specifyHeaders = this.getNodeParameter(
          "specifyHeaders",
          itemIndex,
          "keypair"
        );
        const jsonHeadersParameter = this.getNodeParameter("jsonHeaders", itemIndex, "");
        const {
          redirect,
          batching,
          proxy,
          timeout,
          allowUnauthorizedCerts,
          queryParameterArrays,
          response,
          lowercaseHeaders
        } = this.getNodeParameter("options", itemIndex, {});
        const url = this.getNodeParameter("url", itemIndex);
        const responseFormat = response?.response?.responseFormat || "autodetect";
        fullResponse = response?.response?.fullResponse || false;
        autoDetectResponseFormat = responseFormat === "autodetect";
        const batchSize = batching?.batch?.batchSize > 0 ? batching?.batch?.batchSize : 1;
        const batchInterval = batching?.batch.batchInterval;
        if (itemIndex > 0 && batchSize >= 0 && batchInterval > 0) {
          if (itemIndex % batchSize === 0) {
            await (0, import_n8n_workflow.sleep)(batchInterval);
          }
        }
        requestOptions = {
          headers: {},
          method: requestMethod,
          uri: url,
          gzip: true,
          rejectUnauthorized: !allowUnauthorizedCerts || false,
          followRedirect: false,
          resolveWithFullResponse: true
        };
        if (requestOptions.method !== "GET" && nodeVersion >= 4.1) {
          requestOptions = { ...requestOptions, followAllRedirects: false };
        }
        const defaultRedirect = nodeVersion >= 4 && redirect === void 0;
        if (redirect?.redirect?.followRedirects || defaultRedirect) {
          requestOptions.followRedirect = true;
          requestOptions.followAllRedirects = true;
        }
        if (redirect?.redirect?.maxRedirects || defaultRedirect) {
          requestOptions.maxRedirects = redirect?.redirect?.maxRedirects;
        }
        if (response?.response?.neverError) {
          requestOptions.simple = false;
        }
        if (proxy) {
          requestOptions.proxy = proxy;
        }
        if (timeout) {
          requestOptions.timeout = timeout;
        } else {
          requestOptions.timeout = 3e5;
        }
        if (sendQuery && queryParameterArrays) {
          Object.assign(requestOptions, {
            qsStringifyOptions: { arrayFormat: queryParameterArrays }
          });
        }
        const parametersToKeyValue = async (accumulator, cur) => {
          if (cur.parameterType === "formBinaryData") {
            if (!cur.inputDataFieldName) return accumulator;
            const binaryData = this.helpers.assertBinaryData(itemIndex, cur.inputDataFieldName);
            let uploadData;
            const itemBinaryData = items[itemIndex].binary[cur.inputDataFieldName];
            if (itemBinaryData.id) {
              uploadData = await this.helpers.getBinaryStream(itemBinaryData.id);
            } else {
              uploadData = Buffer.from(itemBinaryData.data, import_n8n_workflow.BINARY_ENCODING);
            }
            accumulator[cur.name] = {
              value: uploadData,
              options: {
                filename: binaryData.fileName,
                contentType: binaryData.mimeType
              }
            };
            return accumulator;
          }
          accumulator[cur.name] = cur.value;
          return accumulator;
        };
        if (sendBody && bodyParameters) {
          if (specifyBody === "keypair" || bodyContentType === "multipart-form-data") {
            requestOptions.body = await (0, import_GenericFunctions.prepareRequestBody)(
              bodyParameters,
              bodyContentType,
              nodeVersion,
              parametersToKeyValue
            );
          } else if (specifyBody === "json") {
            if (typeof jsonBodyParameter !== "object" && jsonBodyParameter !== null) {
              try {
                JSON.parse(jsonBodyParameter);
              } catch {
                throw new import_n8n_workflow.NodeOperationError(
                  this.getNode(),
                  "JSON parameter needs to be valid JSON",
                  {
                    itemIndex
                  }
                );
              }
              requestOptions.body = (0, import_n8n_workflow.jsonParse)(jsonBodyParameter);
            } else {
              requestOptions.body = jsonBodyParameter;
            }
          } else if (specifyBody === "string") {
            requestOptions.body = Object.fromEntries(new URLSearchParams(body));
          }
        }
        if (sendBody && ["PATCH", "POST", "PUT", "GET"].includes(requestMethod)) {
          if (bodyContentType === "multipart-form-data") {
            requestOptions.formData = requestOptions.body;
            delete requestOptions.body;
          } else if (bodyContentType === "form-urlencoded") {
            requestOptions.form = requestOptions.body;
            delete requestOptions.body;
          } else if (bodyContentType === "binaryData") {
            const inputDataFieldName = this.getNodeParameter(
              "inputDataFieldName",
              itemIndex
            );
            let uploadData;
            let contentLength;
            const itemBinaryData = this.helpers.assertBinaryData(itemIndex, inputDataFieldName);
            if (itemBinaryData.id) {
              uploadData = await this.helpers.getBinaryStream(itemBinaryData.id);
              const metadata = await this.helpers.getBinaryMetadata(itemBinaryData.id);
              contentLength = metadata.fileSize;
            } else {
              uploadData = Buffer.from(itemBinaryData.data, import_n8n_workflow.BINARY_ENCODING);
              contentLength = uploadData.length;
            }
            requestOptions.body = uploadData;
            requestOptions.headers = {
              ...requestOptions.headers,
              "content-length": contentLength,
              "content-type": itemBinaryData.mimeType ?? "application/octet-stream"
            };
          } else if (bodyContentType === "raw") {
            requestOptions.body = body;
          }
        }
        if (sendQuery && queryParameters) {
          if (specifyQuery === "keypair") {
            requestOptions.qs = await (0, import_GenericFunctions.reduceAsync)(queryParameters, parametersToKeyValue);
          } else if (specifyQuery === "json") {
            try {
              JSON.parse(jsonQueryParameter);
            } catch {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                "JSON parameter needs to be valid JSON",
                {
                  itemIndex
                }
              );
            }
            requestOptions.qs = (0, import_n8n_workflow.jsonParse)(jsonQueryParameter);
          }
        }
        if (sendHeaders && headerParameters) {
          let additionalHeaders = {};
          if (specifyHeaders === "keypair") {
            additionalHeaders = await (0, import_GenericFunctions.reduceAsync)(
              headerParameters.filter((header) => header.name),
              parametersToKeyValue
            );
          } else if (specifyHeaders === "json") {
            try {
              JSON.parse(jsonHeadersParameter);
            } catch {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                "JSON parameter needs to be valid JSON",
                {
                  itemIndex
                }
              );
            }
            additionalHeaders = (0, import_n8n_workflow.jsonParse)(jsonHeadersParameter);
          }
          requestOptions.headers = {
            ...requestOptions.headers,
            ...lowercaseHeaders === void 0 || lowercaseHeaders ? (0, import_utilities.keysToLowercase)(additionalHeaders) : additionalHeaders
          };
        }
        if (autoDetectResponseFormat || responseFormat === "file") {
          requestOptions.encoding = null;
          requestOptions.json = false;
          requestOptions.useStream = true;
        } else if (bodyContentType === "raw") {
          requestOptions.json = false;
          requestOptions.useStream = true;
        } else {
          requestOptions.json = true;
        }
        if (bodyContentType === "raw") {
          if (requestOptions.headers === void 0) {
            requestOptions.headers = {};
          }
          const rawContentType = this.getNodeParameter("rawContentType", itemIndex);
          requestOptions.headers["content-type"] = rawContentType;
        }
        const authDataKeys = {};
        (0, import_GenericFunctions.setAgentOptions)(requestOptions, sslCertificates);
        if (requestOptions.agentOptions) {
          authDataKeys.agentOptions = Object.keys(requestOptions.agentOptions);
        }
        if (httpBasicAuth !== void 0) {
          requestOptions.auth = {
            user: httpBasicAuth.user,
            pass: httpBasicAuth.password
          };
          authDataKeys.auth = ["pass"];
        }
        if (httpBearerAuth !== void 0) {
          requestOptions.headers = requestOptions.headers ?? {};
          requestOptions.headers.Authorization = `Bearer ${String(httpBearerAuth.token)}`;
          authDataKeys.headers = ["Authorization"];
        }
        if (httpHeaderAuth !== void 0) {
          requestOptions.headers[httpHeaderAuth.name] = httpHeaderAuth.value;
          authDataKeys.headers = [httpHeaderAuth.name];
        }
        if (httpQueryAuth !== void 0) {
          if (!requestOptions.qs) {
            requestOptions.qs = {};
          }
          requestOptions.qs[httpQueryAuth.name] = httpQueryAuth.value;
          authDataKeys.qs = [httpQueryAuth.name];
        }
        if (httpDigestAuth !== void 0) {
          requestOptions.auth = {
            user: httpDigestAuth.user,
            pass: httpDigestAuth.password,
            sendImmediately: false
          };
          authDataKeys.auth = ["pass"];
        }
        if (httpCustomAuth !== void 0) {
          const customAuth = (0, import_n8n_workflow.jsonParse)(
            httpCustomAuth.json || "{}",
            { errorMessage: "Invalid Custom Auth JSON" }
          );
          if (customAuth.headers) {
            requestOptions.headers = { ...requestOptions.headers, ...customAuth.headers };
            authDataKeys.headers = Object.keys(customAuth.headers);
          }
          if (customAuth.body) {
            requestOptions.body = { ...requestOptions.body, ...customAuth.body };
            authDataKeys.body = Object.keys(customAuth.body);
          }
          if (customAuth.qs) {
            requestOptions.qs = { ...requestOptions.qs, ...customAuth.qs };
            authDataKeys.qs = Object.keys(customAuth.qs);
          }
        }
        if (requestOptions.headers.accept === void 0) {
          if (responseFormat === "json") {
            requestOptions.headers.accept = "application/json,text/*;q=0.99";
          } else if (responseFormat === "text") {
            requestOptions.headers.accept = "application/json,text/html,application/xhtml+xml,application/xml,text/*;q=0.9, */*;q=0.1";
          } else {
            requestOptions.headers.accept = "application/json,text/html,application/xhtml+xml,application/xml,text/*;q=0.9, image/*;q=0.8, */*;q=0.7";
          }
        }
        requests.push({
          options: requestOptions,
          authKeys: authDataKeys,
          credentialType: nodeCredentialType
        });
        if (pagination && pagination.paginationMode !== "off") {
          let continueExpression = "={{false}}";
          if (pagination.paginationCompleteWhen === "receiveSpecificStatusCodes") {
            const statusCodesWhenCompleted = pagination.statusCodesWhenComplete.split(",").map((item) => parseInt(item.trim()));
            continueExpression = `={{ !${JSON.stringify(
              statusCodesWhenCompleted
            )}.includes($response.statusCode) }}`;
          } else if (pagination.paginationCompleteWhen === "responseIsEmpty") {
            continueExpression = "={{ Array.isArray($response.body) ? $response.body.length : !!$response.body }}";
          } else {
            if (!pagination.completeExpression.length || pagination.completeExpression[0] !== "=") {
              throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Invalid or empty Complete Expression");
            }
            continueExpression = `={{ !(${pagination.completeExpression.trim().slice(3, -2)}) }}`;
          }
          const paginationData = {
            continue: continueExpression,
            request: {},
            requestInterval: pagination.requestInterval
          };
          if (pagination.paginationMode === "updateAParameterInEachRequest") {
            paginationData.request = {};
            const { parameters } = pagination.parameters;
            if (parameters.length === 1 && parameters[0].name === "" && parameters[0].value === "") {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                "At least one entry with 'Name' and 'Value' filled must be included in 'Parameters' to use 'Update a Parameter in Each Request' mode "
              );
            }
            pagination.parameters.parameters.forEach((parameter, index) => {
              if (!paginationData.request[parameter.type]) {
                paginationData.request[parameter.type] = {};
              }
              const parameterName = parameter.name;
              if (parameterName === "") {
                throw new import_n8n_workflow.NodeOperationError(
                  this.getNode(),
                  `Parameter name must be set for parameter [${index + 1}] in pagination settings`
                );
              }
              const parameterValue = parameter.value;
              if (parameterValue === "") {
                throw new import_n8n_workflow.NodeOperationError(
                  this.getNode(),
                  `Some value must be provided for parameter [${index + 1}] in pagination settings, omitting it will result in an infinite loop`
                );
              }
              paginationData.request[parameter.type][parameterName] = parameterValue;
            });
          } else if (pagination.paginationMode === "responseContainsNextURL") {
            paginationData.request.url = pagination.nextURL;
          }
          if (pagination.limitPagesFetched) {
            paginationData.maxRequests = pagination.maxRequests;
          }
          if (responseFormat === "file") {
            paginationData.binaryResult = true;
          }
          const requestPromise = this.helpers.requestWithAuthenticationPaginated.call(
            this,
            requestOptions,
            itemIndex,
            paginationData,
            nodeCredentialType ?? genericCredentialType
          ).catch((error) => {
            if (error instanceof import_n8n_workflow.NodeOperationError && error.type === "invalid_url") {
              const urlParameterName = pagination.paginationMode === "responseContainsNextURL" ? "Next URL" : "URL";
              throw new import_n8n_workflow.NodeOperationError(this.getNode(), error.message, {
                description: `Make sure the "${urlParameterName}" parameter evaluates to a valid URL.`
              });
            }
            throw error;
          });
          requestPromises.push(requestPromise);
        } else if (authentication === "genericCredentialType" || authentication === "none") {
          if (oAuth1Api) {
            const requestOAuth1 = this.helpers.requestOAuth1.call(
              this,
              "oAuth1Api",
              requestOptions
            );
            requestOAuth1.catch(() => {
            });
            requestPromises.push(requestOAuth1);
          } else if (oAuth2Api) {
            const requestOAuth2 = this.helpers.requestOAuth2.call(
              this,
              "oAuth2Api",
              requestOptions,
              {
                tokenType: "Bearer"
              }
            );
            requestOAuth2.catch(() => {
            });
            requestPromises.push(requestOAuth2);
          } else {
            const request = this.helpers.request(requestOptions);
            request.catch(() => {
            });
            requestPromises.push(request);
          }
        } else if (authentication === "predefinedCredentialType" && nodeCredentialType) {
          const additionalOAuth2Options = (0, import_GenericFunctions.getOAuth2AdditionalParameters)(nodeCredentialType);
          const requestWithAuthentication = this.helpers.requestWithAuthentication.call(
            this,
            nodeCredentialType,
            requestOptions,
            additionalOAuth2Options && { oauth2: additionalOAuth2Options },
            itemIndex
          );
          requestWithAuthentication.catch(() => {
          });
          requestPromises.push(requestWithAuthentication);
        }
      } catch (error) {
        if (!this.continueOnFail()) throw error;
        requestPromises.push(Promise.reject(error).catch(() => {
        }));
        errorItems[itemIndex] = error.message;
        continue;
      }
    }
    const sanitizedRequests = [];
    const promisesResponses = await Promise.allSettled(
      requestPromises.map(
        async (requestPromise, itemIndex) => await requestPromise.then((response) => response).finally(async () => {
          if (errorItems[itemIndex]) return;
          try {
            const { options, authKeys, credentialType } = requests[itemIndex];
            let secrets = [];
            if (credentialType) {
              const properties = this.getCredentialsProperties(credentialType);
              const credentials = await this.getCredentials(credentialType, itemIndex);
              secrets = (0, import_GenericFunctions.getSecrets)(properties, credentials);
            }
            const sanitizedRequestOptions = (0, import_GenericFunctions.sanitizeUiMessage)(options, authKeys, secrets);
            sanitizedRequests.push(sanitizedRequestOptions);
            this.sendMessageToUI(sanitizedRequestOptions);
          } catch (e) {
          }
        })
      )
    );
    let responseData;
    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      responseData = promisesResponses.shift();
      if (errorItems[itemIndex]) {
        returnItems.push({
          json: { error: errorItems[itemIndex] },
          pairedItem: { item: itemIndex }
        });
        continue;
      }
      if (responseData.status !== "fulfilled") {
        if (responseData.reason.statusCode === 429) {
          responseData.reason.message = "Try spacing your requests out using the batching settings under 'Options'";
        }
        if (!this.continueOnFail()) {
          if (autoDetectResponseFormat && responseData.reason.error instanceof Buffer) {
            responseData.reason.error = Buffer.from(responseData.reason.error).toString();
          }
          let error;
          if (responseData?.reason instanceof import_n8n_workflow.NodeApiError) {
            error = responseData.reason;
            (0, import_set.default)(error, "context.itemIndex", itemIndex);
          } else {
            const errorData = responseData.reason ? responseData.reason : responseData;
            error = new import_n8n_workflow.NodeApiError(this.getNode(), errorData, { itemIndex });
          }
          (0, import_set.default)(error, "context.request", sanitizedRequests[itemIndex]);
          throw error;
        } else {
          (0, import_n8n_workflow.removeCircularRefs)(responseData.reason);
          returnItems.push({
            json: {
              error: responseData.reason
            },
            pairedItem: {
              item: itemIndex
            }
          });
          continue;
        }
      }
      let responses;
      if (Array.isArray(responseData.value)) {
        responses = responseData.value;
      } else {
        responses = [responseData.value];
      }
      let responseFormat = this.getNodeParameter(
        "options.response.response.responseFormat",
        0,
        "autodetect"
      );
      fullResponse = this.getNodeParameter(
        "options.response.response.fullResponse",
        0,
        false
      );
      for (let [index, response] of Object.entries(responses)) {
        if (response?.request?.constructor.name === "ClientRequest") delete response.request;
        if (this.getMode() === "manual" && index === "0") {
          const nodeContext = this.getContext("node");
          if (pagination && pagination.paginationMode !== "off") {
            nodeContext.response = responseData.value[0];
          } else {
            nodeContext.response = responseData.value;
          }
        }
        const responseContentType = response.headers["content-type"] ?? "";
        if (autoDetectResponseFormat) {
          if (responseContentType.includes("application/json")) {
            responseFormat = "json";
            if (!response.__bodyResolved) {
              const neverError = this.getNodeParameter(
                "options.response.response.neverError",
                0,
                false
              );
              const data = await this.helpers.binaryToString(response.body);
              response.body = (0, import_n8n_workflow.jsonParse)(data, {
                ...neverError ? { fallbackValue: {} } : { errorMessage: "Invalid JSON in response body" }
              });
            }
          } else if (import_GenericFunctions.binaryContentTypes.some((e) => responseContentType.includes(e))) {
            responseFormat = "file";
          } else {
            responseFormat = "text";
            if (!response.__bodyResolved) {
              const data = await this.helpers.binaryToString(response.body);
              response.body = !data ? void 0 : data;
            }
          }
        }
        const optimizeResponse = (0, import_optimizeResponse.configureResponseOptimizer)(this, itemIndex);
        if (autoDetectResponseFormat && !fullResponse) {
          delete response.headers;
          delete response.statusCode;
          delete response.statusMessage;
        }
        if (!fullResponse) {
          response = optimizeResponse(response.body);
        } else {
          response.body = optimizeResponse(response.body);
        }
        if (responseFormat === "file") {
          const outputPropertyName = this.getNodeParameter(
            "options.response.response.outputPropertyName",
            0,
            "data"
          );
          const newItem = {
            json: {},
            binary: {},
            pairedItem: {
              item: itemIndex
            }
          };
          if (items[itemIndex].binary !== void 0) {
            Object.assign(newItem.binary, items[itemIndex].binary);
          }
          let binaryData;
          if (fullResponse) {
            const returnItem = {};
            for (const property of fullResponseProperties) {
              if (property === "body") {
                continue;
              }
              returnItem[property] = response[property];
            }
            newItem.json = returnItem;
            binaryData = response?.body;
          } else {
            newItem.json = items[itemIndex].json;
            binaryData = response;
          }
          const preparedBinaryData = await this.helpers.prepareBinaryData(
            binaryData,
            void 0,
            responseContentType || void 0
          );
          if (!preparedBinaryData.fileName && preparedBinaryData.fileExtension && typeof requestOptions.uri === "string" && requestOptions.uri.endsWith(preparedBinaryData.fileExtension)) {
            preparedBinaryData.fileName = requestOptions.uri.split("/").pop();
          }
          newItem.binary[outputPropertyName] = preparedBinaryData;
          returnItems.push(newItem);
        } else if (responseFormat === "text") {
          const outputPropertyName = this.getNodeParameter(
            "options.response.response.outputPropertyName",
            0,
            "data"
          );
          if (fullResponse) {
            const returnItem = {};
            for (const property of fullResponseProperties) {
              if (property === "body") {
                returnItem[outputPropertyName] = toText(response[property]);
                continue;
              }
              returnItem[property] = response[property];
            }
            returnItems.push({
              json: returnItem,
              pairedItem: {
                item: itemIndex
              }
            });
          } else {
            returnItems.push({
              json: {
                [outputPropertyName]: toText(response)
              },
              pairedItem: {
                item: itemIndex
              }
            });
          }
        } else {
          if (fullResponse) {
            const returnItem = {};
            for (const property of fullResponseProperties) {
              returnItem[property] = response[property];
            }
            if (responseFormat === "json" && typeof returnItem.body === "string") {
              try {
                returnItem.body = JSON.parse(returnItem.body);
              } catch (error) {
                throw new import_n8n_workflow.NodeOperationError(
                  this.getNode(),
                  'Response body is not valid JSON. Change "Response Format" to "Text"',
                  { itemIndex }
                );
              }
            }
            returnItems.push({
              json: returnItem,
              pairedItem: {
                item: itemIndex
              }
            });
          } else {
            if (responseFormat === "json" && typeof response === "string") {
              try {
                if (typeof response !== "object") {
                  response = JSON.parse(response);
                }
              } catch (error) {
                throw new import_n8n_workflow.NodeOperationError(
                  this.getNode(),
                  'Response body is not valid JSON. Change "Response Format" to "Text"',
                  { itemIndex }
                );
              }
            }
            if (Array.isArray(response)) {
              response.forEach(
                (item) => returnItems.push({
                  json: item,
                  pairedItem: {
                    item: itemIndex
                  }
                })
              );
            } else {
              returnItems.push({
                json: response,
                pairedItem: {
                  item: itemIndex
                }
              });
            }
          }
        }
      }
    }
    returnItems = returnItems.map(import_GenericFunctions.replaceNullValues);
    if (returnItems.length === 1 && returnItems[0].json.data && Array.isArray(returnItems[0].json.data)) {
      const message = "To split the contents of \u2018data\u2019 into separate items for easier processing, add a \u2018Split Out\u2019 node after this one";
      if (this.addExecutionHints) {
        this.addExecutionHints({
          message,
          location: "outputPane"
        });
      } else {
        this.logger.info(message);
      }
    }
    return [returnItems];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HttpRequestV3
});
//# sourceMappingURL=HttpRequestV3.node.js.map
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
var GraphQL_node_exports = {};
__export(GraphQL_node_exports, {
  GraphQL: () => GraphQL
});
module.exports = __toCommonJS(GraphQL_node_exports);
var import_n8n_workflow = require("n8n-workflow");
class GraphQL {
  constructor() {
    this.description = {
      displayName: "GraphQL",
      name: "graphql",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:graphql.png",
      group: ["input"],
      version: [1, 1.1],
      description: "Makes a GraphQL request and returns the received data",
      defaults: {
        name: "GraphQL"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "httpBasicAuth",
          required: true,
          displayOptions: {
            show: {
              authentication: ["basicAuth"]
            }
          }
        },
        {
          name: "httpCustomAuth",
          required: true,
          displayOptions: {
            show: {
              authentication: ["customAuth"]
            }
          }
        },
        {
          name: "httpDigestAuth",
          required: true,
          displayOptions: {
            show: {
              authentication: ["digestAuth"]
            }
          }
        },
        {
          name: "httpHeaderAuth",
          required: true,
          displayOptions: {
            show: {
              authentication: ["headerAuth"]
            }
          }
        },
        {
          name: "httpQueryAuth",
          required: true,
          displayOptions: {
            show: {
              authentication: ["queryAuth"]
            }
          }
        },
        {
          name: "oAuth1Api",
          required: true,
          displayOptions: {
            show: {
              authentication: ["oAuth1"]
            }
          }
        },
        {
          name: "oAuth2Api",
          required: true,
          displayOptions: {
            show: {
              authentication: ["oAuth2"]
            }
          }
        }
      ],
      properties: [
        {
          displayName: "Authentication",
          name: "authentication",
          type: "options",
          options: [
            {
              name: "Basic Auth",
              value: "basicAuth"
            },
            {
              name: "Custom Auth",
              value: "customAuth"
            },
            {
              name: "Digest Auth",
              value: "digestAuth"
            },
            {
              name: "Header Auth",
              value: "headerAuth"
            },
            {
              name: "None",
              value: "none"
            },
            {
              name: "OAuth1",
              value: "oAuth1"
            },
            {
              name: "OAuth2",
              value: "oAuth2"
            },
            {
              name: "Query Auth",
              value: "queryAuth"
            }
          ],
          default: "none",
          description: "The way to authenticate"
        },
        {
          displayName: "HTTP Request Method",
          name: "requestMethod",
          type: "options",
          options: [
            {
              name: "GET",
              value: "GET"
            },
            {
              name: "POST",
              value: "POST"
            }
          ],
          default: "POST",
          description: "The underlying HTTP request method to use"
        },
        {
          displayName: "Endpoint",
          name: "endpoint",
          type: "string",
          default: "",
          placeholder: "http://example.com/graphql",
          description: "The GraphQL endpoint",
          required: true
        },
        {
          displayName: "Ignore SSL Issues (Insecure)",
          name: "allowUnauthorizedCerts",
          type: "boolean",
          default: false,
          // eslint-disable-next-line n8n-nodes-base/node-param-description-wrong-for-ignore-ssl-issues
          description: "Whether to download the response even if SSL certificate validation is not possible"
        },
        {
          displayName: "Request Format",
          name: "requestFormat",
          type: "options",
          required: true,
          options: [
            {
              name: "GraphQL (Raw)",
              value: "graphql"
            },
            {
              name: "JSON",
              value: "json"
            }
          ],
          displayOptions: {
            show: {
              requestMethod: ["POST"],
              "@version": [1]
            }
          },
          default: "graphql",
          description: "The format for the query payload"
        },
        {
          displayName: "Request Format",
          name: "requestFormat",
          type: "options",
          required: true,
          options: [
            {
              name: "JSON (Recommended)",
              value: "json",
              description: "JSON object with query, variables, and operationName properties. The standard and most widely supported format for GraphQL requests."
            },
            {
              name: "GraphQL (Raw)",
              value: "graphql",
              description: "Raw GraphQL query string. Not all servers support this format. Use JSON for better compatibility."
            }
          ],
          displayOptions: {
            show: {
              requestMethod: ["POST"],
              "@version": [{ _cnd: { gte: 1.1 } }]
            }
          },
          default: "json",
          description: "The request format for the query payload"
        },
        {
          displayName: "Query",
          name: "query",
          type: "string",
          default: "",
          description: "GraphQL query",
          required: true,
          typeOptions: {
            rows: 6
          }
        },
        {
          displayName: "Variables",
          name: "variables",
          type: "json",
          default: "",
          description: "Query variables as JSON object",
          displayOptions: {
            show: {
              requestFormat: ["json"],
              requestMethod: ["POST"]
            }
          }
        },
        {
          displayName: "Operation Name",
          name: "operationName",
          type: "string",
          default: "",
          description: "Name of operation to execute",
          displayOptions: {
            show: {
              requestFormat: ["json"],
              requestMethod: ["POST"]
            }
          }
        },
        {
          displayName: "Response Format",
          name: "responseFormat",
          type: "options",
          options: [
            {
              name: "JSON",
              value: "json"
            },
            {
              name: "String",
              value: "string"
            }
          ],
          default: "json",
          description: "The format in which the data gets returned from the URL"
        },
        {
          displayName: "Response Data Property Name",
          name: "dataPropertyName",
          type: "string",
          default: "data",
          required: true,
          displayOptions: {
            show: {
              responseFormat: ["string"]
            }
          },
          description: "Name of the property to which to write the response data"
        },
        // Header Parameters
        {
          displayName: "Headers",
          name: "headerParametersUi",
          placeholder: "Add Header",
          type: "fixedCollection",
          typeOptions: {
            multipleValues: true
          },
          description: "The headers to send",
          default: {},
          options: [
            {
              name: "parameter",
              displayName: "Header",
              values: [
                {
                  displayName: "Name",
                  name: "name",
                  type: "string",
                  default: "",
                  description: "Name of the header"
                },
                {
                  displayName: "Value",
                  name: "value",
                  type: "string",
                  default: "",
                  description: "Value to set for the header"
                }
              ]
            }
          ]
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    let httpBasicAuth;
    let httpDigestAuth;
    let httpCustomAuth;
    let httpHeaderAuth;
    let httpQueryAuth;
    let oAuth1Api;
    let oAuth2Api;
    try {
      httpBasicAuth = await this.getCredentials("httpBasicAuth");
    } catch (error) {
    }
    try {
      httpCustomAuth = await this.getCredentials("httpCustomAuth");
    } catch (error) {
    }
    try {
      httpDigestAuth = await this.getCredentials("httpDigestAuth");
    } catch (error) {
    }
    try {
      httpHeaderAuth = await this.getCredentials("httpHeaderAuth");
    } catch (error) {
    }
    try {
      httpQueryAuth = await this.getCredentials("httpQueryAuth");
    } catch (error) {
    }
    try {
      oAuth1Api = await this.getCredentials("oAuth1Api");
    } catch (error) {
    }
    try {
      oAuth2Api = await this.getCredentials("oAuth2Api");
    } catch (error) {
    }
    let requestOptions;
    const returnItems = [];
    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      try {
        const requestMethod = this.getNodeParameter(
          "requestMethod",
          itemIndex,
          "POST"
        );
        const endpoint = this.getNodeParameter("endpoint", itemIndex, "");
        const requestFormat = this.getNodeParameter("requestFormat", itemIndex, "json");
        const responseFormat = this.getNodeParameter("responseFormat", 0);
        const { parameter } = this.getNodeParameter("headerParametersUi", itemIndex, {});
        const headerParameters = (parameter || []).reduce(
          (result, item) => ({
            ...result,
            [item.name]: item.value
          }),
          {}
        );
        requestOptions = {
          headers: {
            "content-type": `application/${requestFormat}`,
            ...headerParameters
          },
          method: requestMethod,
          uri: endpoint,
          simple: false,
          rejectUnauthorized: !this.getNodeParameter("allowUnauthorizedCerts", itemIndex, false)
        };
        if (httpBasicAuth !== void 0) {
          requestOptions.auth = {
            user: httpBasicAuth.user,
            pass: httpBasicAuth.password
          };
        }
        if (httpCustomAuth !== void 0) {
          const customAuth = (0, import_n8n_workflow.jsonParse)(
            httpCustomAuth.json || "{}",
            { errorMessage: "Invalid Custom Auth JSON" }
          );
          if (customAuth.headers) {
            requestOptions.headers = { ...requestOptions.headers, ...customAuth.headers };
          }
          if (customAuth.body) {
            requestOptions.body = { ...requestOptions.body, ...customAuth.body };
          }
          if (customAuth.qs) {
            requestOptions.qs = { ...requestOptions.qs, ...customAuth.qs };
          }
        }
        if (httpHeaderAuth !== void 0) {
          requestOptions.headers[httpHeaderAuth.name] = httpHeaderAuth.value;
        }
        if (httpQueryAuth !== void 0) {
          if (!requestOptions.qs) {
            requestOptions.qs = {};
          }
          requestOptions.qs[httpQueryAuth.name] = httpQueryAuth.value;
        }
        if (httpDigestAuth !== void 0) {
          requestOptions.auth = {
            user: httpDigestAuth.user,
            pass: httpDigestAuth.password,
            sendImmediately: false
          };
        }
        const gqlQuery = this.getNodeParameter("query", itemIndex, "");
        if (requestMethod === "GET") {
          requestOptions.qs = requestOptions.qs ?? {};
          requestOptions.qs.query = gqlQuery;
        }
        if (requestFormat === "json") {
          const variables = this.getNodeParameter("variables", itemIndex, {});
          let parsedVariables;
          if (typeof variables === "string") {
            try {
              parsedVariables = JSON.parse(variables || "{}");
            } catch (error) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                `Using variables failed:
${variables}

With error message:
${error}`,
                { itemIndex }
              );
            }
          } else if (typeof variables === "object" && variables !== null) {
            parsedVariables = variables;
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `Using variables failed:
${variables}

GraphQL variables should be either an object or a string.`,
              { itemIndex }
            );
          }
          const jsonBody = {
            ...requestOptions.body,
            query: gqlQuery,
            variables: parsedVariables,
            operationName: this.getNodeParameter("operationName", itemIndex, "")
          };
          if (jsonBody.operationName === "") {
            jsonBody.operationName = null;
          }
          requestOptions.json = true;
          requestOptions.body = jsonBody;
        } else {
          requestOptions.body = gqlQuery;
        }
        let response;
        if (oAuth1Api !== void 0) {
          response = await this.helpers.requestOAuth1.call(this, "oAuth1Api", requestOptions);
        } else if (oAuth2Api !== void 0) {
          response = await this.helpers.requestOAuth2.call(this, "oAuth2Api", requestOptions, {
            tokenType: "Bearer"
          });
        } else {
          response = await this.helpers.request(requestOptions);
        }
        if (responseFormat === "string") {
          const dataPropertyName = this.getNodeParameter("dataPropertyName", 0);
          returnItems.push({
            json: {
              [dataPropertyName]: response
            }
          });
        } else {
          if (typeof response === "string") {
            try {
              response = JSON.parse(response);
            } catch (error) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                'Response body is not valid JSON. Change "Response Format" to "String"',
                { itemIndex }
              );
            }
          }
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(response),
            { itemData: { item: itemIndex } }
          );
          returnItems.push(...executionData);
        }
        if (typeof response === "string" && response.startsWith('{"errors":')) {
          try {
            const errorResponse = JSON.parse(response);
            if (Array.isArray(errorResponse.errors)) {
              response = errorResponse;
            }
          } catch (e) {
          }
        }
        if (typeof response === "object" && response.errors) {
          const message = response.errors?.map((error) => error.message).join(", ") || "Unexpected error";
          throw new import_n8n_workflow.NodeApiError(this.getNode(), response.errors, { message });
        }
      } catch (error) {
        if (!this.continueOnFail()) {
          throw error;
        }
        const errorData = this.helpers.returnJsonArray({
          error: error.message
        });
        const exectionErrorWithMetaData = this.helpers.constructExecutionMetaData(errorData, {
          itemData: { item: itemIndex }
        });
        returnItems.push(...exectionErrorWithMetaData);
      }
    }
    return [returnItems];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GraphQL
});
//# sourceMappingURL=GraphQL.node.js.map
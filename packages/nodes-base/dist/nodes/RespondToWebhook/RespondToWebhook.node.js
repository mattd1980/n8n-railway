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
var RespondToWebhook_node_exports = {};
__export(RespondToWebhook_node_exports, {
  RespondToWebhook: () => RespondToWebhook
});
module.exports = __toCommonJS(RespondToWebhook_node_exports);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_set = __toESM(require("lodash/set"));
var import_n8n_workflow = require("n8n-workflow");
var import_utils = require("./utils");
var import_utilities = require("../../utils/utilities");
const respondWithProperty = {
  displayName: "Respond With",
  name: "respondWith",
  type: "options",
  options: [
    {
      name: "All Incoming Items",
      value: "allIncomingItems",
      description: "Respond with all input JSON items"
    },
    {
      name: "Binary File",
      value: "binary",
      description: "Respond with incoming file binary data"
    },
    {
      name: "First Incoming Item",
      value: "firstIncomingItem",
      description: "Respond with the first input JSON item"
    },
    {
      name: "JSON",
      value: "json",
      description: "Respond with a custom JSON body"
    },
    {
      name: "JWT Token",
      value: "jwt",
      description: "Respond with a JWT token"
    },
    {
      name: "No Data",
      value: "noData",
      description: "Respond with an empty body"
    },
    {
      name: "Redirect",
      value: "redirect",
      description: "Respond with a redirect to a given URL"
    },
    {
      name: "Text",
      value: "text",
      description: "Respond with a simple text message body"
    }
  ],
  default: "firstIncomingItem",
  description: "The data that should be returned"
};
class RespondToWebhook {
  constructor() {
    this.description = {
      displayName: "Respond to Webhook",
      icon: { light: "file:webhook.svg", dark: "file:webhook.dark.svg" },
      name: "respondToWebhook",
      group: ["transform"],
      version: [1, 1.1, 1.2, 1.3],
      description: "Returns data for Webhook",
      defaults: {
        name: "Respond to Webhook"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: `={{(${import_utils.configuredOutputs})($nodeVersion)}}`,
      credentials: [
        {
          name: "jwtAuth",
          required: true,
          displayOptions: {
            show: {
              respondWith: ["jwt"]
            }
          }
        }
      ],
      properties: [
        {
          displayName: `Verify that the "Webhook" node's "Respond" parameter is set to "Using Respond to Webhook Node". <a href="https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook/" target="_blank">More details`,
          name: "generalNotice",
          type: "notice",
          default: ""
        },
        {
          ...respondWithProperty,
          displayOptions: { show: { "@version": [1, 1.1] } }
        },
        {
          ...respondWithProperty,
          noDataExpression: true,
          displayOptions: { show: { "@version": [{ _cnd: { gte: 1.2 } }] } }
        },
        {
          displayName: "Credentials",
          name: "credentials",
          type: "credentials",
          default: "",
          displayOptions: {
            show: {
              respondWith: ["jwt"]
            }
          }
        },
        {
          displayName: "When using expressions, note that this node will only run for the first item in the input data",
          name: "webhookNotice",
          type: "notice",
          displayOptions: {
            show: {
              respondWith: ["json", "text", "jwt"]
            }
          },
          default: ""
        },
        {
          displayName: "Redirect URL",
          name: "redirectURL",
          type: "string",
          required: true,
          displayOptions: {
            show: {
              respondWith: ["redirect"]
            }
          },
          default: "",
          placeholder: "e.g. http://www.n8n.io",
          description: "The URL to redirect to",
          validateType: "url"
        },
        {
          displayName: "Response Body",
          name: "responseBody",
          type: "json",
          displayOptions: {
            show: {
              respondWith: ["json"]
            }
          },
          default: '{\n  "myField": "value"\n}',
          typeOptions: {
            rows: 4
          },
          description: "The HTTP response JSON data"
        },
        {
          displayName: "Payload",
          name: "payload",
          type: "json",
          displayOptions: {
            show: {
              respondWith: ["jwt"]
            }
          },
          default: '{\n  "myField": "value"\n}',
          typeOptions: {
            rows: 4
          },
          validateType: "object",
          description: "The payload to include in the JWT token"
        },
        {
          displayName: "Response Body",
          name: "responseBody",
          type: "string",
          displayOptions: {
            show: {
              respondWith: ["text"]
            }
          },
          typeOptions: {
            rows: 2
          },
          default: "",
          placeholder: "e.g. Workflow completed",
          description: "The HTTP response text data"
        },
        {
          displayName: "Response Data Source",
          name: "responseDataSource",
          type: "options",
          displayOptions: {
            show: {
              respondWith: ["binary"]
            }
          },
          options: [
            {
              name: "Choose Automatically From Input",
              value: "automatically",
              description: "Use if input data will contain a single piece of binary data"
            },
            {
              name: "Specify Myself",
              value: "set",
              description: "Enter the name of the input field the binary data will be in"
            }
          ],
          default: "automatically"
        },
        {
          displayName: "Input Field Name",
          name: "inputFieldName",
          type: "string",
          required: true,
          default: "data",
          displayOptions: {
            show: {
              respondWith: ["binary"],
              responseDataSource: ["set"]
            }
          },
          description: "The name of the node input field with the binary data"
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add option",
          default: {},
          options: [
            {
              displayName: "Response Code",
              name: "responseCode",
              type: "number",
              typeOptions: {
                minValue: 100,
                maxValue: 599
              },
              default: 200,
              description: "The HTTP response code to return. Defaults to 200."
            },
            {
              displayName: "Response Headers",
              name: "responseHeaders",
              placeholder: "Add Response Header",
              description: "Add headers to the webhook response",
              type: "fixedCollection",
              typeOptions: {
                multipleValues: true
              },
              default: {},
              options: [
                {
                  name: "entries",
                  displayName: "Entries",
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
                      description: "Value of the header"
                    }
                  ]
                }
              ]
            },
            {
              displayName: "Put Response in Field",
              name: "responseKey",
              type: "string",
              displayOptions: {
                show: {
                  ["/respondWith"]: ["allIncomingItems", "firstIncomingItem"]
                }
              },
              default: "",
              description: "The name of the response field to put all items in",
              placeholder: "e.g. data"
            }
          ]
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const nodeVersion = this.getNode().typeVersion;
    const WEBHOOK_NODE_TYPES = [
      import_n8n_workflow.WEBHOOK_NODE_TYPE,
      import_n8n_workflow.FORM_TRIGGER_NODE_TYPE,
      import_n8n_workflow.CHAT_TRIGGER_NODE_TYPE,
      import_n8n_workflow.WAIT_NODE_TYPE
    ];
    let response;
    try {
      if (nodeVersion >= 1.1) {
        const connectedNodes = this.getParentNodes(this.getNode().name);
        if (!connectedNodes.some(({ type }) => WEBHOOK_NODE_TYPES.includes(type))) {
          throw new import_n8n_workflow.NodeOperationError(
            this.getNode(),
            new Error("No Webhook node found in the workflow"),
            {
              description: "Insert a Webhook node to your workflow and set the \u201CRespond\u201D parameter to \u201CUsing Respond to Webhook Node\u201D "
            }
          );
        }
      }
      const respondWith = this.getNodeParameter("respondWith", 0);
      const options = this.getNodeParameter("options", 0, {});
      const headers = {};
      if (options.responseHeaders) {
        for (const header of options.responseHeaders.entries) {
          if (typeof header.name !== "string") {
            header.name = header.name?.toString();
          }
          headers[header.name?.toLowerCase()] = header.value?.toString();
        }
      }
      let statusCode = options.responseCode || 200;
      let responseBody;
      if (respondWith === "json") {
        const responseBodyParameter = this.getNodeParameter("responseBody", 0);
        if (responseBodyParameter) {
          if (typeof responseBodyParameter === "object") {
            responseBody = responseBodyParameter;
          } else {
            try {
              responseBody = (0, import_n8n_workflow.jsonParse)(responseBodyParameter);
            } catch (error) {
              throw new import_n8n_workflow.NodeOperationError(this.getNode(), error, {
                message: "Invalid JSON in 'Response Body' field",
                description: "Check that the syntax of the JSON in the 'Response Body' parameter is valid"
              });
            }
          }
        }
      } else if (respondWith === "jwt") {
        try {
          const { keyType, secret, algorithm, privateKey } = await this.getCredentials("jwtAuth");
          let secretOrPrivateKey;
          if (keyType === "passphrase") {
            secretOrPrivateKey = secret;
          } else {
            secretOrPrivateKey = (0, import_utilities.formatPrivateKey)(privateKey);
          }
          const payload = this.getNodeParameter("payload", 0, {});
          const token = import_jsonwebtoken.default.sign(payload, secretOrPrivateKey, { algorithm });
          responseBody = { token };
        } catch (error) {
          throw new import_n8n_workflow.NodeOperationError(this.getNode(), error, {
            message: "Error signing JWT token"
          });
        }
      } else if (respondWith === "allIncomingItems") {
        const respondItems = items.map((item) => item.json);
        responseBody = options.responseKey ? (0, import_set.default)({}, options.responseKey, respondItems) : respondItems;
      } else if (respondWith === "firstIncomingItem") {
        responseBody = options.responseKey ? (0, import_set.default)({}, options.responseKey, items[0].json) : items[0].json;
      } else if (respondWith === "text") {
        responseBody = this.getNodeParameter("responseBody", 0);
      } else if (respondWith === "binary") {
        const item = items[0];
        if (item.binary === void 0) {
          throw new import_n8n_workflow.NodeOperationError(this.getNode(), "No binary data exists on the first item!");
        }
        let responseBinaryPropertyName;
        const responseDataSource = this.getNodeParameter("responseDataSource", 0);
        if (responseDataSource === "set") {
          responseBinaryPropertyName = this.getNodeParameter("inputFieldName", 0);
        } else {
          const binaryKeys = Object.keys(item.binary);
          if (binaryKeys.length === 0) {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              "No binary data exists on the first item!"
            );
          }
          responseBinaryPropertyName = binaryKeys[0];
        }
        const binaryData = this.helpers.assertBinaryData(0, responseBinaryPropertyName);
        if (binaryData.id) {
          responseBody = { binaryData };
        } else {
          responseBody = Buffer.from(binaryData.data, import_n8n_workflow.BINARY_ENCODING);
          headers["content-length"] = responseBody.length;
        }
        if (!headers["content-type"]) {
          headers["content-type"] = binaryData.mimeType;
        }
      } else if (respondWith === "redirect") {
        headers.location = this.getNodeParameter("redirectURL", 0);
        statusCode = options.responseCode ?? 307;
      } else if (respondWith !== "noData") {
        throw new import_n8n_workflow.NodeOperationError(
          this.getNode(),
          `The Response Data option "${respondWith}" is not supported!`
        );
      }
      response = {
        body: responseBody,
        headers,
        statusCode
      };
      this.sendResponse(response);
    } catch (error) {
      if (this.continueOnFail()) {
        const itemData = (0, import_utilities.generatePairedItemData)(items.length);
        const returnData = this.helpers.constructExecutionMetaData(
          [{ json: { error: error.message } }],
          { itemData }
        );
        return [returnData];
      }
      throw error;
    }
    if (nodeVersion >= 1.3) {
      return [items, [{ json: { response } }]];
    }
    return [items];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RespondToWebhook
});
//# sourceMappingURL=RespondToWebhook.node.js.map
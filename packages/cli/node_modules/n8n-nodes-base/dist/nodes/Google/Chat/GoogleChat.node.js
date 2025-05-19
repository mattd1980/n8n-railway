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
var GoogleChat_node_exports = {};
__export(GoogleChat_node_exports, {
  GoogleChat: () => GoogleChat
});
module.exports = __toCommonJS(GoogleChat_node_exports);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_GenericFunctions = require("./GenericFunctions");
var import_configureWaitTillDate = require("../../../utils/sendAndWait/configureWaitTillDate.util");
var import_descriptions2 = require("../../../utils/sendAndWait/descriptions");
var import_utils = require("../../../utils/sendAndWait/utils");
class GoogleChat {
  constructor() {
    this.description = {
      displayName: "Google Chat",
      name: "googleChat",
      icon: "file:googleChat.svg",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Google Chat API",
      defaults: {
        name: "Google Chat"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      webhooks: import_descriptions2.sendAndWaitWebhooksDescription,
      credentials: [
        {
          name: "googleApi",
          required: true,
          testedBy: "testGoogleTokenAuth",
          displayOptions: {
            show: {
              authentication: ["serviceAccount"]
            }
          }
        },
        {
          name: "googleChatOAuth2Api",
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
              // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
              name: "OAuth2 (recommended)",
              value: "oAuth2"
            },
            {
              name: "Service Account",
              value: "serviceAccount"
            }
          ],
          default: "serviceAccount"
        },
        {
          displayName: "Resource",
          name: "resource",
          required: true,
          noDataExpression: true,
          type: "options",
          options: [
            // {
            // 	name: 'Attachment',
            // 	value: 'attachment',
            // },
            // {
            // 	name: 'Incoming Webhook',
            // 	value: 'incomingWebhook',
            // },
            // {
            // 	name: 'Media',
            // 	value: 'media',
            // },
            {
              name: "Member",
              value: "member"
            },
            {
              name: "Message",
              value: "message"
            },
            {
              name: "Space",
              value: "space"
            }
          ],
          default: "message"
        },
        // ...attachmentOperations,
        // ...attachmentFields,
        // ...incomingWebhookOperations,
        // ...incomingWebhookFields,
        // ...mediaOperations,
        // ...mediaFields,
        ...import_descriptions.memberOperations,
        ...import_descriptions.memberFields,
        ...import_descriptions.messageOperations,
        ...import_descriptions.messageFields,
        ...import_descriptions.spaceOperations,
        ...import_descriptions.spaceFields,
        ...(0, import_utils.getSendAndWaitProperties)([import_descriptions.spaceIdProperty], "message", void 0, {
          noButtonStyle: true,
          defaultApproveLabel: "\u2705 Approve",
          defaultDisapproveLabel: "\u274C Decline"
        }).filter((p) => p.name !== "subject")
      ]
    };
    this.webhook = import_utils.sendAndWaitWebhook;
    this.methods = {
      loadOptions: {
        // Get all the spaces to display them to user so that they can
        // select them easily
        async getSpaces() {
          const returnData = [];
          const spaces = await import_GenericFunctions.googleApiRequestAllItems.call(this, "spaces", "GET", "/v1/spaces");
          for (const space of spaces) {
            returnData.push({
              name: space.displayName,
              value: space.name
            });
          }
          return returnData;
        }
      },
      credentialTest: {
        async testGoogleTokenAuth(credential) {
          const scopes = ["https://www.googleapis.com/auth/chat.bot"];
          const now = (0, import_moment_timezone.default)().unix();
          const email = credential.data.email.trim();
          const privateKey = credential.data.privateKey.replace(/\\n/g, "\n").trim();
          try {
            const signature = import_jsonwebtoken.default.sign(
              {
                iss: email,
                sub: credential.data.delegatedEmail || email,
                scope: scopes.join(" "),
                aud: "https://oauth2.googleapis.com/token",
                iat: now,
                exp: now
              },
              privateKey,
              {
                algorithm: "RS256",
                header: {
                  kid: privateKey,
                  typ: "JWT",
                  alg: "RS256"
                }
              }
            );
            const options = {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: "POST",
              form: {
                grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
                assertion: signature
              },
              uri: "https://oauth2.googleapis.com/token",
              json: true
            };
            const response = await this.helpers.request(options);
            if (!response.access_token) {
              return {
                status: "Error",
                message: JSON.stringify(response)
              };
            }
          } catch (err) {
            return {
              status: "Error",
              message: `${err.message}`
            };
          }
          return {
            status: "OK",
            message: "Connection successful!"
          };
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    const qs = {};
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    if (resource === "message" && operation === import_n8n_workflow.SEND_AND_WAIT_OPERATION) {
      const spaceId = this.getNodeParameter("spaceId", 0);
      const body = (0, import_GenericFunctions.createSendAndWaitMessageBody)(this);
      await import_GenericFunctions.googleApiRequest.call(this, "POST", `/v1/${spaceId}/messages`, body);
      const waitTill = (0, import_configureWaitTillDate.configureWaitTillDate)(this);
      await this.putExecutionToWait(waitTill);
      return [this.getInputData()];
    }
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "media") {
          if (operation === "download") {
            const resourceName = this.getNodeParameter("resourceName", i);
            const endpoint = `/v1/media/${resourceName}?alt=media`;
            const encoding = null;
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "GET",
              endpoint,
              void 0,
              void 0,
              void 0,
              void 0,
              encoding
            );
            const newItem = {
              json: items[i].json,
              binary: {}
            };
            if (items[i].binary !== void 0) {
              Object.assign(newItem.binary, items[i].binary);
            }
            items[i] = newItem;
            const binaryPropertyName = this.getNodeParameter("binaryPropertyName", i);
            items[i].binary[binaryPropertyName] = await this.helpers.prepareBinaryData(
              responseData,
              endpoint
            );
          }
        } else if (resource === "space") {
          if (operation === "get") {
            const spaceId = this.getNodeParameter("spaceId", i);
            responseData = await import_GenericFunctions.googleApiRequest.call(this, "GET", `/v1/${spaceId}`);
          } else if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", 0);
            if (returnAll) {
              responseData = await import_GenericFunctions.googleApiRequestAllItems.call(
                this,
                "spaces",
                "GET",
                "/v1/spaces"
              );
            } else {
              const limit = this.getNodeParameter("limit", i);
              qs.pageSize = limit;
              responseData = await import_GenericFunctions.googleApiRequest.call(this, "GET", "/v1/spaces", void 0, qs);
              responseData = responseData.spaces;
            }
          }
        } else if (resource === "member") {
          if (operation === "get") {
            const memberId = this.getNodeParameter("memberId", i);
            responseData = await import_GenericFunctions.googleApiRequest.call(this, "GET", `/v1/${memberId}`);
          } else if (operation === "getAll") {
            const spaceId = this.getNodeParameter("spaceId", i);
            const returnAll = this.getNodeParameter("returnAll", 0);
            if (returnAll) {
              responseData = await import_GenericFunctions.googleApiRequestAllItems.call(
                this,
                "memberships",
                "GET",
                `/v1/${spaceId}/members`,
                void 0,
                qs
              );
            } else {
              const limit = this.getNodeParameter("limit", i);
              qs.pageSize = limit;
              responseData = await import_GenericFunctions.googleApiRequest.call(
                this,
                "GET",
                `/v1/${spaceId}/members`,
                void 0,
                qs
              );
              responseData = responseData.memberships;
            }
          }
        } else if (resource === "message") {
          if (operation === "create") {
            const spaceId = this.getNodeParameter("spaceId", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (additionalFields.threadKey) {
              qs.threadKey = additionalFields.threadKey;
            }
            if (additionalFields.requestId) {
              qs.requestId = additionalFields.requestId;
            }
            let message = {};
            const jsonParameters = this.getNodeParameter("jsonParameters", i);
            if (jsonParameters) {
              const messageJson = this.getNodeParameter("messageJson", i);
              if (messageJson instanceof Object) {
                message = messageJson;
              } else {
                if ((0, import_GenericFunctions.validateJSON)(messageJson) !== void 0) {
                  message = JSON.parse(messageJson);
                } else {
                  throw new import_n8n_workflow.NodeOperationError(
                    this.getNode(),
                    "Message (JSON) must be a valid json",
                    { itemIndex: i }
                  );
                }
              }
            } else {
              const messageUi = this.getNodeParameter("messageUi", i);
              if (messageUi.text && messageUi.text !== "") {
                message.text = messageUi.text;
              } else {
                throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Message Text must be provided.", {
                  itemIndex: i
                });
              }
            }
            const body = {};
            Object.assign(body, message);
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "POST",
              `/v1/${spaceId}/messages`,
              body,
              qs
            );
          } else if (operation === "delete") {
            const messageId = this.getNodeParameter("messageId", i);
            responseData = await import_GenericFunctions.googleApiRequest.call(this, "DELETE", `/v1/${messageId}`);
          } else if (operation === "get") {
            const messageId = this.getNodeParameter("messageId", i);
            responseData = await import_GenericFunctions.googleApiRequest.call(this, "GET", `/v1/${messageId}`);
          } else if (operation === "update") {
            const messageId = this.getNodeParameter("messageId", i);
            let message = {};
            const jsonParameters = this.getNodeParameter("jsonParameters", i);
            if (jsonParameters) {
              const updateFieldsJson = this.getNodeParameter("updateFieldsJson", i);
              if (updateFieldsJson instanceof Object) {
                message = updateFieldsJson;
              } else {
                if ((0, import_GenericFunctions.validateJSON)(updateFieldsJson) !== void 0) {
                  message = JSON.parse(updateFieldsJson);
                } else {
                  throw new import_n8n_workflow.NodeOperationError(
                    this.getNode(),
                    "Update Fields (JSON) must be a valid json",
                    { itemIndex: i }
                  );
                }
              }
            } else {
              const updateFieldsUi = this.getNodeParameter("updateFieldsUi", i);
              if (updateFieldsUi.text) {
                message.text = updateFieldsUi.text;
              }
            }
            const body = {};
            Object.assign(body, message);
            let updateMask = "";
            if (message.text) {
              updateMask += "text,";
            }
            if (message.cards) {
              updateMask += "cards,";
            }
            updateMask = updateMask.slice(0, -1);
            qs.updateMask = updateMask;
            responseData = await import_GenericFunctions.googleApiRequest.call(this, "PUT", `/v1/${messageId}`, body, qs);
          }
        } else if (resource === "attachment") {
          if (operation === "get") {
            const attachmentName = this.getNodeParameter("attachmentName", i);
            responseData = await import_GenericFunctions.googleApiRequest.call(this, "GET", `/v1/${attachmentName}`);
          }
        } else if (resource === "incomingWebhook") {
          if (operation === "create") {
            const uri = this.getNodeParameter("incomingWebhookUrl", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (additionalFields.threadKey) {
              qs.threadKey = additionalFields.threadKey;
            }
            let message = {};
            const jsonParameters = this.getNodeParameter("jsonParameters", i);
            if (jsonParameters) {
              const messageJson = this.getNodeParameter("messageJson", i);
              if (messageJson instanceof Object) {
                message = messageJson;
              } else {
                if ((0, import_GenericFunctions.validateJSON)(messageJson) !== void 0) {
                  message = JSON.parse(messageJson);
                } else {
                  throw new import_n8n_workflow.NodeOperationError(
                    this.getNode(),
                    "Message (JSON) must be a valid json",
                    { itemIndex: i }
                  );
                }
              }
            } else {
              const messageUi = this.getNodeParameter("messageUi", i);
              if (messageUi.text && messageUi.text !== "") {
                message.text = messageUi.text;
              } else {
                throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Message Text must be provided.", {
                  itemIndex: i
                });
              }
            }
            const body = {};
            Object.assign(body, message);
            responseData = await import_GenericFunctions.googleApiRequest.call(this, "POST", "", body, qs, uri, true);
          }
        }
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          if (operation === "download") {
            items[i].json = { error: error.message };
          } else {
            const executionErrorData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray({ error: error.message }),
              { itemData: { item: i } }
            );
            returnData.push(...executionErrorData);
          }
          continue;
        }
        throw error;
      }
    }
    if (operation === "download") {
      return [items];
    } else {
      return [returnData];
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GoogleChat
});
//# sourceMappingURL=GoogleChat.node.js.map
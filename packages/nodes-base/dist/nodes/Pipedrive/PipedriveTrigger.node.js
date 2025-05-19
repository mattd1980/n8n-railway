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
var PipedriveTrigger_node_exports = {};
__export(PipedriveTrigger_node_exports, {
  PipedriveTrigger: () => PipedriveTrigger
});
module.exports = __toCommonJS(PipedriveTrigger_node_exports);
var import_basic_auth = __toESM(require("basic-auth"));
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
function authorizationError(resp, realm, responseCode, message) {
  if (message === void 0) {
    message = "Authorization problem!";
    if (responseCode === 401) {
      message = "Authorization is required!";
    } else if (responseCode === 403) {
      message = "Authorization data is wrong!";
    }
  }
  resp.writeHead(responseCode, { "WWW-Authenticate": `Basic realm="${realm}"` });
  resp.end(message);
  return {
    noWebhookResponse: true
  };
}
const entityOptions = [
  {
    name: "Activity",
    value: "activity"
  },
  {
    name: "Activity Type",
    value: "activityType"
  },
  {
    name: "All",
    value: "*"
  },
  {
    name: "Deal",
    value: "deal"
  },
  {
    name: "Note",
    value: "note"
  },
  {
    name: "Organization",
    value: "organization"
  },
  {
    name: "Person",
    value: "person"
  },
  {
    name: "Pipeline",
    value: "pipeline"
  },
  {
    name: "Product",
    value: "product"
  },
  {
    name: "Stage",
    value: "stage"
  },
  {
    name: "User",
    value: "user"
  }
];
class PipedriveTrigger {
  constructor() {
    this.description = {
      displayName: "Pipedrive Trigger",
      name: "pipedriveTrigger",
      icon: "file:pipedrive.svg",
      group: ["trigger"],
      version: [1, 1.1],
      defaultVersion: 1.1,
      description: "Starts the workflow when Pipedrive events occur",
      defaults: {
        name: "Pipedrive Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "pipedriveApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["apiToken"]
            }
          }
        },
        {
          name: "pipedriveOAuth2Api",
          required: true,
          displayOptions: {
            show: {
              authentication: ["oAuth2"]
            }
          }
        },
        {
          name: "httpBasicAuth",
          required: true,
          displayOptions: {
            show: {
              incomingAuthentication: ["basicAuth"]
            }
          }
        }
      ],
      webhooks: [
        {
          name: "default",
          httpMethod: "POST",
          responseMode: "onReceived",
          path: "webhook"
        }
      ],
      properties: [
        {
          displayName: "Authentication",
          name: "authentication",
          type: "options",
          options: [
            {
              name: "API Token",
              value: "apiToken"
            },
            {
              name: "OAuth2",
              value: "oAuth2"
            }
          ],
          default: "apiToken"
        },
        {
          displayName: "Incoming Authentication",
          name: "incomingAuthentication",
          type: "options",
          options: [
            {
              name: "Basic Auth",
              value: "basicAuth"
            },
            {
              name: "None",
              value: "none"
            }
          ],
          default: "none",
          description: "If authentication should be activated for the webhook (makes it more secure)"
        },
        {
          displayName: "Action",
          name: "action",
          type: "options",
          displayOptions: {
            hide: {
              "@version": [{ _cnd: { gte: 1.1 } }]
            }
          },
          options: [
            {
              name: "Added",
              value: "added",
              description: "Data got added",
              action: "Data was added"
            },
            {
              name: "All",
              value: "*",
              description: "Any change",
              action: "Any change"
            },
            {
              name: "Deleted",
              value: "deleted",
              description: "Data got deleted",
              action: "Data was deleted"
            },
            {
              name: "Merged",
              value: "merged",
              description: "Data got merged",
              action: "Data was merged"
            },
            {
              name: "Updated",
              value: "updated",
              description: "Data got updated",
              action: "Data was updated"
            }
          ],
          default: "*",
          description: "Type of action to receive notifications about"
        },
        {
          displayName: "Action",
          name: "action",
          type: "options",
          displayOptions: {
            hide: {
              "@version": [{ _cnd: { lte: 1 } }]
            }
          },
          options: [
            {
              name: "All",
              value: "*",
              description: "Any change",
              action: "Any change"
            },
            {
              name: "Create",
              value: "create",
              description: "Data got added",
              action: "Data was added"
            },
            {
              name: "Delete",
              value: "delete",
              description: "Data got deleted",
              action: "Data was deleted"
            },
            {
              name: "Change",
              value: "change",
              description: "Data got changed",
              action: "Data was changed"
            }
          ],
          default: "*",
          description: "Type of action to receive notifications about"
        },
        {
          displayName: "Entity",
          name: "entity",
          type: "options",
          options: entityOptions,
          default: "*",
          description: "Type of object to receive notifications about",
          displayOptions: {
            hide: {
              "@version": [{ _cnd: { lte: 1 } }]
            }
          }
        },
        {
          displayName: "Object",
          name: "object",
          type: "options",
          options: entityOptions,
          default: "*",
          description: "Type of object to receive notifications about",
          displayOptions: {
            hide: {
              "@version": [{ _cnd: { gte: 1.1 } }]
            }
          }
        }
      ]
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          const eventAction = this.getNodeParameter("action");
          const nodeVersion = this.getNode().typeVersion;
          const entityParamName = nodeVersion === 1 ? "object" : "entity";
          const eventObject = this.getNodeParameter(entityParamName);
          const endpoint = "/webhooks";
          const responseData = await import_GenericFunctions.pipedriveApiRequest.call(this, "GET", endpoint, {});
          if (responseData.data === void 0) {
            return false;
          }
          for (const existingData of responseData.data) {
            if (existingData.subscription_url === webhookUrl && existingData.event_action === eventAction && existingData.event_object === eventObject) {
              webhookData.webhookId = existingData.id;
              return true;
            }
          }
          return false;
        },
        async create() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const incomingAuthentication = this.getNodeParameter("incomingAuthentication", 0);
          const eventAction = this.getNodeParameter("action");
          const nodeVersion = this.getNode().typeVersion;
          const entityParamName = nodeVersion === 1 ? "object" : "entity";
          const eventObject = this.getNodeParameter(entityParamName);
          const endpoint = "/webhooks";
          const body = {
            event_action: eventAction,
            event_object: eventObject,
            subscription_url: webhookUrl,
            http_auth_user: void 0,
            http_auth_password: void 0
          };
          if (incomingAuthentication === "basicAuth") {
            let httpBasicAuth;
            try {
              httpBasicAuth = await this.getCredentials("httpBasicAuth");
            } catch (error) {
            }
            if (httpBasicAuth === void 0 || !httpBasicAuth.user || !httpBasicAuth.password) {
              return false;
            }
            body.http_auth_user = httpBasicAuth.user;
            body.http_auth_password = httpBasicAuth.password;
          }
          const responseData = await import_GenericFunctions.pipedriveApiRequest.call(this, "POST", endpoint, body);
          if (responseData.data === void 0 || responseData.data.id === void 0) {
            return false;
          }
          const webhookData = this.getWorkflowStaticData("node");
          webhookData.webhookId = responseData.data.id;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          if (webhookData.webhookId !== void 0) {
            const endpoint = `/webhooks/${webhookData.webhookId}`;
            const body = {};
            try {
              await import_GenericFunctions.pipedriveApiRequest.call(this, "DELETE", endpoint, body);
            } catch (error) {
              return false;
            }
            delete webhookData.webhookId;
            delete webhookData.webhookEvents;
          }
          return true;
        }
      }
    };
  }
  async webhook() {
    const req = this.getRequestObject();
    const resp = this.getResponseObject();
    const realm = "Webhook";
    const incomingAuthentication = this.getNodeParameter("incomingAuthentication", 0);
    if (incomingAuthentication === "basicAuth") {
      let httpBasicAuth;
      try {
        httpBasicAuth = await this.getCredentials("httpBasicAuth");
      } catch (error) {
      }
      if (httpBasicAuth === void 0 || !httpBasicAuth.user || !httpBasicAuth.password) {
        return authorizationError(resp, realm, 500, "No authentication data defined on node!");
      }
      const basicAuthData = (0, import_basic_auth.default)(req);
      if (basicAuthData === void 0) {
        return authorizationError(resp, realm, 401);
      }
      if (basicAuthData.name !== httpBasicAuth.user || basicAuthData.pass !== httpBasicAuth.password) {
        return authorizationError(resp, realm, 403);
      }
    }
    return {
      workflowData: [this.helpers.returnJsonArray(req.body)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PipedriveTrigger
});
//# sourceMappingURL=PipedriveTrigger.node.js.map
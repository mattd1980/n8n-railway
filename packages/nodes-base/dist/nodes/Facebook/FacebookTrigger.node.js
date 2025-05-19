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
var FacebookTrigger_node_exports = {};
__export(FacebookTrigger_node_exports, {
  FacebookTrigger: () => FacebookTrigger
});
module.exports = __toCommonJS(FacebookTrigger_node_exports);
var import_change_case = require("change-case");
var import_crypto = require("crypto");
var import_n8n_workflow = require("n8n-workflow");
var import_uuid = require("uuid");
var import_GenericFunctions = require("./GenericFunctions");
class FacebookTrigger {
  constructor() {
    this.description = {
      displayName: "Facebook Trigger",
      name: "facebookTrigger",
      icon: "file:facebook.svg",
      group: ["trigger"],
      version: 1,
      subtitle: '={{$parameter["appId"] +"/"+ $parameter["object"]}}',
      description: "Starts the workflow when Facebook events occur",
      defaults: {
        name: "Facebook Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "facebookGraphAppApi",
          required: true
        }
      ],
      webhooks: [
        {
          name: "setup",
          httpMethod: "GET",
          responseMode: "onReceived",
          path: "webhook"
        },
        {
          name: "default",
          httpMethod: "POST",
          responseMode: "onReceived",
          path: "webhook"
        }
      ],
      properties: [
        {
          displayName: "APP ID",
          name: "appId",
          type: "string",
          required: true,
          default: "",
          description: "Facebook APP ID"
        },
        {
          displayName: "To watch Whatsapp business account events use the Whatsapp trigger node",
          name: "whatsappBusinessAccountNotice",
          type: "notice",
          default: "",
          displayOptions: {
            show: {
              object: ["whatsappBusinessAccount"]
            }
          }
        },
        {
          displayName: "Object",
          name: "object",
          type: "options",
          options: [
            {
              name: "Ad Account",
              value: "adAccount",
              description: "Get updates about Ad Account"
            },
            {
              name: "Application",
              value: "application",
              description: "Get updates about the app"
            },
            {
              name: "Certificate Transparency",
              value: "certificateTransparency",
              description: "Get updates about Certificate Transparency"
            },
            {
              name: "Group",
              value: "group",
              description: "Get updates about activity in groups and events in groups for Workplace"
            },
            {
              name: "Instagram",
              value: "instagram",
              description: "Get updates about comments on your media"
            },
            {
              name: "Link",
              value: "link",
              description: "Get updates about links for rich previews by an external provider"
            },
            {
              name: "Page",
              value: "page",
              description: "Page updates"
            },
            {
              name: "Permissions",
              value: "permissions",
              description: "Updates regarding granting or revoking permissions"
            },
            {
              name: "User",
              value: "user",
              description: "User profile updates"
            },
            {
              name: "Whatsapp Business Account",
              value: "whatsappBusinessAccount",
              description: "Get updates about Whatsapp business account"
            },
            {
              name: "Workplace Security",
              value: "workplaceSecurity",
              description: "Get updates about Workplace Security"
            }
          ],
          required: true,
          default: "user",
          description: "The object to subscribe to"
        },
        //https://developers.facebook.com/docs/graph-api/webhooks/reference/page
        {
          displayName: "Field Names or IDs",
          name: "fields",
          type: "multiOptions",
          typeOptions: {
            loadOptionsMethod: "getObjectFields",
            loadOptionsDependsOn: ["object"]
          },
          default: [],
          description: 'The set of fields in this object that are subscribed to. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          default: {},
          placeholder: "Add option",
          options: [
            {
              displayName: "Include Values",
              name: "includeValues",
              type: "boolean",
              default: true,
              description: "Whether change notifications should include the new values"
            }
          ]
        }
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the available organizations to display them to user so that they can
        // select them easily
        async getObjectFields() {
          const object = this.getCurrentNodeParameter("object");
          return (0, import_GenericFunctions.getFields)(object);
        }
      }
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const object = this.getNodeParameter("object");
          const appId = this.getNodeParameter("appId");
          const { data } = await import_GenericFunctions.facebookApiRequest.call(
            this,
            "GET",
            `/${appId}/subscriptions`,
            {}
          );
          const subscription = data.find((webhook) => webhook.object === object && webhook.status);
          if (!subscription) {
            return false;
          }
          if (subscription.callback_url !== webhookUrl) {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The Facebook App ID ${appId} already has a webhook subscription. Delete it or use another App before executing the trigger. Due to Facebook API limitations, you can have just one trigger per App.`,
              { level: "warning" }
            );
          }
          return true;
        },
        async create() {
          const webhookData = this.getWorkflowStaticData("node");
          const webhookUrl = this.getNodeWebhookUrl("default");
          const object = this.getNodeParameter("object");
          const appId = this.getNodeParameter("appId");
          const fields = this.getNodeParameter("fields");
          const options = this.getNodeParameter("options");
          const body = {
            object: (0, import_change_case.snakeCase)(object),
            callback_url: webhookUrl,
            verify_token: (0, import_uuid.v4)(),
            fields: fields.includes("*") ? (0, import_GenericFunctions.getAllFields)(object) : fields
          };
          if (options.includeValues !== void 0) {
            body.include_values = options.includeValues;
          }
          const responseData = await import_GenericFunctions.facebookApiRequest.call(
            this,
            "POST",
            `/${appId}/subscriptions`,
            body
          );
          webhookData.verifyToken = body.verify_token;
          if (responseData.success !== true) {
            throw new import_n8n_workflow.NodeApiError(this.getNode(), responseData, {
              message: "Facebook webhook creation response did not contain the expected data."
            });
          }
          return true;
        },
        async delete() {
          const appId = this.getNodeParameter("appId");
          const object = this.getNodeParameter("object");
          try {
            await import_GenericFunctions.facebookApiRequest.call(this, "DELETE", `/${appId}/subscriptions`, {
              object: (0, import_change_case.snakeCase)(object)
            });
          } catch (error) {
            return false;
          }
          return true;
        }
      }
    };
  }
  async webhook() {
    const bodyData = this.getBodyData();
    const query = this.getQueryData();
    const res = this.getResponseObject();
    const req = this.getRequestObject();
    const headerData = this.getHeaderData();
    const credentials = await this.getCredentials("facebookGraphAppApi");
    if (this.getWebhookName() === "setup") {
      if (query["hub.challenge"]) {
        res.status(200).send(query["hub.challenge"]).end();
        return {
          noWebhookResponse: true
        };
      }
    }
    if (credentials.appSecret !== "") {
      const computedSignature = (0, import_crypto.createHmac)("sha1", credentials.appSecret).update(req.rawBody).digest("hex");
      if (headerData["x-hub-signature"] !== `sha1=${computedSignature}`) {
        return {};
      }
    }
    return {
      workflowData: [this.helpers.returnJsonArray(bodyData.entry)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FacebookTrigger
});
//# sourceMappingURL=FacebookTrigger.node.js.map
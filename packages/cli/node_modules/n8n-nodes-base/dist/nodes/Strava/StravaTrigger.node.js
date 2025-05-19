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
var StravaTrigger_node_exports = {};
__export(StravaTrigger_node_exports, {
  StravaTrigger: () => StravaTrigger
});
module.exports = __toCommonJS(StravaTrigger_node_exports);
var import_crypto = require("crypto");
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class StravaTrigger {
  constructor() {
    this.description = {
      displayName: "Strava Trigger",
      name: "stravaTrigger",
      icon: "file:strava.svg",
      group: ["trigger"],
      version: 1,
      description: "Starts the workflow when Strava events occur",
      defaults: {
        name: "Strava Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "stravaOAuth2Api",
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
          displayName: "Object",
          name: "object",
          type: "options",
          options: [
            {
              name: "[All]",
              value: "*"
            },
            {
              name: "Activity",
              value: "activity"
            },
            {
              name: "Athlete",
              value: "athlete"
            }
          ],
          default: "*"
        },
        {
          displayName: "Event",
          name: "event",
          type: "options",
          options: [
            {
              name: "[All]",
              value: "*"
            },
            {
              name: "Created",
              value: "create"
            },
            {
              name: "Deleted",
              value: "delete"
            },
            {
              name: "Updated",
              value: "update"
            }
          ],
          default: "*"
        },
        {
          displayName: "Resolve Data",
          name: "resolveData",
          type: "boolean",
          default: true,
          // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
          description: "By default the webhook-data only contain the Object ID. If this option gets activated, it will resolve the data automatically."
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add option",
          default: {},
          options: [
            {
              displayName: "Delete If Exist",
              name: "deleteIfExist",
              type: "boolean",
              default: false,
              // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
              description: "Strava allows just one subscription at all times. If you want to delete the current subscription to make room for a new subscription with the current parameters, set this parameter to true. Keep in mind this is a destructive operation."
            }
          ]
        }
      ]
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          const endpoint = "/push_subscriptions";
          const webhooks = await import_GenericFunctions.stravaApiRequest.call(this, "GET", endpoint, {});
          for (const webhook of webhooks) {
            if (webhook.callback_url === webhookUrl) {
              webhookData.webhookId = webhook.id;
              return true;
            }
          }
          return false;
        },
        async create() {
          const webhookData = this.getWorkflowStaticData("node");
          const webhookUrl = this.getNodeWebhookUrl("default");
          const endpoint = "/push_subscriptions";
          const body = {
            callback_url: webhookUrl,
            verify_token: (0, import_crypto.randomBytes)(20).toString("hex")
          };
          let responseData;
          try {
            responseData = await import_GenericFunctions.stravaApiRequest.call(this, "POST", endpoint, body);
          } catch (error) {
            if (error?.cause?.error) {
              const errors = error?.cause?.error?.errors;
              for (error of errors) {
                if (error.resource === "PushSubscription" && error.code === "already exists") {
                  const options = this.getNodeParameter("options");
                  const webhooks = await import_GenericFunctions.stravaApiRequest.call(
                    this,
                    "GET",
                    "/push_subscriptions",
                    {}
                  );
                  if (options.deleteIfExist) {
                    await import_GenericFunctions.stravaApiRequest.call(
                      this,
                      "DELETE",
                      `/push_subscriptions/${webhooks[0].id}`
                    );
                    const requestBody = {
                      callback_url: webhookUrl,
                      verify_token: (0, import_crypto.randomBytes)(20).toString("hex")
                    };
                    responseData = await import_GenericFunctions.stravaApiRequest.call(
                      this,
                      "POST",
                      "/push_subscriptions",
                      requestBody
                    );
                  } else {
                    error.message = `A subscription already exists [${webhooks[0].callback_url}]. If you want to delete this subscription and create a new one with the current parameters please go to options and set delete if exist to true`;
                    throw error;
                  }
                }
              }
            }
            if (!responseData) {
              throw error;
            }
          }
          if (responseData.id === void 0) {
            return false;
          }
          webhookData.webhookId = responseData.id;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          if (webhookData.webhookId !== void 0) {
            const endpoint = `/push_subscriptions/${webhookData.webhookId}`;
            try {
              await import_GenericFunctions.stravaApiRequest.call(this, "DELETE", endpoint);
            } catch (error) {
              return false;
            }
            delete webhookData.webhookId;
          }
          return true;
        }
      }
    };
  }
  async webhook() {
    const body = this.getBodyData();
    const query = this.getQueryData();
    const object = this.getNodeParameter("object");
    const event = this.getNodeParameter("event");
    const resolveData = this.getNodeParameter("resolveData");
    let objectType, eventType;
    if (object === "*") {
      objectType = ["activity", "athlete"];
    } else {
      objectType = [object];
    }
    if (event === "*") {
      eventType = ["create", "update", "delete"];
    } else {
      eventType = [event];
    }
    if (this.getWebhookName() === "setup") {
      if (query["hub.challenge"]) {
        const res = this.getResponseObject();
        res.status(200).json({ "hub.challenge": query["hub.challenge"] }).end();
        return {
          noWebhookResponse: true
        };
      }
    }
    if (object !== "*" && !objectType.includes(body.object_type)) {
      return {};
    }
    if (event !== "*" && !eventType.includes(body.aspect_type)) {
      return {};
    }
    if (resolveData && body.aspect_type !== "delete") {
      let endpoint = `/athletes/${body.object_id}/stats`;
      if (body.object_type === "activity") {
        endpoint = `/activities/${body.object_id}`;
      }
      body.object_data = await import_GenericFunctions.stravaApiRequest.call(this, "GET", endpoint);
    }
    return {
      workflowData: [this.helpers.returnJsonArray(body)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StravaTrigger
});
//# sourceMappingURL=StravaTrigger.node.js.map
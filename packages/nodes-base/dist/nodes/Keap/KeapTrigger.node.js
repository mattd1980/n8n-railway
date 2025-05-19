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
var KeapTrigger_node_exports = {};
__export(KeapTrigger_node_exports, {
  KeapTrigger: () => KeapTrigger
});
module.exports = __toCommonJS(KeapTrigger_node_exports);
var import_change_case = require("change-case");
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class KeapTrigger {
  constructor() {
    this.description = {
      displayName: "Keap Trigger",
      name: "keapTrigger",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:keap.png",
      group: ["trigger"],
      version: 1,
      subtitle: '={{$parameter["eventId"]}}',
      description: "Starts the workflow when Infusionsoft events occur",
      defaults: {
        name: "Keap Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "keapOAuth2Api",
          required: true
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
          displayName: "Event Name or ID",
          name: "eventId",
          type: "options",
          description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
          typeOptions: {
            loadOptionsMethod: "getEvents"
          },
          default: "",
          required: true
        },
        {
          displayName: "RAW Data",
          name: "rawData",
          type: "boolean",
          default: false,
          description: "Whether to return the data exactly in the way it got received from the API"
        }
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the event types to display them to user so that they can
        // select them easily
        async getEvents() {
          const returnData = [];
          const hooks = await import_GenericFunctions.keapApiRequest.call(this, "GET", "/hooks/event_keys");
          for (const hook of hooks) {
            const hookName = hook;
            const hookId = hook;
            returnData.push({
              name: (0, import_change_case.capitalCase)(hookName.replace(".", " ")),
              value: hookId
            });
          }
          return returnData;
        }
      }
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const eventId = this.getNodeParameter("eventId");
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          const responseData = await import_GenericFunctions.keapApiRequest.call(this, "GET", "/hooks", {});
          for (const existingData of responseData) {
            if (existingData.hookUrl === webhookUrl && existingData.eventKey === eventId && existingData.status === "Verified") {
              webhookData.webhookId = existingData.key;
              return true;
            }
          }
          return false;
        },
        async create() {
          const eventId = this.getNodeParameter("eventId");
          const webhookData = this.getWorkflowStaticData("node");
          const webhookUrl = this.getNodeWebhookUrl("default");
          const body = {
            eventKey: eventId,
            hookUrl: webhookUrl
          };
          const responseData = await import_GenericFunctions.keapApiRequest.call(this, "POST", "/hooks", body);
          if (responseData.key === void 0) {
            return false;
          }
          webhookData.webhookId = responseData.key;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          if (webhookData.webhookId !== void 0) {
            try {
              await import_GenericFunctions.keapApiRequest.call(this, "DELETE", `/hooks/${webhookData.webhookId}`);
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
    const rawData = this.getNodeParameter("rawData");
    const headers = this.getHeaderData();
    const bodyData = this.getBodyData();
    if (headers["x-hook-secret"]) {
      const res = this.getResponseObject();
      res.set("x-hook-secret", headers["x-hook-secret"]);
      res.status(200).end();
      return {
        noWebhookResponse: true
      };
    }
    if (rawData) {
      return {
        workflowData: [this.helpers.returnJsonArray(bodyData)]
      };
    }
    const responseData = [];
    for (const data of bodyData.object_keys) {
      responseData.push({
        eventKey: bodyData.event_key,
        objectType: bodyData.object_type,
        id: data.id,
        timestamp: data.timestamp,
        apiUrl: data.apiUrl
      });
    }
    return {
      workflowData: [this.helpers.returnJsonArray(responseData)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  KeapTrigger
});
//# sourceMappingURL=KeapTrigger.node.js.map
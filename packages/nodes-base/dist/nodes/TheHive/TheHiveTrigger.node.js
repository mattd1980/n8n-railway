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
var TheHiveTrigger_node_exports = {};
__export(TheHiveTrigger_node_exports, {
  TheHiveTrigger: () => TheHiveTrigger
});
module.exports = __toCommonJS(TheHiveTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_EventsDescription = require("./descriptions/EventsDescription");
class TheHiveTrigger {
  constructor() {
    this.description = {
      displayName: "TheHive Trigger",
      name: "theHiveTrigger",
      icon: "file:thehive.svg",
      group: ["trigger"],
      version: [1, 2],
      description: "Starts the workflow when TheHive events occur",
      defaults: {
        name: "TheHive Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
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
          displayName: 'You must set up the webhook in TheHive \u2014 instructions <a href="https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.thehivetrigger/#configure-a-webhook-in-thehive" target="_blank">here</a>',
          name: "notice",
          type: "notice",
          default: ""
        },
        ...import_EventsDescription.eventsDescription
      ]
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          return true;
        },
        async create() {
          return true;
        },
        async delete() {
          return true;
        }
      }
    };
  }
  async webhook() {
    const bodyData = this.getBodyData();
    const events = this.getNodeParameter("events", []);
    if (!bodyData.operation || !bodyData.objectType) {
      return {};
    }
    const operation = bodyData.operation.replace("Creation", "Create");
    const event = `${bodyData.objectType.toLowerCase()}_${operation.toLowerCase()}`;
    if (events.indexOf("*") === -1 && events.indexOf(event) === -1) {
      return {};
    }
    const returnData = [];
    returnData.push({
      event,
      body: this.getBodyData(),
      headers: this.getHeaderData(),
      query: this.getQueryData()
    });
    return {
      workflowData: [this.helpers.returnJsonArray(returnData)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TheHiveTrigger
});
//# sourceMappingURL=TheHiveTrigger.node.js.map
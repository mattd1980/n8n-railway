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
var ConvertKitTrigger_node_exports = {};
__export(ConvertKitTrigger_node_exports, {
  ConvertKitTrigger: () => ConvertKitTrigger
});
module.exports = __toCommonJS(ConvertKitTrigger_node_exports);
var import_change_case = require("change-case");
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class ConvertKitTrigger {
  constructor() {
    this.description = {
      displayName: "ConvertKit Trigger",
      name: "convertKitTrigger",
      icon: "file:convertKit.svg",
      subtitle: '={{$parameter["event"]}}',
      group: ["trigger"],
      version: 1,
      description: "Handle ConvertKit events via webhooks",
      defaults: {
        name: "ConvertKit Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "convertKitApi",
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
          displayName: "Event",
          name: "event",
          type: "options",
          required: true,
          default: "",
          description: "The events that can trigger the webhook and whether they are enabled",
          options: [
            {
              name: "Form Subscribe",
              value: "formSubscribe"
            },
            {
              name: "Link Click",
              value: "linkClick"
            },
            {
              name: "Product Purchase",
              value: "productPurchase"
            },
            {
              name: "Purchase Created",
              value: "purchaseCreate"
            },
            {
              name: "Sequence Complete",
              value: "courseComplete"
            },
            {
              name: "Sequence Subscribe",
              value: "courseSubscribe"
            },
            {
              name: "Subscriber Activated",
              value: "subscriberActivate"
            },
            {
              name: "Subscriber Unsubscribe",
              value: "subscriberUnsubscribe"
            },
            {
              name: "Tag Add",
              value: "tagAdd"
            },
            {
              name: "Tag Remove",
              value: "tagRemove"
            }
          ]
        },
        {
          displayName: "Form Name or ID",
          name: "formId",
          type: "options",
          description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
          typeOptions: {
            loadOptionsMethod: "getForms"
          },
          required: true,
          default: "",
          displayOptions: {
            show: {
              event: ["formSubscribe"]
            }
          }
        },
        {
          displayName: "Sequence Name or ID",
          name: "courseId",
          type: "options",
          description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
          typeOptions: {
            loadOptionsMethod: "getSequences"
          },
          required: true,
          default: "",
          displayOptions: {
            show: {
              event: ["courseSubscribe", "courseComplete"]
            }
          }
        },
        {
          displayName: "Initiating Link",
          name: "link",
          type: "string",
          required: true,
          default: "",
          description: "The URL of the initiating link",
          displayOptions: {
            show: {
              event: ["linkClick"]
            }
          }
        },
        {
          displayName: "Product ID",
          name: "productId",
          type: "string",
          required: true,
          default: "",
          displayOptions: {
            show: {
              event: ["productPurchase"]
            }
          }
        },
        {
          displayName: "Tag Name or ID",
          name: "tagId",
          type: "options",
          description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
          typeOptions: {
            loadOptionsMethod: "getTags"
          },
          required: true,
          default: "",
          displayOptions: {
            show: {
              event: ["tagAdd", "tagRemove"]
            }
          }
        }
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the tags to display them to user so that they can
        // select them easily
        async getTags() {
          const returnData = [];
          const { tags } = await import_GenericFunctions.convertKitApiRequest.call(this, "GET", "/tags");
          for (const tag of tags) {
            const tagName = tag.name;
            const tagId = tag.id;
            returnData.push({
              name: tagName,
              value: tagId
            });
          }
          return returnData;
        },
        // Get all the forms to display them to user so that they can
        // select them easily
        async getForms() {
          const returnData = [];
          const { forms } = await import_GenericFunctions.convertKitApiRequest.call(this, "GET", "/forms");
          for (const form of forms) {
            const formName = form.name;
            const formId = form.id;
            returnData.push({
              name: formName,
              value: formId
            });
          }
          return returnData;
        },
        // Get all the sequences to display them to user so that they can
        // select them easily
        async getSequences() {
          const returnData = [];
          const { courses } = await import_GenericFunctions.convertKitApiRequest.call(this, "GET", "/sequences");
          for (const course of courses) {
            const courseName = course.name;
            const courseId = course.id;
            returnData.push({
              name: courseName,
              value: courseId
            });
          }
          return returnData;
        }
      }
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookData = this.getWorkflowStaticData("node");
          if (webhookData.webhookId) {
            return true;
          }
          return false;
        },
        async create() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          let event = this.getNodeParameter("event", 0);
          const endpoint = "/automations/hooks";
          if (event === "purchaseCreate") {
            event = `purchase.${(0, import_change_case.snakeCase)(event)}`;
          } else {
            event = `subscriber.${(0, import_change_case.snakeCase)(event)}`;
          }
          const body = {
            target_url: webhookUrl,
            event: {
              name: event
            }
          };
          if (event === "subscriber.form_subscribe") {
            body.event.form_id = this.getNodeParameter("formId", 0);
          }
          if (event === "subscriber.course_subscribe" || event === "subscriber.course_complete") {
            body.event.sequence_id = this.getNodeParameter("courseId", 0);
          }
          if (event === "subscriber.link_click") {
            body.event.initiator_value = this.getNodeParameter("link", 0);
          }
          if (event === "subscriber.product_purchase") {
            body.event.product_id = this.getNodeParameter("productId", 0);
          }
          if (event === "subscriber.tag_add" || event === "subscriber.tag_remove") {
            body.event.tag_id = this.getNodeParameter("tagId", 0);
          }
          const webhook = await import_GenericFunctions.convertKitApiRequest.call(this, "POST", endpoint, body);
          if (webhook.rule.id === void 0) {
            return false;
          }
          const webhookData = this.getWorkflowStaticData("node");
          webhookData.webhookId = webhook.rule.id;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          if (webhookData.webhookId !== void 0) {
            const endpoint = `/automations/hooks/${webhookData.webhookId}`;
            try {
              await import_GenericFunctions.convertKitApiRequest.call(this, "DELETE", endpoint);
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
    const returnData = [];
    returnData.push(this.getBodyData());
    return {
      workflowData: [this.helpers.returnJsonArray(returnData)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConvertKitTrigger
});
//# sourceMappingURL=ConvertKitTrigger.node.js.map
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
var WorkableTrigger_node_exports = {};
__export(WorkableTrigger_node_exports, {
  WorkableTrigger: () => WorkableTrigger
});
module.exports = __toCommonJS(WorkableTrigger_node_exports);
var import_change_case = require("change-case");
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class WorkableTrigger {
  constructor() {
    this.description = {
      displayName: "Workable Trigger",
      name: "workableTrigger",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:workable.png",
      group: ["trigger"],
      version: 1,
      subtitle: '={{$parameter["triggerOn"]}}',
      description: "Starts the workflow when Workable events occur",
      defaults: {
        name: "Workable Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "workableApi",
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
          displayName: "Trigger On",
          name: "triggerOn",
          type: "options",
          options: [
            {
              name: "Candidate Created",
              value: "candidateCreated"
            },
            {
              name: "Candidate Moved",
              value: "candidateMoved"
            }
          ],
          default: "",
          required: true
        },
        {
          displayName: "Filters",
          name: "filters",
          type: "collection",
          placeholder: "Add Filter",
          default: {},
          options: [
            {
              displayName: "Job Name or ID",
              name: "job",
              type: "options",
              typeOptions: {
                loadOptionsMethod: "getJobs"
              },
              default: "",
              description: 'Get notifications only for one job. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
            },
            {
              displayName: "Stage Name or ID",
              name: "stage",
              type: "options",
              typeOptions: {
                loadOptionsMethod: "getStages"
              },
              default: "",
              description: `Get notifications for specific stages. e.g. 'hired'. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.`
            }
          ]
        }
      ]
    };
    this.methods = {
      loadOptions: {
        async getJobs() {
          const returnData = [];
          const { jobs } = await import_GenericFunctions.workableApiRequest.call(this, "GET", "/jobs");
          for (const job of jobs) {
            returnData.push({
              name: job.full_title,
              value: job.shortcode
            });
          }
          return returnData;
        },
        async getStages() {
          const returnData = [];
          const { stages } = await import_GenericFunctions.workableApiRequest.call(this, "GET", "/stages");
          for (const stage of stages) {
            returnData.push({
              name: stage.name,
              value: stage.slug
            });
          }
          return returnData;
        }
      }
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          const { subscriptions } = await import_GenericFunctions.workableApiRequest.call(this, "GET", "/subscriptions");
          for (const subscription of subscriptions) {
            if (subscription.target === webhookUrl) {
              webhookData.webhookId = subscription.id;
              return true;
            }
          }
          return false;
        },
        async create() {
          const credentials = await this.getCredentials("workableApi");
          const webhookData = this.getWorkflowStaticData("node");
          const webhookUrl = this.getNodeWebhookUrl("default");
          const triggerOn = this.getNodeParameter("triggerOn");
          const { stage, job } = this.getNodeParameter("filters");
          const endpoint = "/subscriptions";
          const body = {
            event: (0, import_change_case.snakeCase)(triggerOn).toLowerCase(),
            args: {
              account_id: credentials.subdomain,
              ...job && { job_shortcode: job },
              ...stage && { stage_slug: stage }
            },
            target: webhookUrl
          };
          const responseData = await import_GenericFunctions.workableApiRequest.call(this, "POST", endpoint, body);
          if (responseData.id === void 0) {
            return false;
          }
          webhookData.webhookId = responseData.id;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          if (webhookData.webhookId !== void 0) {
            const endpoint = `/subscriptions/${webhookData.webhookId}`;
            try {
              await import_GenericFunctions.workableApiRequest.call(this, "DELETE", endpoint);
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
    const bodyData = this.getBodyData();
    return {
      workflowData: [this.helpers.returnJsonArray(bodyData)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WorkableTrigger
});
//# sourceMappingURL=WorkableTrigger.node.js.map
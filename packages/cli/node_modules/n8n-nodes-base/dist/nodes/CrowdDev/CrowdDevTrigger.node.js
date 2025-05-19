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
var CrowdDevTrigger_node_exports = {};
__export(CrowdDevTrigger_node_exports, {
  CrowdDevTrigger: () => CrowdDevTrigger
});
module.exports = __toCommonJS(CrowdDevTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
const credsName = "crowdDevApi";
const getCreds = async (hookFns) => hookFns.getCredentials(credsName);
const createRequest = (creds, opts) => {
  const defaults = {
    baseURL: `${creds.url}/api/tenant/${creds.tenantId}`,
    url: "",
    json: true,
    skipSslCertificateValidation: creds.allowUnauthorizedCerts
  };
  return Object.assign(defaults, opts);
};
class CrowdDevTrigger {
  constructor() {
    this.description = {
      displayName: "crowd.dev Trigger",
      name: "crowdDevTrigger",
      icon: { light: "file:crowdDev.svg", dark: "file:crowdDev.dark.svg" },
      group: ["trigger"],
      version: 1,
      description: "Starts the workflow when crowd.dev events occur.",
      defaults: {
        name: "crowd.dev Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "crowdDevApi",
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
          displayName: "Trigger",
          name: "trigger",
          description: "What will trigger an automation",
          type: "options",
          required: true,
          default: "new_activity",
          options: [
            {
              name: "New Activity",
              value: "new_activity"
            },
            {
              name: "New Member",
              value: "new_member"
            }
          ]
        }
      ]
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const creds = await getCreds(this);
          const webhookData = this.getWorkflowStaticData("node");
          const webhookUrl = this.getNodeWebhookUrl("default");
          if (webhookData.webhookId !== void 0) {
            try {
              const options = createRequest(creds, {
                url: `/automation/${webhookData.webhookId}`,
                method: "GET"
              });
              const data = await this.helpers.httpRequestWithAuthentication.call(
                this,
                credsName,
                options
              );
              if (data.settings.url === webhookUrl) {
                return true;
              }
            } catch (error) {
              return false;
            }
          }
          return false;
        },
        async create() {
          const creds = await getCreds(this);
          const webhookData = this.getWorkflowStaticData("node");
          const webhookUrl = this.getNodeWebhookUrl("default");
          const params = {
            trigger: this.getNodeParameter("trigger")
          };
          const options = createRequest(creds, {
            url: "/automation",
            method: "POST",
            body: {
              data: {
                settings: {
                  url: webhookUrl
                },
                type: "webhook",
                trigger: params.trigger
              }
            }
          });
          const responseData = await this.helpers.httpRequestWithAuthentication.call(
            this,
            "crowdDevApi",
            options
          );
          if (responseData === void 0 || responseData.id === void 0) {
            return false;
          }
          webhookData.webhookId = responseData.id;
          return true;
        },
        async delete() {
          const creds = await getCreds(this);
          const webhookData = this.getWorkflowStaticData("node");
          if (webhookData.webhookId !== void 0) {
            try {
              const options = createRequest(creds, {
                url: `/automation/${webhookData.webhookId}`,
                method: "DELETE"
              });
              await this.helpers.httpRequestWithAuthentication.call(this, credsName, options);
            } catch (error) {
              return false;
            }
            delete webhookData.webhookId;
            delete webhookData.webhookEvents;
            delete webhookData.hookSecret;
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
  CrowdDevTrigger
});
//# sourceMappingURL=CrowdDevTrigger.node.js.map
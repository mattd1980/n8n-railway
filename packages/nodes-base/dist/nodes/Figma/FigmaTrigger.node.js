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
var FigmaTrigger_node_exports = {};
__export(FigmaTrigger_node_exports, {
  FigmaTrigger: () => FigmaTrigger
});
module.exports = __toCommonJS(FigmaTrigger_node_exports);
var import_change_case = require("change-case");
var import_crypto = require("crypto");
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class FigmaTrigger {
  constructor() {
    this.description = {
      displayName: "Figma Trigger (Beta)",
      name: "figmaTrigger",
      icon: "file:figma.svg",
      group: ["trigger"],
      version: 1,
      subtitle: '={{$parameter["triggerOn"]}}',
      description: "Starts the workflow when Figma events occur",
      defaults: {
        name: "Figma Trigger (Beta)"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "figmaApi",
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
          displayName: "Team ID",
          name: "teamId",
          type: "string",
          required: true,
          default: "",
          description: "Trigger will monitor this Figma Team for changes. Team ID can be found in the URL of a Figma Team page when viewed in a web browser: figma.com/files/team/{TEAM-ID}/."
        },
        {
          displayName: "Trigger On",
          name: "triggerOn",
          type: "options",
          options: [
            {
              name: "File Commented",
              value: "fileComment",
              description: "Triggers when someone comments on a file"
            },
            {
              name: "File Deleted",
              value: "fileDelete",
              description: "Triggers whenever a file has been deleted. Does not trigger on all files within a folder, if the folder is deleted."
            },
            {
              name: "File Updated",
              value: "fileUpdate",
              description: "Triggers whenever a file saves or is deleted. This occurs whenever a file is closed or within 30 seconds after changes have been made."
            },
            {
              name: "File Version Updated",
              value: "fileVersionUpdate",
              description: "Triggers whenever a named version is created in the version history of a file"
            },
            {
              name: "Library Publish",
              value: "libraryPublish",
              description: "Triggers whenever a library file is published"
            }
          ],
          default: "",
          required: true
        }
      ]
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          const teamId = this.getNodeParameter("teamId");
          const triggerOn = this.getNodeParameter("triggerOn");
          const { webhooks } = await import_GenericFunctions.figmaApiRequest.call(
            this,
            "GET",
            `/v2/teams/${teamId}/webhooks`
          );
          for (const webhook of webhooks) {
            if (webhook.endpoint === webhookUrl && webhook.team_id === teamId && webhook.event_type === (0, import_change_case.snakeCase)(triggerOn).toUpperCase() && webhook.status === "ACTIVE") {
              webhookData.webhookId = webhook.id;
              return true;
            }
          }
          return false;
        },
        async create() {
          const webhookData = this.getWorkflowStaticData("node");
          const webhookUrl = this.getNodeWebhookUrl("default");
          const triggerOn = this.getNodeParameter("triggerOn");
          const teamId = this.getNodeParameter("teamId");
          const endpoint = "/v2/webhooks";
          const body = {
            event_type: (0, import_change_case.snakeCase)(triggerOn).toUpperCase(),
            team_id: teamId,
            description: `n8n-webhook:${webhookUrl}`,
            endpoint: webhookUrl,
            passcode: (0, import_crypto.randomBytes)(10).toString("hex")
          };
          const responseData = await import_GenericFunctions.figmaApiRequest.call(this, "POST", endpoint, body);
          if (responseData.id === void 0) {
            return false;
          }
          webhookData.webhookId = responseData.id;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          if (webhookData.webhookId !== void 0) {
            const endpoint = `/v2/webhooks/${webhookData.webhookId}`;
            try {
              await import_GenericFunctions.figmaApiRequest.call(this, "DELETE", endpoint);
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
    if (bodyData.event_type === "PING") {
      const res = this.getResponseObject();
      res.status(200).end();
      return {
        noWebhookResponse: true
      };
    }
    return {
      workflowData: [this.helpers.returnJsonArray(bodyData)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FigmaTrigger
});
//# sourceMappingURL=FigmaTrigger.node.js.map
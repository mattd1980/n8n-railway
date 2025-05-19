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
var KoBoToolboxTrigger_node_exports = {};
__export(KoBoToolboxTrigger_node_exports, {
  KoBoToolboxTrigger: () => KoBoToolboxTrigger
});
module.exports = __toCommonJS(KoBoToolboxTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_Options = require("./Options");
class KoBoToolboxTrigger {
  constructor() {
    this.description = {
      displayName: "KoBoToolbox Trigger",
      name: "koBoToolboxTrigger",
      icon: "file:koBoToolbox.svg",
      group: ["trigger"],
      version: 1,
      description: "Process KoBoToolbox submissions",
      defaults: {
        name: "KoBoToolbox Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "koBoToolboxApi",
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
          displayName: "Form Name or ID",
          name: "formId",
          type: "options",
          typeOptions: {
            loadOptionsMethod: "loadForms"
          },
          required: true,
          default: "",
          description: 'Form ID (e.g. aSAvYreNzVEkrWg5Gdcvg). Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
        },
        {
          displayName: "Trigger On",
          name: "triggerOn",
          type: "options",
          required: true,
          default: "formSubmission",
          options: [
            {
              name: "On Form Submission",
              value: "formSubmission"
            }
          ]
        },
        { ...import_Options.options }
      ]
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookData = this.getWorkflowStaticData("node");
          const webhookUrl = this.getNodeWebhookUrl("default");
          const formId = this.getNodeParameter("formId");
          const webhooks = await import_GenericFunctions.koBoToolboxApiRequest.call(this, {
            url: `/api/v2/assets/${formId}/hooks/`
          });
          for (const webhook of webhooks || []) {
            if (webhook.endpoint === webhookUrl && webhook.active === true) {
              webhookData.webhookId = webhook.uid;
              return true;
            }
          }
          return false;
        },
        async create() {
          const webhookData = this.getWorkflowStaticData("node");
          const webhookUrl = this.getNodeWebhookUrl("default");
          const workflow = this.getWorkflow();
          const formId = this.getNodeParameter("formId");
          const response = await import_GenericFunctions.koBoToolboxApiRequest.call(this, {
            method: "POST",
            url: `/api/v2/assets/${formId}/hooks/`,
            body: {
              name: `n8n webhook id ${workflow.id}: ${workflow.name}`,
              endpoint: webhookUrl,
              email_notification: true
            }
          });
          if (response.uid) {
            webhookData.webhookId = response.uid;
            return true;
          }
          return false;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          const formId = this.getNodeParameter("formId");
          try {
            await import_GenericFunctions.koBoToolboxApiRequest.call(this, {
              method: "DELETE",
              url: `/api/v2/assets/${formId}/hooks/${webhookData.webhookId}`
            });
          } catch (error) {
            return false;
          }
          delete webhookData.webhookId;
          return true;
        }
      }
    };
    this.methods = {
      loadOptions: {
        loadForms: import_GenericFunctions.loadForms
      }
    };
  }
  async webhook() {
    const req = this.getRequestObject();
    const formatOptions = this.getNodeParameter("formatOptions");
    const responseData = formatOptions.reformat ? (0, import_GenericFunctions.formatSubmission)(
      req.body,
      (0, import_GenericFunctions.parseStringList)(formatOptions.selectMask),
      (0, import_GenericFunctions.parseStringList)(formatOptions.numberMask)
    ) : req.body;
    if (formatOptions.download) {
      return {
        workflowData: [
          [await import_GenericFunctions.downloadAttachments.call(this, responseData, formatOptions)]
        ]
      };
    } else {
      return {
        workflowData: [this.helpers.returnJsonArray([responseData])]
      };
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  KoBoToolboxTrigger
});
//# sourceMappingURL=KoBoToolboxTrigger.node.js.map
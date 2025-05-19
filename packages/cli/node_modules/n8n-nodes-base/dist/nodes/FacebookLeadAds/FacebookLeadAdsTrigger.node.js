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
var FacebookLeadAdsTrigger_node_exports = {};
__export(FacebookLeadAdsTrigger_node_exports, {
  FacebookLeadAdsTrigger: () => FacebookLeadAdsTrigger
});
module.exports = __toCommonJS(FacebookLeadAdsTrigger_node_exports);
var import_crypto = require("crypto");
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_methods = require("./methods");
class FacebookLeadAdsTrigger {
  constructor() {
    this.description = {
      displayName: "Facebook Lead Ads Trigger",
      name: "facebookLeadAdsTrigger",
      icon: "file:facebook.svg",
      group: ["trigger"],
      version: 1,
      subtitle: '={{$parameter["event"]}}',
      description: "Handle Facebook Lead Ads events via webhooks",
      defaults: {
        name: "Facebook Lead Ads Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "facebookLeadAdsOAuth2Api",
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
          displayName: "Due to Facebook API limitations, you can use just one Facebook Lead Ads trigger for each Facebook App",
          name: "facebookLeadAdsNotice",
          type: "notice",
          default: ""
        },
        {
          displayName: "Event",
          name: "event",
          type: "options",
          required: true,
          default: "newLead",
          options: [
            {
              name: "New Lead",
              value: "newLead"
            }
          ]
        },
        {
          displayName: "Page",
          name: "page",
          type: "resourceLocator",
          default: { mode: "list", value: "" },
          required: true,
          description: "The page linked to the form for retrieving new leads",
          modes: [
            {
              displayName: "From List",
              name: "list",
              type: "list",
              typeOptions: {
                searchListMethod: "pageList"
              }
            },
            {
              displayName: "By ID",
              name: "id",
              type: "string",
              placeholder: "121637951029080"
            }
          ]
        },
        {
          displayName: "Form",
          name: "form",
          type: "resourceLocator",
          default: { mode: "list", value: "" },
          required: true,
          description: "The form to monitor for fetching lead details upon submission",
          modes: [
            {
              displayName: "From List",
              name: "list",
              type: "list",
              typeOptions: {
                searchListMethod: "formList"
              }
            },
            {
              displayName: "By ID",
              name: "id",
              type: "string",
              placeholder: "121637951029080"
            }
          ]
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add option",
          default: {},
          options: [
            {
              displayName: "Simplify Output",
              name: "simplifyOutput",
              type: "boolean",
              default: true,
              description: "Whether to return a simplified version of the webhook event instead of all fields"
            }
          ]
        }
      ]
    };
    this.methods = {
      listSearch: import_methods.listSearch
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const credentials = await this.getCredentials("facebookLeadAdsOAuth2Api");
          const appId = credentials.clientId;
          const webhooks = await import_GenericFunctions.appWebhookSubscriptionList.call(this, appId);
          const subscription = webhooks.find(
            (webhook) => webhook.object === "page" && webhook.fields.find((field) => field.name === "leadgen") && webhook.active
          );
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
          const webhookUrl = this.getNodeWebhookUrl("default");
          const credentials = await this.getCredentials("facebookLeadAdsOAuth2Api");
          const appId = credentials.clientId;
          const pageId = this.getNodeParameter("page", "", { extractValue: true });
          const verifyToken = this.getNode().id;
          await import_GenericFunctions.appWebhookSubscriptionCreate.call(this, appId, {
            object: "page",
            callback_url: webhookUrl,
            verify_token: verifyToken,
            fields: ["leadgen"],
            include_values: true
          });
          await import_GenericFunctions.installAppOnPage.call(this, pageId, "leadgen");
          return true;
        },
        async delete() {
          const credentials = await this.getCredentials("facebookLeadAdsOAuth2Api");
          const appId = credentials.clientId;
          await import_GenericFunctions.appWebhookSubscriptionDelete.call(this, appId, "page");
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
    const credentials = await this.getCredentials("facebookLeadAdsOAuth2Api");
    const pageId = this.getNodeParameter("page", "", { extractValue: true });
    const formId = this.getNodeParameter("form", "", { extractValue: true });
    if (this.getWebhookName() === "setup") {
      if (query["hub.challenge"]) {
        if (this.getNode().id !== query["hub.verify_token"]) {
          return {};
        }
        res.status(200).send(query["hub.challenge"]).end();
        return { noWebhookResponse: true };
      }
    }
    const computedSignature = (0, import_crypto.createHmac)("sha256", credentials.clientSecret).update(req.rawBody).digest("hex");
    if (headerData["x-hub-signature-256"] !== `sha256=${computedSignature}`) {
      return {};
    }
    if (bodyData.object !== "page") {
      return {};
    }
    const events = await Promise.all(
      bodyData.entry.map(
        (entry) => entry.changes.filter(
          (change) => change.field === "leadgen" && change.value.page_id === pageId && change.value.form_id === formId
        ).map((change) => change.value)
      ).flat().map(async (event) => {
        const [lead, form] = await Promise.all([
          import_GenericFunctions.facebookEntityDetail.call(
            this,
            event.leadgen_id,
            "field_data,created_time,ad_id,ad_name,adset_id,adset_name,form_id"
          ),
          import_GenericFunctions.facebookEntityDetail.call(
            this,
            event.form_id,
            "id,name,locale,status,page,questions"
          )
        ]);
        const simplifyOutput = this.getNodeParameter("options.simplifyOutput", true);
        if (simplifyOutput) {
          return {
            id: lead.id,
            data: lead.field_data.reduce(
              (acc, field) => ({
                ...acc,
                [field.name]: field.values && field.values.length > 0 ? field.values[0] : null
              }),
              {}
            ),
            form: {
              id: form.id,
              name: form.name,
              locale: form.locale,
              status: form.status
            },
            ad: { id: lead.ad_id, name: lead.ad_name },
            adset: { id: lead.adset_id, name: lead.adset_name },
            page: form.page,
            created_time: lead.created_time
          };
        }
        return {
          id: lead.id,
          field_data: lead.field_data,
          form,
          ad: { id: lead.ad_id, name: lead.ad_name },
          adset: { id: lead.adset_id, name: lead.adset_name },
          page: form.page,
          created_time: lead.created_time,
          event
        };
      })
    );
    if (events.length === 0) {
      return {};
    }
    return {
      workflowData: [this.helpers.returnJsonArray(events)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FacebookLeadAdsTrigger
});
//# sourceMappingURL=FacebookLeadAdsTrigger.node.js.map
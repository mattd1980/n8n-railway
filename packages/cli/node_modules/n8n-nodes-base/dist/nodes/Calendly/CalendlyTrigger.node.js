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
var CalendlyTrigger_node_exports = {};
__export(CalendlyTrigger_node_exports, {
  CalendlyTrigger: () => CalendlyTrigger
});
module.exports = __toCommonJS(CalendlyTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class CalendlyTrigger {
  constructor() {
    this.description = {
      displayName: "Calendly Trigger",
      name: "calendlyTrigger",
      icon: "file:calendly.svg",
      group: ["trigger"],
      version: 1,
      description: "Starts the workflow when Calendly events occur",
      defaults: {
        name: "Calendly Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "calendlyApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["apiKey"]
            }
          }
        },
        {
          name: "calendlyOAuth2Api",
          required: true,
          displayOptions: {
            show: {
              authentication: ["oAuth2"]
            }
          }
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
          displayName: "Authentication",
          name: "authentication",
          type: "options",
          options: [
            {
              // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
              name: "OAuth2 (recommended)",
              value: "oAuth2"
            },
            {
              name: "API Key or Personal Access Token",
              value: "apiKey"
            }
          ],
          default: "apiKey"
        },
        {
          displayName: "Action required: Calendly will discontinue API Key authentication on May 31, 2025. Update node to use OAuth2 authentication now to ensure your workflows continue to work.",
          name: "deprecationNotice",
          type: "notice",
          default: "",
          displayOptions: {
            show: {
              authentication: ["apiKey"]
            }
          }
        },
        {
          displayName: "Scope",
          name: "scope",
          type: "options",
          default: "user",
          required: true,
          hint: "Ignored if you are using an API Key",
          options: [
            {
              name: "Organization",
              value: "organization",
              description: "Triggers the webhook for all subscribed events within the organization"
            },
            {
              name: "User",
              value: "user",
              description: "Triggers the webhook for subscribed events that belong to the current user"
            }
          ]
        },
        {
          displayName: "Events",
          name: "events",
          type: "multiOptions",
          options: [
            {
              name: "Event Created",
              value: "invitee.created",
              description: "Receive notifications when a new Calendly event is created"
            },
            {
              name: "Event Canceled",
              value: "invitee.canceled",
              description: "Receive notifications when a Calendly event is canceled"
            }
          ],
          default: [],
          required: true
        }
      ]
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          const events = this.getNodeParameter("events");
          const authenticationType = await import_GenericFunctions.getAuthenticationType.call(this);
          if (authenticationType === "apiKey") {
            const endpoint = "/hooks";
            const { data } = await import_GenericFunctions.calendlyApiRequest.call(this, "GET", endpoint, {});
            for (const webhook of data) {
              if (webhook.attributes.url === webhookUrl) {
                for (const event of events) {
                  if (!webhook.attributes.events.includes(event)) {
                    return false;
                  }
                }
              }
              webhookData.webhookId = webhook.id;
              return true;
            }
          }
          if (authenticationType === "accessToken") {
            const scope = this.getNodeParameter("scope", 0);
            const { resource } = await import_GenericFunctions.calendlyApiRequest.call(this, "GET", "/users/me");
            const qs = {};
            if (scope === "user") {
              qs.scope = "user";
              qs.organization = resource.current_organization;
              qs.user = resource.uri;
            }
            if (scope === "organization") {
              qs.scope = "organization";
              qs.organization = resource.current_organization;
            }
            const endpoint = "/webhook_subscriptions";
            const { collection } = await import_GenericFunctions.calendlyApiRequest.call(this, "GET", endpoint, {}, qs);
            for (const webhook of collection) {
              if (webhook.callback_url === webhookUrl && events.length === webhook.events.length && events.every((event) => webhook.events.includes(event))) {
                webhookData.webhookURI = webhook.uri;
                return true;
              }
            }
          }
          return false;
        },
        async create() {
          const webhookData = this.getWorkflowStaticData("node");
          const webhookUrl = this.getNodeWebhookUrl("default");
          const events = this.getNodeParameter("events");
          const authenticationType = await import_GenericFunctions.getAuthenticationType.call(this);
          if (authenticationType === "apiKey") {
            const endpoint = "/hooks";
            const body = {
              url: webhookUrl,
              events
            };
            const responseData = await import_GenericFunctions.calendlyApiRequest.call(this, "POST", endpoint, body);
            if (responseData.id === void 0) {
              return false;
            }
            webhookData.webhookId = responseData.id;
          }
          if (authenticationType === "accessToken") {
            const scope = this.getNodeParameter("scope", 0);
            const { resource } = await import_GenericFunctions.calendlyApiRequest.call(this, "GET", "/users/me");
            const body = {
              url: webhookUrl,
              events,
              organization: resource.current_organization,
              scope
            };
            if (scope === "user") {
              body.user = resource.uri;
            }
            const endpoint = "/webhook_subscriptions";
            const responseData = await import_GenericFunctions.calendlyApiRequest.call(this, "POST", endpoint, body);
            if (responseData?.resource === void 0 || responseData?.resource?.uri === void 0) {
              return false;
            }
            webhookData.webhookURI = responseData.resource.uri;
          }
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          const authenticationType = await import_GenericFunctions.getAuthenticationType.call(this);
          if (authenticationType === "apiKey") {
            if (webhookData.webhookId !== void 0) {
              const endpoint = `/hooks/${webhookData.webhookId}`;
              try {
                await import_GenericFunctions.calendlyApiRequest.call(this, "DELETE", endpoint);
              } catch (error) {
                return false;
              }
              delete webhookData.webhookId;
            }
          }
          if (authenticationType === "accessToken") {
            if (webhookData.webhookURI !== void 0) {
              try {
                await import_GenericFunctions.calendlyApiRequest.call(
                  this,
                  "DELETE",
                  "",
                  {},
                  {},
                  webhookData.webhookURI
                );
              } catch (error) {
                return false;
              }
              delete webhookData.webhookURI;
            }
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
  CalendlyTrigger
});
//# sourceMappingURL=CalendlyTrigger.node.js.map
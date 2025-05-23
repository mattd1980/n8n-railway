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
var HubspotTrigger_node_exports = {};
__export(HubspotTrigger_node_exports, {
  HubspotTrigger: () => HubspotTrigger
});
module.exports = __toCommonJS(HubspotTrigger_node_exports);
var import_crypto = require("crypto");
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./V1/GenericFunctions");
class HubspotTrigger {
  constructor() {
    this.description = {
      displayName: "HubSpot Trigger",
      name: "hubspotTrigger",
      icon: "file:hubspot.svg",
      group: ["trigger"],
      version: 1,
      description: "Starts the workflow when HubSpot events occur",
      defaults: {
        name: "HubSpot Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "hubspotDeveloperApi",
          required: true
        }
      ],
      webhooks: [
        {
          name: "default",
          httpMethod: "POST",
          responseMode: "onReceived",
          path: "webhook"
        },
        {
          name: "setup",
          httpMethod: "GET",
          responseMode: "onReceived",
          path: "webhook"
        }
      ],
      properties: [
        {
          displayName: "Events",
          name: "eventsUi",
          type: "fixedCollection",
          typeOptions: {
            multipleValues: true
          },
          placeholder: "Add Event",
          default: {},
          options: [
            {
              displayName: "Event",
              name: "eventValues",
              values: [
                {
                  displayName: "Name",
                  name: "name",
                  type: "options",
                  options: [
                    {
                      name: "Company Created",
                      value: "company.creation",
                      description: "To get notified if any company is created in a customer's account"
                    },
                    {
                      name: "Company Deleted",
                      value: "company.deletion",
                      description: "To get notified if any company is deleted in a customer's account"
                    },
                    {
                      name: "Company Property Changed",
                      value: "company.propertyChange",
                      description: "To get notified if a specified property is changed for any company in a customer's account"
                    },
                    {
                      name: "Contact Created",
                      value: "contact.creation",
                      description: "To get notified if any contact is created in a customer's account"
                    },
                    {
                      name: "Contact Deleted",
                      value: "contact.deletion",
                      description: "To get notified if any contact is deleted in a customer's account"
                    },
                    {
                      name: "Contact Privacy Deleted",
                      value: "contact.privacyDeletion",
                      description: "To get notified if a contact is deleted for privacy compliance reasons"
                    },
                    {
                      name: "Contact Property Changed",
                      value: "contact.propertyChange",
                      description: "To get notified if a specified property is changed for any contact in a customer's account"
                    },
                    {
                      name: "Conversation Creation",
                      value: "conversation.creation",
                      description: "To get notified if a new thread is created in an account"
                    },
                    {
                      name: "Conversation Deletion",
                      value: "conversation.deletion",
                      description: "To get notified if a thread is archived or soft-deleted in an account"
                    },
                    {
                      name: "Conversation New Message",
                      value: "conversation.newMessage",
                      description: "To get notified if a new message on a thread has been received"
                    },
                    {
                      name: "Conversation Privacy Deletion",
                      value: "conversation.privacyDeletion",
                      description: "To get notified if a thread is permanently deleted in an account"
                    },
                    {
                      name: "Conversation Property Change",
                      value: "conversation.propertyChange",
                      description: "To get notified if a property on a thread has been changed"
                    },
                    {
                      name: "Deal Created",
                      value: "deal.creation",
                      description: "To get notified if any deal is created in a customer's account"
                    },
                    {
                      name: "Deal Deleted",
                      value: "deal.deletion",
                      description: "To get notified if any deal is deleted in a customer's account"
                    },
                    {
                      name: "Deal Property Changed",
                      value: "deal.propertyChange",
                      description: "To get notified if a specified property is changed for any deal in a customer's account"
                    },
                    {
                      name: "Ticket Created",
                      value: "ticket.creation",
                      description: "To get notified if a ticket is created in a customer's account"
                    },
                    {
                      name: "Ticket Deleted",
                      value: "ticket.deletion",
                      description: "To get notified if any ticket is deleted in a customer's account"
                    },
                    {
                      name: "Ticket Property Changed",
                      value: "ticket.propertyChange",
                      description: "To get notified if a specified property is changed for any ticket in a customer's account"
                    }
                  ],
                  default: "contact.creation",
                  required: true
                },
                {
                  displayName: "Property Name or ID",
                  name: "property",
                  type: "options",
                  description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                  typeOptions: {
                    loadOptionsDependsOn: ["contact.propertyChange"],
                    loadOptionsMethod: "getContactProperties"
                  },
                  displayOptions: {
                    show: {
                      name: ["contact.propertyChange"]
                    }
                  },
                  default: "",
                  required: true
                },
                {
                  displayName: "Property Name or ID",
                  name: "property",
                  type: "options",
                  description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                  typeOptions: {
                    loadOptionsDependsOn: ["company.propertyChange"],
                    loadOptionsMethod: "getCompanyProperties"
                  },
                  displayOptions: {
                    show: {
                      name: ["company.propertyChange"]
                    }
                  },
                  default: "",
                  required: true
                },
                {
                  displayName: "Property Name or ID",
                  name: "property",
                  type: "options",
                  description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                  typeOptions: {
                    loadOptionsDependsOn: ["deal.propertyChange"],
                    loadOptionsMethod: "getDealProperties"
                  },
                  displayOptions: {
                    show: {
                      name: ["deal.propertyChange"]
                    }
                  },
                  default: "",
                  required: true
                }
              ]
            }
          ]
        },
        {
          displayName: "Additional Fields",
          name: "additionalFields",
          type: "collection",
          placeholder: "Add Field",
          default: {},
          options: [
            {
              displayName: "Max Concurrent Requests",
              name: "maxConcurrentRequests",
              type: "number",
              typeOptions: {
                minValue: 5
              },
              default: 5
            }
          ]
        }
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the available contacts to display them to user so that they can
        // select them easily
        async getContactProperties() {
          const returnData = [];
          const endpoint = "/properties/v2/contacts/properties";
          const properties = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {});
          for (const property of properties) {
            const propertyName = property.label;
            const propertyId = property.name;
            returnData.push({
              name: propertyName,
              value: propertyId
            });
          }
          return returnData;
        },
        // Get all the available companies to display them to user so that they can
        // select them easily
        async getCompanyProperties() {
          const returnData = [];
          const endpoint = "/properties/v2/companies/properties";
          const properties = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {});
          for (const property of properties) {
            const propertyName = property.label;
            const propertyId = property.name;
            returnData.push({
              name: propertyName,
              value: propertyId
            });
          }
          return returnData;
        },
        // Get all the available deals to display them to user so that they can
        // select them easily
        async getDealProperties() {
          const returnData = [];
          const endpoint = "/properties/v2/deals/properties";
          const properties = await import_GenericFunctions.hubspotApiRequest.call(this, "GET", endpoint, {});
          for (const property of properties) {
            const propertyName = property.label;
            const propertyId = property.name;
            returnData.push({
              name: propertyName,
              value: propertyId
            });
          }
          return returnData;
        }
      }
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const currentWebhookUrl = this.getNodeWebhookUrl("default");
          const { appId } = await this.getCredentials("hubspotDeveloperApi");
          try {
            const { targetUrl } = await import_GenericFunctions.hubspotApiRequest.call(
              this,
              "GET",
              `/webhooks/v3/${appId}/settings`,
              {}
            );
            if (targetUrl !== currentWebhookUrl) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                `The APP ID ${appId} already has a target url ${targetUrl}. Delete it or use another APP ID before executing the trigger. Due to Hubspot API limitations, you can have just one trigger per APP.`
              );
            }
          } catch (error) {
            if (error.statusCode === 404) {
              return false;
            }
          }
          const { results: subscriptions } = await import_GenericFunctions.hubspotApiRequest.call(
            this,
            "GET",
            `/webhooks/v3/${appId}/subscriptions`,
            {}
          );
          for (const subscription of subscriptions) {
            await import_GenericFunctions.hubspotApiRequest.call(
              this,
              "DELETE",
              `/webhooks/v3/${appId}/subscriptions/${subscription.id}`,
              {}
            );
          }
          await import_GenericFunctions.hubspotApiRequest.call(this, "DELETE", `/webhooks/v3/${appId}/settings`, {});
          return false;
        },
        async create() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const { appId } = await this.getCredentials("hubspotDeveloperApi");
          const events = this.getNodeParameter("eventsUi")?.eventValues || [];
          const additionalFields = this.getNodeParameter("additionalFields");
          let endpoint = `/webhooks/v3/${appId}/settings`;
          let body = {
            targetUrl: webhookUrl,
            maxConcurrentRequests: additionalFields.maxConcurrentRequests || 5
          };
          await import_GenericFunctions.hubspotApiRequest.call(this, "PUT", endpoint, body);
          endpoint = `/webhooks/v3/${appId}/subscriptions`;
          if (Array.isArray(events) && events.length === 0) {
            throw new import_n8n_workflow.NodeOperationError(this.getNode(), "You must define at least one event");
          }
          for (const event of events) {
            body = {
              eventType: event.name,
              active: true
            };
            if (import_GenericFunctions.propertyEvents.includes(event.name)) {
              const property = event.property;
              body.propertyName = property;
            }
            await import_GenericFunctions.hubspotApiRequest.call(this, "POST", endpoint, body);
          }
          return true;
        },
        async delete() {
          const { appId } = await this.getCredentials("hubspotDeveloperApi");
          const { results: subscriptions } = await import_GenericFunctions.hubspotApiRequest.call(
            this,
            "GET",
            `/webhooks/v3/${appId}/subscriptions`,
            {}
          );
          for (const subscription of subscriptions) {
            await import_GenericFunctions.hubspotApiRequest.call(
              this,
              "DELETE",
              `/webhooks/v3/${appId}/subscriptions/${subscription.id}`,
              {}
            );
          }
          try {
            await import_GenericFunctions.hubspotApiRequest.call(this, "DELETE", `/webhooks/v3/${appId}/settings`, {});
          } catch (error) {
            return false;
          }
          return true;
        }
      }
    };
  }
  async webhook() {
    const credentials = await this.getCredentials("hubspotDeveloperApi");
    if (credentials === void 0) {
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), "No credentials found!");
    }
    const req = this.getRequestObject();
    const bodyData = req.body;
    const headerData = this.getHeaderData();
    if (headerData["x-hubspot-signature"] === void 0) {
      return {};
    }
    const hash = `${credentials.clientSecret}${JSON.stringify(bodyData)}`;
    const signature = (0, import_crypto.createHash)("sha256").update(hash).digest("hex");
    if (signature !== headerData["x-hubspot-signature"]) {
      return {};
    }
    for (let i = 0; i < bodyData.length; i++) {
      const subscriptionType = bodyData[i].subscriptionType;
      if (subscriptionType.includes("contact")) {
        bodyData[i].contactId = bodyData[i].objectId;
      }
      if (subscriptionType.includes("company")) {
        bodyData[i].companyId = bodyData[i].objectId;
      }
      if (subscriptionType.includes("deal")) {
        bodyData[i].dealId = bodyData[i].objectId;
      }
      if (subscriptionType.includes("ticket")) {
        bodyData[i].ticketId = bodyData[i].objectId;
      }
      delete bodyData[i].objectId;
    }
    return {
      workflowData: [this.helpers.returnJsonArray(bodyData)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HubspotTrigger
});
//# sourceMappingURL=HubspotTrigger.node.js.map
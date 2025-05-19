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
var EventbriteTrigger_node_exports = {};
__export(EventbriteTrigger_node_exports, {
  EventbriteTrigger: () => EventbriteTrigger
});
module.exports = __toCommonJS(EventbriteTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class EventbriteTrigger {
  constructor() {
    this.description = {
      displayName: "Eventbrite Trigger",
      name: "eventbriteTrigger",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:eventbrite.png",
      group: ["trigger"],
      version: 1,
      description: "Handle Eventbrite events via webhooks",
      subtitle: '={{$parameter["event"]}}',
      defaults: {
        name: "Eventbrite Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "eventbriteApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["privateKey"]
            }
          }
        },
        {
          name: "eventbriteOAuth2Api",
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
              name: "Private Key",
              value: "privateKey"
            },
            {
              name: "OAuth2",
              value: "oAuth2"
            }
          ],
          default: "privateKey"
        },
        {
          displayName: "Organization Name or ID",
          name: "organization",
          type: "options",
          required: true,
          typeOptions: {
            loadOptionsMethod: "getOrganizations"
          },
          default: "",
          description: 'The Eventbrite Organization to work on. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
        },
        {
          displayName: "Event Name or ID",
          name: "event",
          type: "options",
          required: true,
          typeOptions: {
            loadOptionsDependsOn: ["organization"],
            loadOptionsMethod: "getEvents"
          },
          default: "",
          description: 'Limit the triggers to this event. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
        },
        {
          displayName: "Actions",
          name: "actions",
          type: "multiOptions",
          options: [
            {
              name: "attendee.checked_in",
              value: "attendee.checked_in"
            },
            {
              name: "attendee.checked_out",
              value: "attendee.checked_out"
            },
            {
              name: "attendee.updated",
              value: "attendee.updated"
            },
            {
              name: "event.created",
              value: "event.created"
            },
            {
              name: "event.published",
              value: "event.published"
            },
            {
              name: "event.unpublished",
              value: "event.unpublished"
            },
            {
              name: "event.updated",
              value: "event.updated"
            },
            {
              name: "order.placed",
              value: "order.placed"
            },
            {
              name: "order.refunded",
              value: "order.refunded"
            },
            {
              name: "order.updated",
              value: "order.updated"
            },
            {
              name: "organizer.updated",
              value: "organizer.updated"
            },
            {
              name: "ticket_class.created",
              value: "ticket_class.created"
            },
            {
              name: "ticket_class.deleted",
              value: "ticket_class.deleted"
            },
            {
              name: "ticket_class.updated",
              value: "ticket_class.updated"
            },
            {
              name: "venue.updated",
              value: "venue.updated"
            }
          ],
          required: true,
          default: [],
          description: "One or more action to subscribe to"
        },
        {
          displayName: "Resolve Data",
          name: "resolveData",
          type: "boolean",
          default: true,
          // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
          description: "By default does the webhook-data only contain the URL to receive the object data manually. If this option gets activated, it will resolve the data automatically."
        }
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the available organizations to display them to user so that they can
        // select them easily
        async getOrganizations() {
          const returnData = [];
          const organizations = await import_GenericFunctions.eventbriteApiRequestAllItems.call(
            this,
            "organizations",
            "GET",
            "/users/me/organizations"
          );
          for (const organization of organizations) {
            const organizationName = organization.name;
            const organizationId = organization.id;
            returnData.push({
              name: organizationName,
              value: organizationId
            });
          }
          return returnData;
        },
        // Get all the available events to display them to user so that they can
        // select them easily
        async getEvents() {
          const returnData = [{ name: "All", value: "all" }];
          const organization = this.getCurrentNodeParameter("organization");
          const events = await import_GenericFunctions.eventbriteApiRequestAllItems.call(
            this,
            "events",
            "GET",
            `/organizations/${organization}/events`
          );
          for (const event of events) {
            const eventName = event.name.text;
            const eventId = event.id;
            returnData.push({
              name: eventName,
              value: eventId
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
          const webhookUrl = this.getNodeWebhookUrl("default");
          const organisation = this.getNodeParameter("organization");
          const actions = this.getNodeParameter("actions");
          const endpoint = `/organizations/${organisation}/webhooks/`;
          const { webhooks } = await import_GenericFunctions.eventbriteApiRequest.call(this, "GET", endpoint);
          const check = (currentActions, webhookActions) => {
            for (const currentAction of currentActions) {
              if (!webhookActions.includes(currentAction)) {
                return false;
              }
            }
            return true;
          };
          for (const webhook of webhooks) {
            if (webhook.endpoint_url === webhookUrl && check(actions, webhook.actions)) {
              webhookData.webhookId = webhook.id;
              return true;
            }
          }
          return false;
        },
        async create() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          const organisation = this.getNodeParameter("organization");
          const event = this.getNodeParameter("event");
          const actions = this.getNodeParameter("actions");
          const endpoint = `/organizations/${organisation}/webhooks/`;
          const body = {
            endpoint_url: webhookUrl,
            actions: actions.join(","),
            event_id: event
          };
          if (event === "all" || event === "") {
            delete body.event_id;
          }
          const responseData = await import_GenericFunctions.eventbriteApiRequest.call(this, "POST", endpoint, body);
          webhookData.webhookId = responseData.id;
          return true;
        },
        async delete() {
          let responseData;
          const webhookData = this.getWorkflowStaticData("node");
          const endpoint = `/webhooks/${webhookData.webhookId}/`;
          try {
            responseData = await import_GenericFunctions.eventbriteApiRequest.call(this, "DELETE", endpoint);
          } catch (error) {
            return false;
          }
          if (!responseData.success) {
            return false;
          }
          delete webhookData.webhookId;
          return true;
        }
      }
    };
  }
  async webhook() {
    const req = this.getRequestObject();
    if (req.body.api_url === void 0) {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), req.body, {
        message: 'The received data does not contain required "api_url" property!'
      });
    }
    const resolveData = this.getNodeParameter("resolveData", false);
    if (!resolveData) {
      return {
        workflowData: [this.helpers.returnJsonArray(req.body)]
      };
    }
    if (req.body.api_url.includes("api-endpoint-to-fetch-object-details")) {
      return {
        workflowData: [
          this.helpers.returnJsonArray({
            placeholder: "Test received. To display actual data of object get the webhook triggered by performing the action which triggers it."
          })
        ]
      };
    }
    const responseData = await import_GenericFunctions.eventbriteApiRequest.call(
      this,
      "GET",
      "",
      {},
      void 0,
      req.body.api_url
    );
    return {
      workflowData: [this.helpers.returnJsonArray(responseData)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EventbriteTrigger
});
//# sourceMappingURL=EventbriteTrigger.node.js.map
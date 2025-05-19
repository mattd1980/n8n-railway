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
var ZendeskTrigger_node_exports = {};
__export(ZendeskTrigger_node_exports, {
  ZendeskTrigger: () => ZendeskTrigger
});
module.exports = __toCommonJS(ZendeskTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_ConditionDescription = require("./ConditionDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_TriggerPlaceholders = require("./TriggerPlaceholders");
class ZendeskTrigger {
  constructor() {
    this.description = {
      displayName: "Zendesk Trigger",
      name: "zendeskTrigger",
      icon: "file:zendesk.svg",
      group: ["trigger"],
      version: 1,
      description: "Handle Zendesk events via webhooks",
      defaults: {
        name: "Zendesk Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "zendeskApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["apiToken"]
            }
          }
        },
        {
          name: "zendeskOAuth2Api",
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
              name: "API Token",
              value: "apiToken"
            },
            {
              name: "OAuth2",
              value: "oAuth2"
            }
          ],
          default: "apiToken"
        },
        {
          displayName: "Service",
          name: "service",
          type: "options",
          required: true,
          options: [
            {
              name: "Support",
              value: "support"
            }
          ],
          default: "support"
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          displayOptions: {
            show: {
              service: ["support"]
            }
          },
          default: {},
          options: [
            {
              displayName: "Field Names or IDs",
              name: "fields",
              description: 'The fields to return the values of. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
              type: "multiOptions",
              default: [],
              typeOptions: {
                loadOptionsMethod: "getFields"
              }
            }
          ],
          placeholder: "Add option"
        },
        {
          displayName: "Conditions",
          name: "conditions",
          placeholder: "Add Condition",
          type: "fixedCollection",
          typeOptions: {
            multipleValues: true
          },
          displayOptions: {
            show: {
              service: ["support"]
            }
          },
          description: "The condition to set",
          default: {},
          options: [
            {
              name: "all",
              displayName: "All",
              values: [...import_ConditionDescription.conditionFields]
            },
            {
              name: "any",
              displayName: "Any",
              values: [...import_ConditionDescription.conditionFields]
            }
          ]
        }
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the fields to display them to user so that they can
        // select them easily
        async getFields() {
          const returnData = import_TriggerPlaceholders.triggerPlaceholders;
          const customFields = [
            "text",
            "textarea",
            "date",
            "integer",
            "decimal",
            "regexp",
            "multiselect",
            "tagger"
          ];
          const fields = await import_GenericFunctions.zendeskApiRequestAllItems.call(
            this,
            "ticket_fields",
            "GET",
            "/ticket_fields"
          );
          for (const field of fields) {
            if (customFields.includes(field.type) && field.removable && field.active) {
              const fieldName = field.title;
              const fieldId = field.id;
              returnData.push({
                name: fieldName,
                value: `ticket.ticket_field_${fieldId}`,
                description: `Custom field ${fieldName}`
              });
            }
          }
          return returnData;
        },
        // Get all the groups to display them to user so that they can
        // select them easily
        async getGroups() {
          const returnData = [];
          const groups = await import_GenericFunctions.zendeskApiRequestAllItems.call(this, "groups", "GET", "/groups");
          for (const group of groups) {
            const groupName = group.name;
            const groupId = group.id;
            returnData.push({
              name: groupName,
              value: groupId
            });
          }
          return returnData;
        },
        // Get all the users to display them to user so that they can
        // select them easily
        async getUsers() {
          const returnData = [];
          const users = await import_GenericFunctions.zendeskApiRequestAllItems.call(this, "users", "GET", "/users");
          for (const user of users) {
            const userName = user.name;
            const userId = user.id;
            returnData.push({
              name: userName,
              value: userId
            });
          }
          returnData.push({
            name: "Current User",
            value: "current_user"
          });
          returnData.push({
            name: "Requester",
            value: "requester_id"
          });
          return returnData;
        }
      }
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          const conditions = this.getNodeParameter("conditions");
          let endpoint = "";
          const resultAll = [], resultAny = [];
          const conditionsAll = conditions.all;
          if (conditionsAll) {
            for (const conditionAll of conditionsAll) {
              const aux = {};
              aux.field = conditionAll.field;
              aux.operator = conditionAll.operation;
              if (conditionAll.operation !== "changed" && conditionAll.operation !== "not_changed") {
                aux.value = conditionAll.value;
              } else {
                aux.value = null;
              }
              resultAll.push(aux);
            }
          }
          const conditionsAny = conditions.any;
          if (conditionsAny) {
            for (const conditionAny of conditionsAny) {
              const aux = {};
              aux.field = conditionAny.field;
              aux.operator = conditionAny.operation;
              if (conditionAny.operation !== "changed" && conditionAny.operation !== "not_changed") {
                aux.value = conditionAny.value;
              } else {
                aux.value = null;
              }
              resultAny.push(aux);
            }
          }
          const { webhooks } = await import_GenericFunctions.zendeskApiRequest.call(this, "GET", "/webhooks");
          for (const webhook of webhooks) {
            if (webhook.endpoint === webhookUrl) {
              webhookData.targetId = webhook.id;
              break;
            }
          }
          if (webhookData.targetId === void 0) {
            return false;
          }
          endpoint = "/triggers/active";
          const triggers = await import_GenericFunctions.zendeskApiRequestAllItems.call(this, "triggers", "GET", endpoint);
          for (const trigger of triggers) {
            const toDeleteTriggers = [];
            if (trigger.actions[0].value[0].toString() === webhookData.targetId?.toString()) {
              toDeleteTriggers.push(trigger.id);
            }
            if (toDeleteTriggers.length !== 0) {
              await import_GenericFunctions.zendeskApiRequest.call(
                this,
                "DELETE",
                "/triggers/destroy_many",
                {},
                { ids: toDeleteTriggers.join(",") }
              );
            }
          }
          return false;
        },
        async create() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          const service = this.getNodeParameter("service");
          if (service === "support") {
            const message = {};
            const resultAll = [], resultAny = [];
            const conditions = this.getNodeParameter("conditions");
            const options = this.getNodeParameter("options");
            if (Object.keys(conditions).length === 0) {
              throw new import_n8n_workflow.NodeOperationError(this.getNode(), "You must have at least one condition");
            }
            if (options.fields) {
              for (const field of options.fields) {
                message[field] = `{{${field}}}`;
              }
            } else {
              message["ticket.id"] = "{{ticket.id}}";
            }
            const conditionsAll = conditions.all;
            if (conditionsAll) {
              for (const conditionAll of conditionsAll) {
                const aux = {};
                aux.field = conditionAll.field;
                aux.operator = conditionAll.operation;
                if (conditionAll.operation !== "changed" && conditionAll.operation !== "not_changed") {
                  aux.value = conditionAll.value;
                } else {
                  aux.value = null;
                }
                resultAll.push(aux);
              }
            }
            const conditionsAny = conditions.any;
            if (conditionsAny) {
              for (const conditionAny of conditionsAny) {
                const aux = {};
                aux.field = conditionAny.field;
                aux.operator = conditionAny.operation;
                if (conditionAny.operation !== "changed" && conditionAny.operation !== "not_changed") {
                  aux.value = conditionAny.value;
                } else {
                  aux.value = null;
                }
                resultAny.push(aux);
              }
            }
            const urlParts = new URL(webhookUrl);
            const bodyTrigger = {
              trigger: {
                title: `n8n-webhook:${urlParts.pathname}`,
                conditions: {
                  all: resultAll,
                  any: resultAny
                },
                actions: [
                  {
                    field: "notification_webhook",
                    value: []
                  }
                ]
              }
            };
            const bodyTarget = {
              webhook: {
                name: "n8n webhook",
                endpoint: webhookUrl,
                http_method: "POST",
                status: "active",
                request_format: "json",
                subscriptions: ["conditional_ticket_events"]
              }
            };
            let target = {};
            if (webhookData.targetId !== void 0) {
              target.id = webhookData.targetId;
            } else {
              target = (await import_GenericFunctions.zendeskApiRequest.call(this, "POST", "/webhooks", bodyTarget)).webhook;
            }
            bodyTrigger.trigger.actions[0].value = [
              target.id,
              JSON.stringify(message)
            ];
            const { trigger } = await import_GenericFunctions.zendeskApiRequest.call(this, "POST", "/triggers", bodyTrigger);
            webhookData.webhookId = trigger.id;
            webhookData.targetId = target.id;
          }
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          try {
            await import_GenericFunctions.zendeskApiRequest.call(this, "DELETE", `/triggers/${webhookData.webhookId}`);
            await import_GenericFunctions.zendeskApiRequest.call(this, "DELETE", `/webhooks/${webhookData.targetId}`);
          } catch (error) {
            return false;
          }
          delete webhookData.triggerId;
          delete webhookData.targetId;
          return true;
        }
      }
    };
  }
  async webhook() {
    const req = this.getRequestObject();
    return {
      workflowData: [this.helpers.returnJsonArray(req.body)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ZendeskTrigger
});
//# sourceMappingURL=ZendeskTrigger.node.js.map
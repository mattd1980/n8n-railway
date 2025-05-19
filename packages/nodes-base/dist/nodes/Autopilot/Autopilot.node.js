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
var Autopilot_node_exports = {};
__export(Autopilot_node_exports, {
  Autopilot: () => Autopilot
});
module.exports = __toCommonJS(Autopilot_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_ContactDescription = require("./ContactDescription");
var import_ContactJourneyDescription = require("./ContactJourneyDescription");
var import_ContactListDescription = require("./ContactListDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_ListDescription = require("./ListDescription");
class Autopilot {
  constructor() {
    this.description = {
      displayName: "Autopilot",
      name: "autopilot",
      icon: "file:autopilot.svg",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Autopilot API",
      defaults: {
        name: "Autopilot"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "autopilotApi",
          required: true
        }
      ],
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Contact",
              value: "contact"
            },
            {
              name: "Contact Journey",
              value: "contactJourney"
            },
            {
              name: "Contact List",
              value: "contactList"
            },
            {
              name: "List",
              value: "list"
            }
          ],
          default: "contact"
        },
        ...import_ContactDescription.contactOperations,
        ...import_ContactDescription.contactFields,
        ...import_ContactJourneyDescription.contactJourneyOperations,
        ...import_ContactJourneyDescription.contactJourneyFields,
        ...import_ContactListDescription.contactListOperations,
        ...import_ContactListDescription.contactListFields,
        ...import_ListDescription.listOperations,
        ...import_ListDescription.listFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getCustomFields() {
          const returnData = [];
          const customFields = await import_GenericFunctions.autopilotApiRequest.call(this, "GET", "/contacts/custom_fields");
          for (const customField of customFields) {
            returnData.push({
              name: customField.name,
              value: `${customField.name}-${customField.fieldType}`
            });
          }
          return returnData;
        },
        async getLists() {
          const returnData = [];
          const { lists } = await import_GenericFunctions.autopilotApiRequest.call(this, "GET", "/lists");
          for (const list of lists) {
            returnData.push({
              name: list.title,
              value: list.list_id
            });
          }
          return returnData;
        },
        async getTriggers() {
          const returnData = [];
          const { triggers } = await import_GenericFunctions.autopilotApiRequest.call(this, "GET", "/triggers");
          for (const trigger of triggers) {
            returnData.push({
              name: trigger.journey,
              value: trigger.trigger_id
            });
          }
          return returnData;
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    const qs = {};
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "contact") {
          if (operation === "upsert") {
            const email = this.getNodeParameter("email", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              Email: email
            };
            Object.assign(body, additionalFields);
            if (body.customFieldsUi) {
              const customFieldsValues = body.customFieldsUi.customFieldsValues;
              body.custom = {};
              for (const customField of customFieldsValues) {
                const [name, fieldType] = customField.key.split("-");
                const fieldName = name.replace(/\s/g, "--");
                body.custom[`${fieldType}--${fieldName}`] = customField.value;
              }
              delete body.customFieldsUi;
            }
            if (body.autopilotList) {
              body._autopilot_list = body.autopilotList;
              delete body.autopilotList;
            }
            if (body.autopilotSessionId) {
              body._autopilot_session_id = body.autopilotSessionId;
              delete body.autopilotSessionId;
            }
            if (body.newEmail) {
              body._NewEmail = body.newEmail;
              delete body.newEmail;
            }
            responseData = await import_GenericFunctions.autopilotApiRequest.call(this, "POST", "/contact", {
              contact: body
            });
          }
          if (operation === "delete") {
            const contactId = this.getNodeParameter("contactId", i);
            responseData = await import_GenericFunctions.autopilotApiRequest.call(this, "DELETE", `/contact/${contactId}`);
            responseData = { success: true };
          }
          if (operation === "get") {
            const contactId = this.getNodeParameter("contactId", i);
            responseData = await import_GenericFunctions.autopilotApiRequest.call(this, "GET", `/contact/${contactId}`);
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            if (!returnAll) {
              qs.limit = this.getNodeParameter("limit", i);
            }
            responseData = await import_GenericFunctions.autopilotApiRequestAllItems.call(
              this,
              "contacts",
              "GET",
              "/contacts",
              {},
              qs
            );
            if (!returnAll) {
              responseData = responseData.splice(0, qs.limit);
            }
          }
        }
        if (resource === "contactJourney") {
          if (operation === "add") {
            const triggerId = this.getNodeParameter("triggerId", i);
            const contactId = this.getNodeParameter("contactId", i);
            responseData = await import_GenericFunctions.autopilotApiRequest.call(
              this,
              "POST",
              `/trigger/${triggerId}/contact/${contactId}`
            );
            responseData = { success: true };
          }
        }
        if (resource === "contactList") {
          if (["add", "remove", "exist"].includes(operation)) {
            const listId = this.getNodeParameter("listId", i);
            const contactId = this.getNodeParameter("contactId", i);
            const method = {
              add: "POST",
              remove: "DELETE",
              exist: "GET"
            };
            const endpoint = `/list/${listId}/contact/${contactId}`;
            if (operation === "exist") {
              try {
                await import_GenericFunctions.autopilotApiRequest.call(this, method[operation], endpoint);
                responseData = { exist: true };
              } catch (error) {
                responseData = { exist: false };
              }
            } else if (operation === "add" || operation === "remove") {
              responseData = await import_GenericFunctions.autopilotApiRequest.call(this, method[operation], endpoint);
              responseData.success = true;
            }
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const listId = this.getNodeParameter("listId", i);
            if (!returnAll) {
              qs.limit = this.getNodeParameter("limit", i);
            }
            responseData = await import_GenericFunctions.autopilotApiRequestAllItems.call(
              this,
              "contacts",
              "GET",
              `/list/${listId}/contacts`,
              {},
              qs
            );
            if (!returnAll) {
              responseData = responseData.splice(0, qs.limit);
            }
          }
        }
        if (resource === "list") {
          if (operation === "create") {
            const name = this.getNodeParameter("name", i);
            const body = {
              name
            };
            responseData = await import_GenericFunctions.autopilotApiRequest.call(this, "POST", "/list", body);
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            if (!returnAll) {
              qs.limit = this.getNodeParameter("limit", i);
            }
            responseData = await import_GenericFunctions.autopilotApiRequest.call(this, "GET", "/lists");
            responseData = responseData.lists;
            if (!returnAll) {
              responseData = responseData.splice(0, qs.limit);
            }
          }
        }
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          const exectionErrorWithMetaData = this.helpers.constructExecutionMetaData(
            [{ json: { error: error.message } }],
            { itemData: { item: i } }
          );
          responseData.push(...exectionErrorWithMetaData);
          continue;
        }
        throw error;
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Autopilot
});
//# sourceMappingURL=Autopilot.node.js.map
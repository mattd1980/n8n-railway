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
var Drift_node_exports = {};
__export(Drift_node_exports, {
  Drift: () => Drift
});
module.exports = __toCommonJS(Drift_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_ContactDescription = require("./ContactDescription");
var import_GenericFunctions = require("./GenericFunctions");
class Drift {
  constructor() {
    this.description = {
      displayName: "Drift",
      name: "drift",
      icon: { light: "file:drift.svg", dark: "file:drift.dark.svg" },
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Drift API",
      defaults: {
        name: "Drift"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "driftApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["accessToken"]
            }
          }
        },
        {
          name: "driftOAuth2Api",
          required: true,
          displayOptions: {
            show: {
              authentication: ["oAuth2"]
            }
          }
        }
      ],
      properties: [
        {
          displayName: "Authentication",
          name: "authentication",
          type: "options",
          options: [
            {
              name: "Access Token",
              value: "accessToken"
            },
            {
              name: "OAuth2",
              value: "oAuth2"
            }
          ],
          default: "accessToken"
        },
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Contact",
              value: "contact"
            }
          ],
          default: "contact"
        },
        ...import_ContactDescription.contactOperations,
        ...import_ContactDescription.contactFields
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "contact") {
          if (operation === "create") {
            const email = this.getNodeParameter("email", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              email
            };
            if (additionalFields.name) {
              body.name = additionalFields.name;
            }
            if (additionalFields.phone) {
              body.phone = additionalFields.phone;
            }
            responseData = await import_GenericFunctions.driftApiRequest.call(this, "POST", "/contacts", {
              attributes: body
            });
            responseData = responseData.data;
          }
          if (operation === "update") {
            const contactId = this.getNodeParameter("contactId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {};
            if (updateFields.name) {
              body.name = updateFields.name;
            }
            if (updateFields.phone) {
              body.phone = updateFields.phone;
            }
            if (updateFields.email) {
              body.email = updateFields.email;
            }
            responseData = await import_GenericFunctions.driftApiRequest.call(this, "PATCH", `/contacts/${contactId}`, {
              attributes: body
            });
            responseData = responseData.data;
          }
          if (operation === "get") {
            const contactId = this.getNodeParameter("contactId", i);
            responseData = await import_GenericFunctions.driftApiRequest.call(this, "GET", `/contacts/${contactId}`);
            responseData = responseData.data;
          }
          if (operation === "getCustomAttributes") {
            responseData = await import_GenericFunctions.driftApiRequest.call(this, "GET", "/contacts/attributes");
            responseData = responseData.data.properties;
          }
          if (operation === "delete") {
            const contactId = this.getNodeParameter("contactId", i);
            responseData = await import_GenericFunctions.driftApiRequest.call(this, "DELETE", `/contacts/${contactId}`);
            responseData = { success: true };
          }
        }
        if (Array.isArray(responseData)) {
          returnData.push.apply(returnData, responseData);
        } else {
          returnData.push(responseData);
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ error: error.message });
          continue;
        }
        throw error;
      }
    }
    return [this.helpers.returnJsonArray(returnData)];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Drift
});
//# sourceMappingURL=Drift.node.js.map
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
var Vero_node_exports = {};
__export(Vero_node_exports, {
  Vero: () => Vero
});
module.exports = __toCommonJS(Vero_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_EventDescripion = require("./EventDescripion");
var import_GenericFunctions = require("./GenericFunctions");
var import_UserDescription = require("./UserDescription");
class Vero {
  constructor() {
    this.description = {
      displayName: "Vero",
      name: "vero",
      icon: "file:vero.svg",
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Vero API",
      defaults: {
        name: "Vero"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "veroApi",
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
              name: "User",
              value: "user",
              description: "Create, update and manage the subscription status of your users"
            },
            {
              name: "Event",
              value: "event",
              description: "Track events based on actions your customers take in real time"
            }
          ],
          default: "user"
        },
        ...import_UserDescription.userOperations,
        ...import_EventDescripion.eventOperations,
        ...import_UserDescription.userFields,
        ...import_EventDescripion.eventFields
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    let responseData;
    for (let i = 0; i < length; i++) {
      try {
        const resource = this.getNodeParameter("resource", 0);
        const operation = this.getNodeParameter("operation", 0);
        if (resource === "user") {
          if (operation === "create") {
            const id = this.getNodeParameter("id", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const jsonActive = this.getNodeParameter("jsonParameters", i);
            const body = {
              id
            };
            if (additionalFields.email) {
              body.email = additionalFields.email;
            }
            if (!jsonActive) {
              const dataAttributesValues = this.getNodeParameter("dataAttributesUi", i).dataAttributesValues;
              if (dataAttributesValues) {
                const dataAttributes = {};
                for (let index = 0; index < dataAttributesValues.length; index++) {
                  dataAttributes[dataAttributesValues[index].key] = dataAttributesValues[index].value;
                  body.data = dataAttributes;
                }
              }
            } else {
              const dataAttributesJson = (0, import_GenericFunctions.validateJSON)(
                this.getNodeParameter("dataAttributesJson", i)
              );
              if (dataAttributesJson) {
                body.data = dataAttributesJson;
              }
            }
            try {
              responseData = await import_GenericFunctions.veroApiRequest.call(this, "POST", "/users/track", body);
            } catch (error) {
              throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
            }
          }
          if (operation === "alias") {
            const id = this.getNodeParameter("id", i);
            const newId = this.getNodeParameter("newId", i);
            const body = {
              id,
              new_id: newId
            };
            try {
              responseData = await import_GenericFunctions.veroApiRequest.call(this, "PUT", "/users/reidentify", body);
            } catch (error) {
              throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
            }
          }
          if (operation === "unsubscribe" || operation === "resubscribe" || operation === "delete") {
            const id = this.getNodeParameter("id", i);
            const body = {
              id
            };
            try {
              responseData = await import_GenericFunctions.veroApiRequest.call(this, "POST", `/users/${operation}`, body);
            } catch (error) {
              throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
            }
          }
          if (operation === "addTags" || operation === "removeTags") {
            const id = this.getNodeParameter("id", i);
            const tags = this.getNodeParameter("tags", i).split(",");
            const body = {
              id
            };
            if (operation === "addTags") {
              body.add = JSON.stringify(tags);
            }
            if (operation === "removeTags") {
              body.remove = JSON.stringify(tags);
            }
            try {
              responseData = await import_GenericFunctions.veroApiRequest.call(this, "PUT", "/users/tags/edit", body);
            } catch (error) {
              throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
            }
          }
        }
        if (resource === "event") {
          if (operation === "track") {
            const id = this.getNodeParameter("id", i);
            const email = this.getNodeParameter("email", i);
            const eventName = this.getNodeParameter("eventName", i);
            const jsonActive = this.getNodeParameter("jsonParameters", i);
            const body = {
              identity: { id, email },
              event_name: eventName,
              email
            };
            if (!jsonActive) {
              const dataAttributesValues = this.getNodeParameter("dataAttributesUi", i).dataAttributesValues;
              if (dataAttributesValues) {
                const dataAttributes = {};
                for (let index = 0; index < dataAttributesValues.length; index++) {
                  dataAttributes[dataAttributesValues[index].key] = dataAttributesValues[index].value;
                  body.data = JSON.stringify(dataAttributes);
                }
              }
              const extraAttributesValues = this.getNodeParameter("extraAttributesUi", i).extraAttributesValues;
              if (extraAttributesValues) {
                const extraAttributes = {};
                for (let index = 0; index < extraAttributesValues.length; index++) {
                  extraAttributes[extraAttributesValues[index].key] = extraAttributesValues[index].value;
                  body.extras = JSON.stringify(extraAttributes);
                }
              }
            } else {
              const dataAttributesJson = (0, import_GenericFunctions.validateJSON)(
                this.getNodeParameter("dataAttributesJson", i)
              );
              if (dataAttributesJson) {
                body.data = JSON.stringify(dataAttributesJson);
              }
              const extraAttributesJson = (0, import_GenericFunctions.validateJSON)(
                this.getNodeParameter("extraAttributesJson", i)
              );
              if (extraAttributesJson) {
                body.extras = JSON.stringify(extraAttributesJson);
              }
            }
            try {
              responseData = await import_GenericFunctions.veroApiRequest.call(this, "POST", "/events/track", body);
            } catch (error) {
              throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
            }
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
  Vero
});
//# sourceMappingURL=Vero.node.js.map
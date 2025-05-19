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
var MailerLiteV1_node_exports = {};
__export(MailerLiteV1_node_exports, {
  MailerLiteV1: () => MailerLiteV1
});
module.exports = __toCommonJS(MailerLiteV1_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_SubscriberDescription = require("./SubscriberDescription");
var import_GenericFunctions = require("../GenericFunctions");
class MailerLiteV1 {
  constructor(baseDescription) {
    this.methods = {
      loadOptions: {
        getCustomFields: import_GenericFunctions.getCustomFields
      }
    };
    this.description = {
      ...baseDescription,
      displayName: "MailerLite",
      name: "mailerLite",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Mailer Lite API",
      defaults: {
        name: "MailerLite"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "mailerLiteApi",
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
              name: "Subscriber",
              value: "subscriber"
            }
          ],
          default: "subscriber"
        },
        ...import_SubscriberDescription.subscriberOperations,
        ...import_SubscriberDescription.subscriberFields
      ]
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
        if (resource === "subscriber") {
          if (operation === "create") {
            const email = this.getNodeParameter("email", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              email,
              fields: []
            };
            Object.assign(body, additionalFields);
            if (additionalFields.customFieldsUi) {
              const customFieldsValues = additionalFields.customFieldsUi.customFieldsValues;
              if (customFieldsValues) {
                const fields = {};
                for (const customFieldValue of customFieldsValues) {
                  fields[customFieldValue.fieldId] = customFieldValue.value;
                }
                body.fields = fields;
                delete body.customFieldsUi;
              }
            }
            responseData = await import_GenericFunctions.mailerliteApiRequest.call(this, "POST", "/subscribers", body);
          }
          if (operation === "get") {
            const subscriberId = this.getNodeParameter("subscriberId", i);
            responseData = await import_GenericFunctions.mailerliteApiRequest.call(
              this,
              "GET",
              `/subscribers/${subscriberId}`
            );
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const filters = this.getNodeParameter("filters", i);
            Object.assign(qs, filters);
            if (returnAll) {
              responseData = await import_GenericFunctions.mailerliteApiRequestAllItems.call(
                this,
                "GET",
                "/subscribers",
                {},
                qs
              );
            } else {
              qs.limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.mailerliteApiRequest.call(this, "GET", "/subscribers", {}, qs);
            }
          }
          if (operation === "update") {
            const subscriberId = this.getNodeParameter("subscriberId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {};
            Object.assign(body, updateFields);
            if (updateFields.customFieldsUi) {
              const customFieldsValues = updateFields.customFieldsUi.customFieldsValues;
              if (customFieldsValues) {
                const fields = {};
                for (const customFieldValue of customFieldsValues) {
                  fields[customFieldValue.fieldId] = customFieldValue.value;
                }
                body.fields = fields;
                delete body.customFieldsUi;
              }
            }
            responseData = await import_GenericFunctions.mailerliteApiRequest.call(
              this,
              "PUT",
              `/subscribers/${subscriberId}`,
              body
            );
          }
        }
      } catch (error) {
        if (this.continueOnFail()) {
          const executionErrorData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ error: error.message }),
            { itemData: { item: i } }
          );
          returnData.push(...executionErrorData);
          continue;
        }
        throw error;
      }
      const executionData = this.helpers.constructExecutionMetaData(
        this.helpers.returnJsonArray(responseData),
        { itemData: { item: i } }
      );
      returnData.push(...executionData);
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MailerLiteV1
});
//# sourceMappingURL=MailerLiteV1.node.js.map
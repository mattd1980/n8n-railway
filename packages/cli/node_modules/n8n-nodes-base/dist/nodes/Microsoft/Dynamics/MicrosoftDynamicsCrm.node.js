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
var MicrosoftDynamicsCrm_node_exports = {};
__export(MicrosoftDynamicsCrm_node_exports, {
  MicrosoftDynamicsCrm: () => MicrosoftDynamicsCrm
});
module.exports = __toCommonJS(MicrosoftDynamicsCrm_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_GenericFunctions = require("./GenericFunctions");
class MicrosoftDynamicsCrm {
  constructor() {
    this.description = {
      displayName: "Microsoft Dynamics CRM",
      name: "microsoftDynamicsCrm",
      icon: { light: "file:microsoftDynamicsCrm.svg", dark: "file:microsoftDynamicsCrm.dark.svg" },
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Microsoft Dynamics CRM API",
      defaults: {
        name: "Microsoft Dynamics CRM"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "microsoftDynamicsOAuth2Api",
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
              name: "Account",
              value: "account"
            }
          ],
          default: "account"
        },
        ...import_descriptions.accountOperations,
        ...import_descriptions.accountFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getAccountCategories() {
          return await import_GenericFunctions.getPicklistOptions.call(this, "account", "accountcategorycode");
        },
        async getAccountRatingCodes() {
          return await import_GenericFunctions.getPicklistOptions.call(this, "account", "accountratingcode");
        },
        async getAddressTypes() {
          return await import_GenericFunctions.getPicklistOptions.call(this, "account", "address1_addresstypecode");
        },
        async getBusinessTypes() {
          return await import_GenericFunctions.getPicklistOptions.call(this, "account", "businesstypecode");
        },
        async getCustomerSizeCodes() {
          return await import_GenericFunctions.getPicklistOptions.call(this, "account", "customersizecode");
        },
        async getCustomerTypeCodes() {
          return await import_GenericFunctions.getPicklistOptions.call(this, "account", "customertypecode");
        },
        async getIndustryCodes() {
          return await import_GenericFunctions.getPicklistOptions.call(this, "account", "industrycode");
        },
        async getPaymentTermsCodes() {
          return await import_GenericFunctions.getPicklistOptions.call(this, "account", "paymenttermscode");
        },
        async getPreferredAppointmentDayCodes() {
          return await import_GenericFunctions.getPicklistOptions.call(this, "account", "preferredappointmentdaycode");
        },
        async getPreferredAppointmentTimeCodes() {
          return await import_GenericFunctions.getPicklistOptions.call(this, "account", "preferredappointmenttimecode");
        },
        async getPreferredContactMethodCodes() {
          return await import_GenericFunctions.getPicklistOptions.call(this, "account", "preferredcontactmethodcode");
        },
        async getShippingMethodCodes() {
          return await import_GenericFunctions.getPicklistOptions.call(this, "account", "shippingmethodcode");
        },
        async getTerritoryCodes() {
          return await import_GenericFunctions.getPicklistOptions.call(this, "account", "territorycode");
        },
        async getAccountFields() {
          const fields = await import_GenericFunctions.getEntityFields.call(this, "account");
          const isSelectable = (field) => field.IsValidForRead && field.CanBeSecuredForRead && field.IsValidODataAttribute && field.LogicalName !== "slaid";
          return fields.filter(isSelectable).filter((field) => field.DisplayName.UserLocalizedLabel?.Label).map((field) => ({
            name: field.DisplayName.UserLocalizedLabel.Label,
            value: field.LogicalName
          })).sort(import_GenericFunctions.sort);
        },
        async getExpandableAccountFields() {
          const fields = await import_GenericFunctions.getEntityFields.call(this, "account");
          const isSelectable = (field) => field.IsValidForRead && field.CanBeSecuredForRead && field.IsValidODataAttribute && field.AttributeType === "Lookup" && field.LogicalName !== "slaid";
          return fields.filter(isSelectable).map((field) => ({
            name: field.DisplayName.UserLocalizedLabel.Label,
            value: field.LogicalName
          })).sort(import_GenericFunctions.sort);
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
        if (resource === "account") {
          if (operation === "create") {
            const name = this.getNodeParameter("name", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const options = this.getNodeParameter("options", i);
            const body = {
              name,
              ...additionalFields
            };
            if (body?.addresses?.address) {
              Object.assign(body, (0, import_GenericFunctions.adjustAddresses)(body.addresses.address));
              delete body?.addresses;
            }
            if (options.returnFields) {
              options.returnFields.push("accountid");
              qs.$select = options.returnFields.join(",");
            } else {
              qs.$select = "accountid";
            }
            responseData = await import_GenericFunctions.microsoftApiRequest.call(this, "POST", "/accounts", body, qs);
          }
          if (operation === "delete") {
            const accountId = this.getNodeParameter("accountId", i);
            await import_GenericFunctions.microsoftApiRequest.call(this, "DELETE", `/accounts(${accountId})`, {}, qs);
            responseData = { success: true };
          }
          if (operation === "get") {
            const accountId = this.getNodeParameter("accountId", i);
            const options = this.getNodeParameter("options", i);
            if (options.returnFields) {
              qs.$select = options.returnFields.join(",");
            }
            if (options.expandFields) {
              qs.$expand = options.expandFields.join(",");
            }
            responseData = await import_GenericFunctions.microsoftApiRequest.call(
              this,
              "GET",
              `/accounts(${accountId})`,
              {},
              qs
            );
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("options", i);
            const filters = this.getNodeParameter("filters", i);
            if (options.returnFields) {
              qs.$select = options.returnFields.join(",");
            }
            if (options.expandFields) {
              qs.$expand = options.expandFields.join(",");
            }
            if (filters.query) {
              qs.$filter = filters.query;
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.microsoftApiRequestAllItems.call(
                this,
                "value",
                "GET",
                "/accounts",
                {},
                qs
              );
            } else {
              qs.$top = this.getNodeParameter("limit", 0);
              responseData = await import_GenericFunctions.microsoftApiRequest.call(this, "GET", "/accounts", {}, qs);
              responseData = responseData.value;
            }
          }
          if (operation === "update") {
            const accountId = this.getNodeParameter("accountId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const options = this.getNodeParameter("options", i);
            const body = {
              ...updateFields
            };
            if (body?.addresses?.address) {
              Object.assign(body, (0, import_GenericFunctions.adjustAddresses)(body.addresses.address));
              delete body?.addresses;
            }
            if (options.returnFields) {
              options.returnFields.push("accountid");
              qs.$select = options.returnFields.join(",");
            } else {
              qs.$select = "accountid";
            }
            responseData = await import_GenericFunctions.microsoftApiRequest.call(
              this,
              "PATCH",
              `/accounts(${accountId})`,
              body,
              qs
            );
          }
        }
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
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
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MicrosoftDynamicsCrm
});
//# sourceMappingURL=MicrosoftDynamicsCrm.node.js.map
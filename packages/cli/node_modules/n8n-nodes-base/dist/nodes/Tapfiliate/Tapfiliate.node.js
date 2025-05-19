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
var Tapfiliate_node_exports = {};
__export(Tapfiliate_node_exports, {
  Tapfiliate: () => Tapfiliate
});
module.exports = __toCommonJS(Tapfiliate_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_AffiliateDescription = require("./AffiliateDescription");
var import_AffiliateMetadataDescription = require("./AffiliateMetadataDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_ProgramAffiliateDescription = require("./ProgramAffiliateDescription");
class Tapfiliate {
  constructor() {
    this.description = {
      displayName: "Tapfiliate",
      name: "tapfiliate",
      icon: "file:tapfiliate.svg",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ":" + $parameter["resource"]}}',
      description: "Consume Tapfiliate API",
      defaults: {
        name: "Tapfiliate"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "tapfiliateApi",
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
              name: "Affiliate",
              value: "affiliate"
            },
            {
              name: "Affiliate Metadata",
              value: "affiliateMetadata"
            },
            {
              name: "Program Affiliate",
              value: "programAffiliate"
            }
          ],
          default: "affiliate",
          required: true
        },
        ...import_AffiliateDescription.affiliateOperations,
        ...import_AffiliateDescription.affiliateFields,
        ...import_AffiliateMetadataDescription.affiliateMetadataOperations,
        ...import_AffiliateMetadataDescription.affiliateMetadataFields,
        ...import_ProgramAffiliateDescription.programAffiliateOperations,
        ...import_ProgramAffiliateDescription.programAffiliateFields
      ]
    };
    this.methods = {
      loadOptions: {
        // Get custom fields to display to user so that they can select them easily
        async getPrograms() {
          const returnData = [];
          const programs = await import_GenericFunctions.tapfiliateApiRequestAllItems.call(this, "GET", "/programs/");
          for (const program of programs) {
            returnData.push({
              name: program.title,
              value: program.id
            });
          }
          return returnData;
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const length = items.length;
    const qs = {};
    let responseData;
    const returnData = [];
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "affiliate") {
          if (operation === "create") {
            const firstname = this.getNodeParameter("firstname", i);
            const lastname = this.getNodeParameter("lastname", i);
            const email = this.getNodeParameter("email", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              firstname,
              lastname,
              email
            };
            Object.assign(body, additionalFields);
            if (body.addressUi) {
              body.address = body.addressUi.addressValues;
              delete body.addressUi;
              if (body.address.country) {
                body.address.country = {
                  code: body.address.country
                };
              }
            }
            if (body.companyName) {
              body.company = {
                name: body.companyName
              };
              delete body.companyName;
            }
            responseData = await import_GenericFunctions.tapfiliateApiRequest.call(this, "POST", "/affiliates/", body);
            returnData.push(responseData);
          }
          if (operation === "delete") {
            const affiliateId = this.getNodeParameter("affiliateId", i);
            responseData = await import_GenericFunctions.tapfiliateApiRequest.call(
              this,
              "DELETE",
              `/affiliates/${affiliateId}/`
            );
            responseData = { success: true };
          }
          if (operation === "get") {
            const affiliateId = this.getNodeParameter("affiliateId", i);
            responseData = await import_GenericFunctions.tapfiliateApiRequest.call(
              this,
              "GET",
              `/affiliates/${affiliateId}/`
            );
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const filters = this.getNodeParameter("filters", i);
            Object.assign(qs, filters);
            if (returnAll) {
              responseData = await import_GenericFunctions.tapfiliateApiRequestAllItems.call(
                this,
                "GET",
                "/affiliates/",
                {},
                qs
              );
            } else {
              const limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.tapfiliateApiRequest.call(this, "GET", "/affiliates/", {}, qs);
              responseData = responseData.splice(0, limit);
            }
          }
        }
        if (resource === "affiliateMetadata") {
          if (operation === "add") {
            const affiliateId = this.getNodeParameter("affiliateId", i);
            const metadata = this.getNodeParameter("metadataUi", i)?.metadataValues || [];
            if (metadata.length === 0) {
              throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Metadata cannot be empty.", {
                itemIndex: i
              });
            }
            for (const { key, value } of metadata) {
              await import_GenericFunctions.tapfiliateApiRequest.call(
                this,
                "PUT",
                `/affiliates/${affiliateId}/meta-data/${key}/`,
                { value }
              );
            }
            responseData = { success: true };
          }
          if (operation === "remove") {
            const affiliateId = this.getNodeParameter("affiliateId", i);
            const key = this.getNodeParameter("key", i);
            responseData = await import_GenericFunctions.tapfiliateApiRequest.call(
              this,
              "DELETE",
              `/affiliates/${affiliateId}/meta-data/${key}/`
            );
            responseData = { success: true };
          }
          if (operation === "update") {
            const affiliateId = this.getNodeParameter("affiliateId", i);
            const key = this.getNodeParameter("key", i);
            const value = this.getNodeParameter("value", i);
            responseData = await import_GenericFunctions.tapfiliateApiRequest.call(
              this,
              "PUT",
              `/affiliates/${affiliateId}/meta-data/`,
              { [key]: value }
            );
          }
        }
        if (resource === "programAffiliate") {
          if (operation === "add") {
            const programId = this.getNodeParameter("programId", i);
            const affiliateId = this.getNodeParameter("affiliateId", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              affiliate: {
                id: affiliateId
              }
            };
            Object.assign(body, additionalFields);
            responseData = await import_GenericFunctions.tapfiliateApiRequest.call(
              this,
              "POST",
              `/programs/${programId}/affiliates/`,
              body
            );
          }
          if (operation === "approve") {
            const programId = this.getNodeParameter("programId", i);
            const affiliateId = this.getNodeParameter("affiliateId", i);
            responseData = await import_GenericFunctions.tapfiliateApiRequest.call(
              this,
              "PUT",
              `/programs/${programId}/affiliates/${affiliateId}/approved/`
            );
          }
          if (operation === "disapprove") {
            const programId = this.getNodeParameter("programId", i);
            const affiliateId = this.getNodeParameter("affiliateId", i);
            responseData = await import_GenericFunctions.tapfiliateApiRequest.call(
              this,
              "DELETE",
              `/programs/${programId}/affiliates/${affiliateId}/approved/`
            );
          }
          if (operation === "get") {
            const programId = this.getNodeParameter("programId", i);
            const affiliateId = this.getNodeParameter("affiliateId", i);
            responseData = await import_GenericFunctions.tapfiliateApiRequest.call(
              this,
              "GET",
              `/programs/${programId}/affiliates/${affiliateId}/`
            );
          }
          if (operation === "getAll") {
            const programId = this.getNodeParameter("programId", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            const filters = this.getNodeParameter("filters", i);
            Object.assign(qs, filters);
            if (returnAll) {
              responseData = await import_GenericFunctions.tapfiliateApiRequestAllItems.call(
                this,
                "GET",
                `/programs/${programId}/affiliates/`,
                {},
                qs
              );
            } else {
              const limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.tapfiliateApiRequest.call(
                this,
                "GET",
                `/programs/${programId}/affiliates/`,
                {},
                qs
              );
              responseData = responseData.splice(0, limit);
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
  Tapfiliate
});
//# sourceMappingURL=Tapfiliate.node.js.map
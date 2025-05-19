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
var Cloudflare_node_exports = {};
__export(Cloudflare_node_exports, {
  Cloudflare: () => Cloudflare
});
module.exports = __toCommonJS(Cloudflare_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_ZoneCertificateDescription = require("./ZoneCertificateDescription");
class Cloudflare {
  constructor() {
    this.description = {
      displayName: "Cloudflare",
      name: "cloudflare",
      icon: "file:cloudflare.svg",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Cloudflare API",
      defaults: {
        name: "Cloudflare"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "cloudflareApi",
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
              name: "Zone Certificate",
              value: "zoneCertificate"
            }
          ],
          default: "zoneCertificate"
        },
        ...import_ZoneCertificateDescription.zoneCertificateOperations,
        ...import_ZoneCertificateDescription.zoneCertificateFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getZones() {
          const returnData = [];
          const { result: zones } = await import_GenericFunctions.cloudflareApiRequest.call(this, "GET", "/zones");
          for (const zone of zones) {
            returnData.push({
              name: zone.name,
              value: zone.id
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
        if (resource === "zoneCertificate") {
          if (operation === "delete") {
            const zoneId = this.getNodeParameter("zoneId", i);
            const certificateId = this.getNodeParameter("certificateId", i);
            responseData = await import_GenericFunctions.cloudflareApiRequest.call(
              this,
              "DELETE",
              `/zones/${zoneId}/origin_tls_client_auth/${certificateId}`,
              {}
            );
            responseData = responseData.result;
          }
          if (operation === "get") {
            const zoneId = this.getNodeParameter("zoneId", i);
            const certificateId = this.getNodeParameter("certificateId", i);
            responseData = await import_GenericFunctions.cloudflareApiRequest.call(
              this,
              "GET",
              `/zones/${zoneId}/origin_tls_client_auth/${certificateId}`,
              {}
            );
            responseData = responseData.result;
          }
          if (operation === "getMany") {
            const zoneId = this.getNodeParameter("zoneId", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            const filters = this.getNodeParameter("filters", i, {});
            Object.assign(qs, filters);
            if (returnAll) {
              responseData = await import_GenericFunctions.cloudflareApiRequestAllItems.call(
                this,
                "result",
                "GET",
                `/zones/${zoneId}/origin_tls_client_auth`,
                {},
                qs
              );
            } else {
              const limit = this.getNodeParameter("limit", i);
              Object.assign(qs, { per_page: limit });
              responseData = await import_GenericFunctions.cloudflareApiRequest.call(
                this,
                "GET",
                `/zones/${zoneId}/origin_tls_client_auth`,
                {},
                qs
              );
              responseData = responseData.result;
            }
          }
          if (operation === "upload") {
            const zoneId = this.getNodeParameter("zoneId", i);
            const certificate = this.getNodeParameter("certificate", i);
            const privateKey = this.getNodeParameter("privateKey", i);
            const body = {
              certificate,
              private_key: privateKey
            };
            responseData = await import_GenericFunctions.cloudflareApiRequest.call(
              this,
              "POST",
              `/zones/${zoneId}/origin_tls_client_auth`,
              body,
              qs
            );
            responseData = responseData.result;
          }
        }
        returnData.push(
          ...this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            {
              itemData: { item: i }
            }
          )
        );
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ json: { error: error.message } });
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
  Cloudflare
});
//# sourceMappingURL=Cloudflare.node.js.map